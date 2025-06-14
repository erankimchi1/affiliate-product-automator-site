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
}

export class ProductExtractor {
  static async extractFromUrl(affiliateUrl: string): Promise<Partial<ExtractedProductData>> {
    console.log("Starting real product extraction for URL:", affiliateUrl);
    
    try {
      // Call the Supabase Edge Function for real scraping
      const { data, error } = await supabase.functions.invoke('scrape-product', {
        body: { url: affiliateUrl }
      });

      if (error) {
        console.error("Scraping function error:", error);
        throw new Error(`Scraping failed: ${error.message}`);
      }

      if (!data.success) {
        console.error("Scraping failed:", data.error);
        throw new Error(data.error || "Failed to scrape product");
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
        rating: data.product.rating
      };

    } catch (error) {
      console.error("Error in product extraction:", error);
      
      // Fallback to mock data if real scraping fails
      console.log("Falling back to mock data generation");
      const platform = this.detectPlatform(affiliateUrl);
      return this.generateMockData(platform, affiliateUrl);
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
    
    // Default to amazon if platform cannot be determined
    return 'amazon';
  }

  private static generateMockData(platform: 'amazon' | 'aliexpress' | 'ebay', url: string): Partial<ExtractedProductData> {
    // Mock data generator - in real implementation, this would be actual extraction
    const mockProducts = {
      amazon: [
        {
          name: "Premium Wireless Earbuds",
          price: 79.99,
          originalPrice: 119.99,
          imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
          description: "High-quality wireless earbuds with noise cancellation",
          category: "Tech",
          rating: 4.5
        },
        {
          name: "Smart Home Security Camera",
          price: 149.99,
          originalPrice: 199.99,
          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          description: "1080p HD security camera with night vision",
          category: "Home",
          rating: 4.3
        }
      ],
      aliexpress: [
        {
          name: "Bluetooth Gaming Mouse",
          price: 29.99,
          originalPrice: 49.99,
          imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
          description: "RGB gaming mouse with high precision sensor",
          category: "Tech",
          rating: 4.2
        },
        {
          name: "LED Strip Lights Kit",
          price: 19.99,
          originalPrice: 34.99,
          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          description: "Color-changing LED strips for room decoration",
          category: "Home",
          rating: 4.4
        }
      ],
      ebay: [
        {
          name: "Vintage Style Watch",
          price: 89.99,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
          description: "Classic vintage-style wristwatch with leather band",
          category: "Fashion",
          rating: 4.1
        },
        {
          name: "Professional Tool Set",
          price: 159.99,
          originalPrice: 219.99,
          imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop",
          description: "Complete professional tool kit with carrying case",
          category: "Tools",
          rating: 4.6
        }
      ]
    };

    // Randomly select a mock product for the platform
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
      discount,
      isNew: true,
      createdAt: now
    };
  }
}
