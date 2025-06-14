
import { Product } from "@/types/Product";
import { supabase } from "@/integrations/supabase/client";

interface ExtractedProductData {
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

export class ProductExtractor {
  static async extractFromUrl(affiliateUrl: string): Promise<Partial<ExtractedProductData>> {
    console.log("Starting enhanced product extraction for URL:", affiliateUrl);
    
    try {
      // Call the Supabase Edge Function for real scraping
      const { data, error } = await supabase.functions.invoke('scrape-product', {
        body: { url: affiliateUrl }
      });

      if (error) {
        console.error("Scraping function error:", error);
        throw new Error(`Scraping failed: ${error.message}`);
      }

      if (!data || !data.success) {
        console.error("Scraping failed:", data?.error);
        throw new Error(data?.error || "Failed to scrape product");
      }

      console.log("Successfully scraped product:", data.product);
      
      // Convert the database response to the expected format
      return {
        name: data.product.name,
        price: data.product.price,
        originalPrice: data.product.original_price,
        imageUrl: data.product.image_url,
        description: data.product.description,
        category: data.product.category,
        platform: data.product.platform,
        rating: data.product.rating,
        brand: data.product.brand
      };

    } catch (error) {
      console.error("Error in enhanced product extraction:", error);
      
      // Fallback to enhanced mock data if real scraping fails
      console.log("Falling back to enhanced mock data generation");
      const platform = this.detectPlatform(affiliateUrl);
      return this.generateEnhancedMockData(platform, affiliateUrl);
    }
  }

  private static detectPlatform(url: string): 'amazon' | 'aliexpress' | 'ebay' {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('amazon.')) {
      return 'amazon';
    } else if (urlLower.includes('aliexpress.')) {
      return 'aliexpress';
    } else if (urlLower.includes('ebay.')) {
      return 'ebay';
    }
    
    return 'amazon';
  }

  private static generateEnhancedMockData(platform: 'amazon' | 'aliexpress' | 'ebay', url: string): Partial<ExtractedProductData> {
    console.log('Generating enhanced mock data for platform:', platform);
    
    const mockProducts = {
      amazon: [
        {
          name: "אוזניות Bluetooth אלחוטיות מקצועיות Pro Max",
          price: 119.99,
          originalPrice: 179.99,
          imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
          description: "אוזניות אלחוטיות איכותיות עם ביטול רעש אקטיבי, איכות צליל מעולה וסוללה ארוכת מחזיק עד 30 שעות. מושלמות לאוהבי מוסיקה ואנשי מקצוע.",
          category: "Electronics",
          rating: 4.5,
          brand: "AudioTech Pro"
        },
        {
          name: "Smart Watch Fitness Tracker with GPS",
          price: 199.99,
          originalPrice: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          description: "שעון חכם מתקדם עם GPS, ניטור קצב לב, מד צעדים ועמידות במים. מושלם לספורטאים ולחיים פעילים.",
          category: "Electronics",
          rating: 4.3,
          brand: "FitTech"
        }
      ],
      aliexpress: [
        {
          name: "עכבר גיימינג RGB עם דיוק גבוה Pro Gaming",
          price: 49.99,
          originalPrice: 89.99,
          imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          description: "עכבר גיימינג מקצועי עם תאורת RGB מותאמת אישית, חיישן אופטי דיוק גבוה 16000 DPI ועיצוב ארגונומי למשחק ממושך.",
          category: "Gaming",
          rating: 4.2,
          brand: "GameMaster Pro"
        },
        {
          name: "LED Strip Lights Smart WiFi 5M Kit",
          price: 29.99,
          originalPrice: 59.99,
          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          description: "רצועות LED חכמות עם WiFi, שליטה באפליקציה, סנכרון מוסיקה ו-16 מיליון צבעים. אורך 5 מטר עם חיתוך אישי.",
          category: "Home Decor",
          rating: 4.4,
          brand: "SmartLights"
        }
      ],
      ebay: [
        {
          name: "שעון יד בסגנון וינטג' Luxury Edition",
          price: 149.99,
          originalPrice: 229.99,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          description: "שעון יד יוקרתי בסגנון וינטג' עם רצועת עור איטלקית אמיתית, מנגנון קוורץ שוויצרי ועמידות במים 50 מטר.",
          category: "Fashion",
          rating: 4.1,
          brand: "LuxuryTime"
        },
        {
          name: "Professional Tool Set Deluxe 150 Pieces",
          price: 179.99,
          originalPrice: 279.99,
          imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop",
          description: "ערכת כלים מקצועית יוקרתית עם 150 חלקים, תיק קשיח מאורגן ואחריות לכל החיים. כלים באיכות גרמנית מעולה.",
          category: "Tools",
          rating: 4.6,
          brand: "ProCraft"
        }
      ]
    };

    const platformProducts = mockProducts[platform];
    const randomProduct = platformProducts[Math.floor(Math.random() * platformProducts.length)];
    
    return {
      ...randomProduct,
      platform
    };
  }

  static createProductFromExtracted(extractedData: Partial<ExtractedProductData>, affiliateUrl: string): Product {
    const now = new Date().toISOString();
    const discount = extractedData.originalPrice && extractedData.price ? 
      Math.round(((extractedData.originalPrice - extractedData.price) / extractedData.originalPrice) * 100) : 
      undefined;

    return {
      id: Date.now().toString(),
      name: extractedData.name || "Unknown Product",
      price: extractedData.price || 0,
      originalPrice: extractedData.originalPrice,
      imageUrl: extractedData.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: extractedData.description || "No description available",
      affiliateLink: affiliateUrl,
      category: extractedData.category || "Other",
      platform: extractedData.platform || "amazon",
      rating: extractedData.rating,
      brand: extractedData.brand,
      discount,
      isNew: true,
      createdAt: now
    };
  }
}
