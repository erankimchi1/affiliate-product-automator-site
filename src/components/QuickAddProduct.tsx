
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Link, Plus } from "lucide-react";
import { Product } from "@/types/Product";
import { ProductExtractor } from "@/services/productExtractor";
import { toast } from "sonner";

interface QuickAddProductProps {
  onProductAdd: (product: Product) => void;
}

export const QuickAddProduct = ({ onProductAdd }: QuickAddProductProps) => {
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

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
    
    try {
      console.log("Starting product extraction for:", affiliateUrl);
      
      // Extract product data from URL
      const extractedData = await ProductExtractor.extractFromUrl(affiliateUrl);
      
      // Create product from extracted data
      const newProduct = ProductExtractor.createProductFromExtracted(extractedData, affiliateUrl);
      
      // Add product
      onProductAdd(newProduct);
      
      // Reset form
      setAffiliateUrl("");
      
      toast.success(`Product "${newProduct.name}" added successfully!`);
      
    } catch (error) {
      console.error("Failed to extract product:", error);
      toast.error("Failed to extract product data. Please try the manual form instead.");
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link size={20} />
          Quick Add via Affiliate URL
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
              Supports Amazon, AliExpress, and eBay affiliate links
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isExtracting}
          >
            {isExtracting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting Product Data...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Extract & Add Product
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
