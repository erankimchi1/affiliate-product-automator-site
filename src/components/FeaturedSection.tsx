
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/Product";

interface FeaturedSectionProps {
  products: Product[];
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
}

export const FeaturedSection = ({ products, wishlist, setWishlist }: FeaturedSectionProps) => {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔥 Featured Deals</h2>
        <p className="text-gray-600 dark:text-gray-300">Don't miss these amazing limited-time offers!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        ))}
      </div>
    </section>
  );
};
