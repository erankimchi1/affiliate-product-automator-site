
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExclusiveDealsProps {
  products: Product[];
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
}

export const ExclusiveDeals = ({ products, wishlist, setWishlist }: ExclusiveDealsProps) => {
  const { t } = useLanguage();
  const exclusiveProducts = products.filter(p => p.isExclusive || p.isEarlyAccess);

  if (exclusiveProducts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ⭐ {t('main.exclusiveDeals')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('main.exclusiveSubtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exclusiveProducts.slice(0, 6).map((product) => (
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
