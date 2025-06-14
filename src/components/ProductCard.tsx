
import { useState } from "react";
import { Heart, ExternalLink, Star, Zap, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Product";
import { UrgentDealTimer } from "./UrgentDealTimer";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductCardProps {
  product: Product;
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
}

export const ProductCard = ({ product, wishlist, setWishlist }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();
  const isInWishlist = wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      setWishlist(wishlist.filter(id => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleProductClick = () => {
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs font-semibold">
            <Zap size={10} className="mr-1" />
            {t('product.new')}
          </Badge>
        )}
        {product.isTrending && (
          <Badge variant="secondary" className="bg-pink-100 text-pink-800 text-xs font-semibold">
            <TrendingUp size={10} className="mr-1" />
            {t('product.trending')}
          </Badge>
        )}
        {product.discount && product.discount > 0 && (
          <Badge variant="destructive" className="text-xs font-semibold">
            -{product.discount}%
          </Badge>
        )}
        {product.isExclusive && (
          <Badge variant="default" className="bg-gold text-black text-xs font-semibold">
            {t('product.exclusive')}
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-3 right-3 z-10 h-8 w-8 p-0 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
        onClick={toggleWishlist}
      >
        <Heart
          size={16}
          className={`${
            isInWishlist 
              ? "fill-red-500 text-red-500" 
              : "text-gray-600 dark:text-gray-400"
          } transition-colors`}
        />
      </Button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onError={handleImageError}
            onClick={handleProductClick}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer" onClick={handleProductClick}>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{t('product.imageNotAvailable')}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Urgent Deal Timer */}
        {product.hasUrgentDeal && product.urgentDealExpiry && (
          <UrgentDealTimer expiryDate={product.urgentDealExpiry} className="mb-2" />
        )}

        {/* Product Name */}
        <h3 
          className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.floor(product.rating!)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Platform Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.platform.charAt(0).toUpperCase() + product.platform.slice(1)}
          </Badge>
          <Button
            size="sm"
            onClick={handleProductClick}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
          >
            {t('product.viewDeal')}
            <ExternalLink size={12} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
