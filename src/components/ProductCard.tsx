
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Heart, Share2 } from "lucide-react";
import { Product } from "@/types/Product";
import { SocialShare } from "./SocialShare";
import { UrgentDealTimer } from "./UrgentDealTimer";
import { SuggestedProducts } from "./SuggestedProducts";

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
  const [imageError, setImageError] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [urgentDealActive, setUrgentDealActive] = useState<boolean>(
    !!(product.hasUrgentDeal && product.urgentDealExpiry)
  );

  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    console.log(`Product clicked: ${product.name} - ${product.platform}`);
    if (allProducts && !compact) {
      setShowSuggested(true);
      setTimeout(() => setShowSuggested(false), 10000);
    }
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter(id => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
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

  const isNewProduct = product.isNew && product.createdAt && 
    (new Date().getTime() - new Date(product.createdAt).getTime()) < 48 * 60 * 60 * 1000;

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative overflow-visible">
        <CardContent className="p-0">
          {/* Product Image */}
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

            {/* Action Buttons */}
            {!compact && (
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleWishlist}
                  className={`w-8 h-8 p-0 ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                </Button>
                <div className="relative">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setShowShare(!showShare)}
                    className="w-8 h-8 p-0"
                  >
                    <Share2 size={16} />
                  </Button>
                  {/* Social Share - moved to be relative to this button */}
                  {showShare && (
                    <div className="absolute top-0 right-10 z-50">
                      <SocialShare product={product} onClose={() => setShowShare(false)} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Best Deal Badge */}
            {product.sources && product.sources.length > 1 && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-yellow-500 text-black font-bold">
                  🏆 BEST DEAL
                </Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
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
              onClick={handleBuyNow}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold ${compact ? 'py-1 text-sm' : 'py-2'} rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105`}
            >
              Buy Now
              <ExternalLink size={compact ? 12 : 16} />
            </Button>
          </div>
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
