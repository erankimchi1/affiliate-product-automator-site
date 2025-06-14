
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { FeaturedSection } from "./FeaturedSection";
import { ProductCard } from "./ProductCard";
import { BlogSection } from "./BlogSection";
import { ExclusiveDeals } from "./ExclusiveDeals";
import { SubscriptionForm } from "./SubscriptionForm";
import { ScrollToTop } from "./ScrollToTop";
import { Product, BlogPost } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainContentProps {
  products: Product[];
  blogs: BlogPost[];
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  isLoading?: boolean;
  isAdmin?: boolean;
  onEditBlog?: (blog: BlogPost) => void;
  onDeleteBlog?: (blogId: string) => void;
  onAddBlog?: () => void;
}

export const MainContent = ({ 
  products, 
  blogs,
  wishlist,
  setWishlist,
  selectedCategory, 
  onCategoryChange, 
  searchTerm,
  isLoading = false,
  isAdmin = false,
  onEditBlog,
  onDeleteBlog,
  onAddBlog
}: MainContentProps) => {
  const { t } = useLanguage();
  const [visibleProducts, setVisibleProducts] = useState(12);

  // Get unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const featuredProducts = products.filter(product => product.featured);
  const latestProducts = products.slice(0, visibleProducts);
  const exclusiveProducts = products.filter(product => product.isExclusive);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 12);
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      {featuredProducts.length > 0 && (
        <FeaturedSection 
          products={featuredProducts}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      )}

      {exclusiveProducts.length > 0 && (
        <ExclusiveDeals 
          products={exclusiveProducts}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      )}

      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('main.latestProducts')}</h2>
        </div>
        
        {latestProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t('main.noProductsFound')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              ))}
            </div>

            {visibleProducts < products.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreProducts}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <BlogSection 
        blogs={blogs}
        isAdmin={isAdmin}
        onEditBlog={onEditBlog}
        onDeleteBlog={onDeleteBlog}
        onAddBlog={onAddBlog}
      />

      <SubscriptionForm />
      <ScrollToTop />
    </main>
  );
};
