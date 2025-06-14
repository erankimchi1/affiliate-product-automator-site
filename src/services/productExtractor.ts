
import { Product } from "@/types/Product";

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
    console.log("Extracting product data from URL:", affiliateUrl);
    
    try {
      // Determine platform from URL
      const platform = this.detectPlatform(affiliateUrl);
      
      // For demo purposes, we'll simulate extraction with mock data
      // In a real implementation, you'd use web scraping or product APIs
      const mockData = this.generateMockData(platform, affiliateUrl);
      
      return mockData;
    } catch (error) {
      console.error("Error extracting product data:", error);
      throw new Error("Failed to extract product data from URL");
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
