
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/Product";

interface SuggestedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
}

export const SuggestedProducts = ({ 
  currentProduct, 
  allProducts, 
  wishlist, 
  setWishlist 
}: SuggestedProductsProps) => {
  const getSuggestedProducts = () => {
    const suggestions = allProducts
      .filter(product => product.id !== currentProduct.id)
      .map(product => {
        let score = 0;
        
        // Same category boost
        if (product.category === currentProduct.category) {
          score += 3;
        }
        
        // Same brand boost
        if (product.brand && currentProduct.brand && 
            product.brand.toLowerCase() === currentProduct.brand.toLowerCase()) {
          score += 2;
        }
        
        // Shared keywords boost
        const currentKeywords = currentProduct.keywords || 
          currentProduct.name.toLowerCase().split(' ');
        const productKeywords = product.keywords || 
          product.name.toLowerCase().split(' ');
        
        const sharedKeywords = currentKeywords.filter(keyword => 
          productKeywords.some(pk => pk.includes(keyword) || keyword.includes(pk))
        );
        score += sharedKeywords.length * 0.5;
        
        return { product, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.product);
    
    return suggestions;
  };

  const suggestedProducts = getSuggestedProducts();

  if (suggestedProducts.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        💡 Frequently Bought Together
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            wishlist={wishlist}
            setWishlist={setWishlist}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
};
