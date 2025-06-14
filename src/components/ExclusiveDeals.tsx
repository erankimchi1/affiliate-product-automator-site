
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  
  // Filter for exclusive products
  const exclusiveProducts = products.filter(product => product.isExclusive);
  
  if (exclusiveProducts.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Badge variant="destructive" className="text-sm font-semibold">
            {t('deals.exclusive')}
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('deals.exclusiveDeals')}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {t('deals.exclusiveDescription')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exclusiveProducts.slice(0, 8).map((product) => (
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
