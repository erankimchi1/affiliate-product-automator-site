
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";
import { SuggestedProducts } from "./SuggestedProducts";
import { ProductImage } from "./ProductImage";
import { ProductActions } from "./ProductActions";
import { ProductInfo } from "./ProductInfo";

interface ProductCardProps {
  product: Product;
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
  allProducts?: Product[];
  compact?: boolean;
}

export const ProductCard = ({ 
  product, 
  wishlist, 
  setWishlist, 
  allProducts, 
  compact = false 
}: ProductCardProps) => {
  const [showSuggested, setShowSuggested] = useState(false);

  const handleBuyNow = () => {
    console.log(`Product clicked: ${product.name} - ${product.platform}`);
    if (allProducts && !compact) {
      setShowSuggested(true);
      setTimeout(() => setShowSuggested(false), 10000);
    }
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative overflow-visible">
        <CardContent className="p-0">
          <ProductImage product={product} compact={compact} />
          <ProductActions 
            product={product} 
            wishlist={wishlist} 
            setWishlist={setWishlist} 
            compact={compact} 
          />
          <ProductInfo 
            product={product} 
            compact={compact} 
            onBuyNow={handleBuyNow} 
          />
        </CardContent>
      </Card>

      {/* Suggested Products */}
      {showSuggested && allProducts && !compact && (
        <SuggestedProducts
          currentProduct={product}
          allProducts={allProducts}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      )}
    </>
  );
};
