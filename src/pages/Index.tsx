
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedSection } from "@/components/FeaturedSection";
import { AdminPanel } from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  affiliateLink: string;
  category: string;
  platform: 'amazon' | 'aliexpress' | 'ebay';
  featured?: boolean;
  rating?: number;
  discount?: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAdmin, setShowAdmin] = useState(false);

  // Sample products (in real app, this would come from a database)
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 29.99,
        originalPrice: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        description: "High-quality wireless headphones with noise cancellation",
        affiliateLink: "https://amazon.com/affiliate-link-1",
        category: "Electronics",
        platform: "amazon",
        featured: true,
        rating: 4.5,
        discount: 50
      },
      {
        id: "2", 
        name: "Smart Fitness Watch",
        price: 79.99,
        originalPrice: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        description: "Track your fitness goals with this advanced smartwatch",
        affiliateLink: "https://aliexpress.com/affiliate-link-2",
        category: "Electronics",
        platform: "aliexpress",
        rating: 4.3,
        discount: 38
      },
      {
        id: "3",
        name: "Premium Coffee Maker",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
        description: "Brew the perfect cup every morning",
        affiliateLink: "https://ebay.com/affiliate-link-3",
        category: "Home & Kitchen",
        platform: "ebay",
        rating: 4.7
      },
      {
        id: "4",
        name: "Portable Phone Charger",
        price: 19.99,
        originalPrice: 39.99,
        imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
        description: "Never run out of battery again",
        affiliateLink: "https://amazon.com/affiliate-link-4", 
        category: "Electronics",
        platform: "amazon",
        rating: 4.2,
        discount: 50
      }
    ];
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AffiliateHub</h1>
              <p className="text-gray-600">Discover amazing deals from top retailers</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowAdmin(!showAdmin)}
              className="flex items-center gap-2"
            >
              <Settings size={16} />
              Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      {showAdmin && (
        <AdminPanel 
          products={products} 
          setProducts={setProducts}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <FeaturedSection products={featuredProducts} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AffiliateHub</h3>
              <p className="text-gray-400">Find the best deals from Amazon, AliExpress, and eBay all in one place.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Electronics</li>
                <li>Home & Kitchen</li>
                <li>Fashion</li>
                <li>Sports & Outdoors</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <p className="text-gray-400 text-sm">
                This site contains affiliate links. We may earn a commission when you purchase through our links.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
