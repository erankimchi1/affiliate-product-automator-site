
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { Product } from "@/types/Product";
import { SocialShare } from "./SocialShare";

interface ProductActionsProps {
  product: Product;
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
  compact?: boolean;
}

export const ProductActions = ({ 
  product, 
  wishlist, 
  setWishlist, 
  compact = false 
}: ProductActionsProps) => {
  const [showShare, setShowShare] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist(wishlist.filter(id => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  };

  if (compact) return null;

  return (
    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
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
        {showShare && (
          <div className="absolute top-0 right-10 z-[100]">
            <SocialShare product={product} onClose={() => setShowShare(false)} />
          </div>
        )}
      </div>
    </div>
  );
};
