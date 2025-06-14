
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScrapedProduct {
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  category: string;
  platform: 'amazon' | 'aliexpress' | 'ebay';
  rating?: number;
  brand?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url: affiliateUrl } = await req.json();
    
    if (!affiliateUrl) {
      throw new Error('URL is required');
    }

    console.log('Starting scraping for URL:', affiliateUrl);

    // Detect platform
    const platform = detectPlatform(affiliateUrl);
    console.log('Detected platform:', platform);

    // Scrape the product
    const scrapedData = await scrapeProduct(affiliateUrl, platform);
    
    // Store in database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const productData = {
      name: scrapedData.name,
      price: scrapedData.price,
      original_price: scrapedData.originalPrice,
      image_url: scrapedData.imageUrl,
      description: scrapedData.description,
      affiliate_link: affiliateUrl,
      category: scrapedData.category,
      platform: scrapedData.platform,
      rating: scrapedData.rating,
      brand: scrapedData.brand,
      discount: scrapedData.originalPrice ? 
        Math.round(((scrapedData.originalPrice - scrapedData.price) / scrapedData.originalPrice) * 100) : 
        null,
      is_new: true
    };

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to save product: ${error.message}`);
    }

    console.log('Product saved successfully:', data.id);

    return new Response(
      JSON.stringify({ success: true, product: data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to scrape product' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

function detectPlatform(url: string): 'amazon' | 'aliexpress' | 'ebay' {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('amazon.')) {
    return 'amazon';
  } else if (urlLower.includes('aliexpress.')) {
    return 'aliexpress';
  } else if (urlLower.includes('ebay.')) {
    return 'ebay';
  }
  
  return 'amazon'; // Default fallback
}

async function scrapeProduct(url: string, platform: 'amazon' | 'aliexpress' | 'ebay'): Promise<ScrapedProduct> {
  console.log(`Scraping ${platform} product from:`, url);
  
  try {
    // Fetch the page content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse based on platform
    switch (platform) {
      case 'amazon':
        return parseAmazonProduct(html);
      case 'ebay':
        return parseEbayProduct(html);
      case 'aliexpress':
        return parseAliExpressProduct(html);
      default:
        throw new Error('Unsupported platform');
    }
  } catch (error) {
    console.error(`Error scraping ${platform}:`, error);
    throw new Error(`Failed to scrape ${platform} product: ${error.message}`);
  }
}

function parseAmazonProduct(html: string): ScrapedProduct {
  console.log('Parsing Amazon product...');
  
  // Extract product name
  let name = extractBetween(html, '<span id="productTitle"', '</span>');
  name = name ? cleanText(name.split('>')[1]) : 'Amazon Product';
  
  // Extract price
  let priceText = extractBetween(html, 'class="a-price-whole"', '</span>') || 
                  extractBetween(html, 'class="a-offscreen"', '</span>');
  if (priceText) {
    priceText = cleanText(priceText.split('>').pop() || '');
  }
  const price = parsePrice(priceText);
  
  // Extract original price (if on sale)
  let originalPriceText = extractBetween(html, 'class="a-price a-text-price"', '</span>');
  if (originalPriceText) {
    originalPriceText = cleanText(originalPriceText.split('class="a-offscreen">')[1]);
  }
  const originalPrice = originalPriceText ? parsePrice(originalPriceText) : undefined;
  
  // Extract image
  let imageUrl = extractBetween(html, '"hiRes":"', '"') || 
                 extractBetween(html, '"large":"', '"') ||
                 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
  
  // Extract description
  let description = extractBetween(html, 'feature-bullets', '</div>');
  description = description ? cleanText(description).substring(0, 500) : 'Amazon product';
  
  // Extract rating
  let ratingText = extractBetween(html, 'class="a-icon-alt">', '</span>');
  const rating = ratingText ? parseFloat(ratingText.split(' ')[0]) : undefined;

  return {
    name,
    price: price || 0,
    originalPrice,
    imageUrl,
    description,
    category: 'General',
    platform: 'amazon',
    rating
  };
}

function parseEbayProduct(html: string): ScrapedProduct {
  console.log('Parsing eBay product...');
  
  // Extract product name
  let name = extractBetween(html, '<h1 id="x-title-label-lbl"', '</h1>') ||
             extractBetween(html, 'class="x-item-title-label"', '</h1>');
  name = name ? cleanText(name.split('>').pop() || '') : 'eBay Product';
  
  // Extract price
  let priceText = extractBetween(html, 'class="notranslate"', '</span>') ||
                  extractBetween(html, 'id="prcIsum"', '</span>');
  if (priceText) {
    priceText = cleanText(priceText.split('>').pop() || '');
  }
  const price = parsePrice(priceText);
  
  // Extract image
  let imageUrl = extractBetween(html, '"originalImg":"', '"') ||
                 extractBetween(html, '"maxImageUrl":"', '"') ||
                 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
  
  // Extract description
  let description = extractBetween(html, 'class="u-flL condText"', '</div>') ||
                    extractBetween(html, 'id="desc_div"', '</div>');
  description = description ? cleanText(description).substring(0, 500) : 'eBay product';
  
  return {
    name,
    price: price || 0,
    imageUrl,
    description,
    category: 'General',
    platform: 'ebay'
  };
}

function parseAliExpressProduct(html: string): ScrapedProduct {
  console.log('Parsing AliExpress product...');
  
  // Extract product name
  let name = extractBetween(html, '"subject":"', '"') ||
             extractBetween(html, 'class="product-title"', '</h1>');
  name = name ? cleanText(name) : 'AliExpress Product';
  
  // Extract price
  let priceText = extractBetween(html, '"minAmount":"', '"') ||
                  extractBetween(html, 'class="product-price-current"', '</span>');
  if (priceText) {
    priceText = cleanText(priceText.split('>').pop() || '');
  }
  const price = parsePrice(priceText);
  
  // Extract image
  let imageUrl = extractBetween(html, '"imagePathList":["', '"') ||
                 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
  
  // Extract description
  let description = extractBetween(html, '"description":"', '"') ||
                    'AliExpress product';
  description = cleanText(description).substring(0, 500);
  
  return {
    name,
    price: price || 0,
    imageUrl,
    description,
    category: 'General',
    platform: 'aliexpress'
  };
}

function extractBetween(text: string, start: string, end: string): string | null {
  const startIndex = text.indexOf(start);
  if (startIndex === -1) return null;
  
  const endIndex = text.indexOf(end, startIndex + start.length);
  if (endIndex === -1) return null;
  
  return text.substring(startIndex, endIndex + end.length);
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePrice(priceText: string | undefined): number | undefined {
  if (!priceText) return undefined;
  
  const matches = priceText.match(/[\d,]+\.?\d*/);
  if (matches) {
    return parseFloat(matches[0].replace(/,/g, ''));
  }
  return undefined;
}
