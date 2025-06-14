
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { Product } from "@/types/Product";
import { UrgentDealTimer } from "./UrgentDealTimer";

interface ProductInfoProps {
  product: Product;
  compact?: boolean;
  onBuyNow: () => void;
}

export const ProductInfo = ({ product, compact = false, onBuyNow }: ProductInfoProps) => {
  const [urgentDealActive, setUrgentDealActive] = useState<boolean>(
    !!(product.hasUrgentDeal && product.urgentDealExpiry)
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className={compact ? "p-3" : "p-4"}>
      <h3 className={`font-semibold text-gray-900 dark:text-white ${compact ? 'mb-1 text-sm' : 'mb-2'} line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
        {product.name}
      </h3>
      
      {!compact && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.seoDescription || product.description}
        </p>
      )}

      {/* Rating */}
      {product.rating && (
        <div className={`flex items-center gap-1 ${compact ? 'mb-2' : 'mb-3'}`}>
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({product.rating})</span>
        </div>
      )}

      {/* Urgent Deal Timer */}
      {urgentDealActive && product.urgentDealExpiry && !compact && (
        <div className="mb-3">
          <UrgentDealTimer 
            expiryTime={product.urgentDealExpiry}
            onExpire={() => setUrgentDealActive(false)}
          />
        </div>
      )}

      {/* Price */}
      <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-4'}`}>
        <span className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-gray-900 dark:text-white`}>
          ${product.price}
        </span>
        {product.originalPrice && (
          <span className={`${compact ? 'text-sm' : 'text-lg'} text-gray-500 dark:text-gray-400 line-through`}>
            ${product.originalPrice}
          </span>
        )}
      </div>

      {/* Buy Button */}
      <Button 
        onClick={onBuyNow}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold ${compact ? 'py-1 text-sm' : 'py-2'} rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105`}
      >
        Buy Now
        <ExternalLink size={compact ? 12 : 16} />
      </Button>
    </div>
  );
};
