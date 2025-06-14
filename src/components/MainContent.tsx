
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedSection } from "@/components/FeaturedSection";
import { ExclusiveDeals } from "@/components/ExclusiveDeals";
import { BlogSection } from "@/components/BlogSection";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainContentProps {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: string[];
  setWishlist: (wishlist: string[]) => void;
}

export const MainContent = ({
  products,
  filteredProducts,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  wishlist,
  setWishlist
}: MainContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { t } = useLanguage();

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  const featuredProducts = products.filter(p => p.featured);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Exclusive Deals */}
      <ExclusiveDeals products={products} wishlist={wishlist} setWishlist={setWishlist} />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <FeaturedSection products={featuredProducts} wishlist={wishlist} setWishlist={setWishlist} />
      )}

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === "all" ? t('main.allProducts') : t(`category.${selectedCategory.toLowerCase()}`)} 
            <span className="text-gray-500 ml-2">({filteredProducts.length})</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              wishlist={wishlist}
              setWishlist={setWishlist}
              allProducts={products}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t('search.noResults')}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="mx-1"
                >
                  {page}
                </Button>
              ))}
            </Pagination>
          </div>
        )}
      </div>

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
};
