
export interface ExtractedProduct {
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  platform: 'amazon' | 'aliexpress' | 'ebay';
  rating?: number;
  discount?: number;
}

export const extractProductFromUrl = async (url: string): Promise<ExtractedProduct | null> => {
  try {
    console.log('Extracting product from URL:', url);
    
    // Determine platform
    let platform: 'amazon' | 'aliexpress' | 'ebay';
    if (url.includes('amazon.') || url.includes('amzn.')) {
      platform = 'amazon';
    } else if (url.includes('aliexpress.') || url.includes('ali.express')) {
      platform = 'aliexpress';
    } else if (url.includes('ebay.')) {
      platform = 'ebay';
    } else {
      throw new Error('Unsupported platform');
    }

    // For now, we'll simulate extraction since we can't make direct cross-origin requests
    // In a real implementation, this would use a backend service or proxy
    const mockProduct = generateMockProduct(platform, url);
    
    console.log('Extracted product:', mockProduct);
    return mockProduct;
  } catch (error) {
    console.error('Error extracting product:', error);
    return null;
  }
};

const generateMockProduct = (platform: 'amazon' | 'aliexpress' | 'ebay', url: string): ExtractedProduct => {
  const mockProducts = {
    amazon: {
      name: "Amazon Wireless Earbuds",
      price: 89.99,
      originalPrice: 129.99,
      imageUrl: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
      description: "High-quality wireless earbuds with noise cancellation and long battery life.",
      rating: 4.5
    },
    aliexpress: {
      name: "AliExpress Smart Watch",
      price: 45.99,
      originalPrice: 89.99,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      description: "Feature-rich smartwatch with fitness tracking and heart rate monitoring.",
      rating: 4.2
    },
    ebay: {
      name: "eBay Vintage Camera",
      price: 199.99,
      originalPrice: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      description: "Classic vintage camera in excellent condition with original leather case.",
      rating: 4.8
    }
  };

  const baseProduct = mockProducts[platform];
  const discount = baseProduct.originalPrice ? 
    Math.round(((baseProduct.originalPrice - baseProduct.price) / baseProduct.originalPrice) * 100) : 
    undefined;

  return {
    ...baseProduct,
    platform,
    discount,
    description: `${baseProduct.description} Scraped from: ${url}`
  };
};

// Enhanced URL validation for different platforms
export const isValidProductUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Amazon URLs
    if (hostname.includes('amazon.') || hostname.includes('amzn.')) {
      return url.includes('/dp/') || url.includes('/gp/product/') || url.includes('/ASIN/');
    }
    
    // AliExpress URLs
    if (hostname.includes('aliexpress.') || hostname.includes('ali.express')) {
      return url.includes('/item/') || url.includes('/store/product/');
    }
    
    // eBay URLs
    if (hostname.includes('ebay.')) {
      return url.includes('/itm/') || url.includes('/p/');
    }
    
    return false;
  } catch {
    return false;
  }
};

// Extract affiliate link components
export const extractAffiliateInfo = (url: string) => {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname.toLowerCase();
  
  if (hostname.includes('amazon.')) {
    // Extract ASIN for Amazon
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
    return {
      platform: 'amazon' as const,
      productId: asinMatch ? asinMatch[1] : null,
      affiliateTag: urlObj.searchParams.get('tag')
    };
  }
  
  if (hostname.includes('aliexpress.')) {
    // Extract item ID for AliExpress
    const itemMatch = url.match(/\/item\/(\d+)\.html/i);
    return {
      platform: 'aliexpress' as const,
      productId: itemMatch ? itemMatch[1] : null,
      affiliateTag: urlObj.searchParams.get('aff_platform')
    };
  }
  
  if (hostname.includes('ebay.')) {
    // Extract item ID for eBay
    const itemMatch = url.match(/\/itm\/(\d+)/i);
    return {
      platform: 'ebay' as const,
      productId: itemMatch ? itemMatch[1] : null,
      affiliateTag: urlObj.searchParams.get('mkcid')
    };
  }
  
  return null;
};

// ProductExtractor class for compatibility
export class ProductExtractor {
  static async extractFromUrl(url: string): Promise<ExtractedProduct> {
    const result = await extractProductFromUrl(url);
    if (!result) {
      throw new Error('Failed to extract product data');
    }
    return result;
  }

  static createProductFromExtracted(extractedData: ExtractedProduct, affiliateUrl: string) {
    return {
      id: `product-${Date.now()}`,
      name: extractedData.name,
      price: extractedData.price,
      originalPrice: extractedData.originalPrice,
      image: extractedData.imageUrl,
      description: extractedData.description,
      affiliate_link: affiliateUrl,
      platform: extractedData.platform,
      rating: extractedData.rating || 0,
      discount: extractedData.discount,
      category: 'import',
      featured: false,
      isNew: true,
      isTrending: false,
      priceDropped: false
    };
  }
}
