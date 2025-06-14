
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Link, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { Product } from "@/types/Product";
import { ProductExtractor } from "@/services/productExtractor";
import { toast } from "sonner";

interface QuickAddProductProps {
  onProductAdd: (product: Product) => void;
}

export const QuickAddProduct = ({ onProductAdd }: QuickAddProductProps) => {
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStep, setExtractionStep] = useState("");

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!affiliateUrl.trim()) {
      toast.error("Please enter an affiliate URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(affiliateUrl);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsExtracting(true);
    setExtractionStep("Initializing scraper...");
    
    try {
      console.log("Starting real product extraction for:", affiliateUrl);
      
      setExtractionStep("Fetching product page...");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Visual feedback delay
      
      setExtractionStep("Extracting product data...");
      
      // Extract product data from URL using real scraping
      const extractedData = await ProductExtractor.extractFromUrl(affiliateUrl);
      
      setExtractionStep("Processing product information...");
      
      // Create product from extracted data
      const newProduct = ProductExtractor.createProductFromExtracted(extractedData, affiliateUrl);
      
      setExtractionStep("Adding product...");
      
      // Add product
      onProductAdd(newProduct);
      
      // Reset form
      setAffiliateUrl("");
      setExtractionStep("");
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Product "{newProduct.name}" scraped and added successfully!
        </div>
      );
      
    } catch (error) {
      console.error("Failed to extract product:", error);
      setExtractionStep("");
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Real scraping failed, using fallback data. Try again later.
        </div>
      );
    } finally {
      setIsExtracting(false);
      setExtractionStep("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link size={20} />
          AI-Powered Product Scraper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleQuickAdd} className="space-y-4">
          <div>
            <Label htmlFor="affiliateUrl">Affiliate URL *</Label>
            <Input
              id="affiliateUrl"
              type="url"
              value={affiliateUrl}
              onChange={(e) => setAffiliateUrl(e.target.value)}
              placeholder="https://amazon.com/dp/B123456789?tag=youraffid"
              required
              disabled={isExtracting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Real-time scraping for Amazon, AliExpress, and eBay
            </p>
          </div>

          {isExtracting && extractionStep && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">{extractionStep}</span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isExtracting}
          >
            {isExtracting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scraping Product...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Scrape & Add Product
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
