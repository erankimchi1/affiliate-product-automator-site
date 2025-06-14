
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleBuyNow = () => {
    // Track click for analytics (you can add Google Analytics here)
    console.log(`Product clicked: ${product.name} - ${product.platform}`);
    
    // Open affiliate link in new tab
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'amazon': return 'bg-orange-500';
      case 'aliexpress': return 'bg-red-500';
      case 'ebay': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          {/* Platform Badge */}
          <Badge className={`absolute top-2 left-2 ${getPlatformColor(product.platform)} text-white`}>
            {product.platform.toUpperCase()}
          </Badge>
          
          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Buy Button */}
          <Button 
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Buy Now
            <ExternalLink size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
