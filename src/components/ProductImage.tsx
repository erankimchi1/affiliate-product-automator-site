
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Product";

interface ProductImageProps {
  product: Product;
  compact?: boolean;
}

export const ProductImage = ({ product, compact = false }: ProductImageProps) => {
  const [imageError, setImageError] = useState(false);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'amazon': return 'bg-orange-500';
      case 'aliexpress': return 'bg-red-500';
      case 'ebay': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const isNewProduct = product.isNew && product.createdAt && 
    (new Date().getTime() - new Date(product.createdAt).getTime()) < 48 * 60 * 60 * 1000;

  return (
    <div className="relative overflow-hidden rounded-t-lg">
      {!imageError ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full ${compact ? 'h-32' : 'h-48'} object-cover group-hover:scale-110 transition-transform duration-500`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-full ${compact ? 'h-32' : 'h-48'} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <Badge className={`${getPlatformColor(product.platform)} text-white`}>
          {product.platform.toUpperCase()}
        </Badge>
        {product.isExclusive && (
          <Badge className="bg-purple-600 text-white animate-pulse">
            ⭐ EXCLUSIVE
          </Badge>
        )}
        {product.isEarlyAccess && (
          <Badge className="bg-indigo-600 text-white">
            🚀 EARLY ACCESS
          </Badge>
        )}
        {product.discount && (
          <Badge className="bg-green-500 text-white">
            -{product.discount}%
          </Badge>
        )}
        {isNewProduct && (
          <Badge className="bg-purple-500 text-white animate-pulse">
            NEW
          </Badge>
        )}
        {product.isTrending && (
          <Badge className="bg-pink-500 text-white">
            🔥 TRENDING
          </Badge>
        )}
        {product.priceDropped && (
          <Badge className="bg-blue-500 text-white">
            📉 PRICE DROP
          </Badge>
        )}
      </div>

      {/* Best Deal Badge */}
      {product.sources && product.sources.length > 1 && (
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-yellow-500 text-black font-bold">
            🏆 BEST DEAL
          </Badge>
        </div>
      )}
    </div>
  );
};
