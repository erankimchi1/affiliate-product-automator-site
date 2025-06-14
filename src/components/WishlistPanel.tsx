
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, ExternalLink } from "lucide-react";
import { Product } from "@/types/Product";

interface WishlistPanelProps {
  products: Product[];
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
  onClose: () => void;
}

export const WishlistPanel = ({ products, wishlist, setWishlist, onClose }: WishlistPanelProps) => {
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(id => id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist ({wishlist.length})</h2>
            </div>
            <div className="flex gap-2">
              {wishlist.length > 0 && (
                <Button variant="outline" onClick={clearWishlist}>
                  Clear All
                </Button>
              )}
              <Button variant="outline" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-400">Add products to your wishlist to keep track of items you love!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistProducts.map((product) => (
                <Card key={product.id} className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => window.open(product.affiliateLink, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        Buy Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
