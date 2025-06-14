import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FeaturedSection } from "@/components/FeaturedSection";
import { ExclusiveDeals } from "@/components/ExclusiveDeals";
import { AdminPanel } from "@/components/AdminPanel";
import { WishlistPanel } from "@/components/WishlistPanel";
import { BlogSection } from "@/components/BlogSection";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Settings, Heart, Sun, Moon } from "lucide-react";
import { Product } from "@/types/Product";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ScrollToTop } from "@/components/ScrollToTop";
import { generateSEODescription, generateProductKeywords } from "@/utils/seoGenerator";

const ADMIN_KEY = "adminMode";
const ADMIN_PASSWORD = "supersecret"; // CHANGE THIS to your own secret!

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [adminAuth, setAdminAuth] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ADMIN_KEY) === "true";
    }
    return false;
  });
  
  const productsPerPage = 8;

  // Sample products with enhanced data
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones Pro",
        price: 89.99,
        originalPrice: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
        affiliateLink: "https://amazon.com/affiliate-link-1",
        category: "Tech",
        platform: "amazon" as const,
        featured: true,
        rating: 4.5,
        discount: 40,
        isNew: false,
        isTrending: true,
        brand: "AudioTech",
        isExclusive: true,
        hasUrgentDeal: true,
        urgentDealExpiry: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        sources: [
          { platform: "amazon" as const, price: 89.99, link: "https://amazon.com/1" },
          { platform: "ebay" as const, price: 94.99, link: "https://ebay.com/1" }
        ]
      },
      {
        id: "2", 
        name: "Smart Fitness Watch Ultra",
        price: 199.99,
        originalPrice: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        description: "Advanced fitness tracker with GPS, heart rate monitoring, and 7-day battery",
        affiliateLink: "https://aliexpress.com/affiliate-link-2",
        category: "Tech",
        platform: "aliexpress" as const,
        rating: 4.3,
        discount: 33,
        isNew: true,
        brand: "FitTech",
        isEarlyAccess: true,
        sources: [
          { platform: "aliexpress" as const, price: 199.99, link: "https://aliexpress.com/2" },
          { platform: "amazon" as const, price: 219.99, link: "https://amazon.com/2" }
        ]
      },
      {
        id: "3",
        name: "Premium Coffee Maker Deluxe",
        price: 149.99,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        description: "Professional-grade coffee maker with built-in grinder and programmable settings",
        affiliateLink: "https://ebay.com/affiliate-link-3",
        category: "Home",
        platform: "ebay" as const,
        rating: 4.7,
        isNew: false,
        isTrending: false,
        brand: "BrewMaster"
      },
      {
        id: "4",
        name: "Portable Power Bank 20000mAh",
        price: 39.99,
        originalPrice: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
        description: "High-capacity power bank with fast charging and wireless charging pad",
        affiliateLink: "https://amazon.com/affiliate-link-4", 
        category: "Tech",
        platform: "amazon" as const,
        rating: 4.2,
        discount: 33,
        isNew: false,
        brand: "ChargeUp",
        sources: [
          { platform: "amazon" as const, price: 39.99, link: "https://amazon.com/4" },
          { platform: "aliexpress" as const, price: 45.99, link: "https://aliexpress.com/4" }
        ]
      },
      {
        id: "5",
        name: "Ergonomic Office Chair",
        price: 299.99,
        originalPrice: 449.99,
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        description: "Lumbar support office chair with adjustable height and breathable mesh",
        affiliateLink: "https://amazon.com/affiliate-link-5",
        category: "Home",
        platform: "amazon" as const,
        rating: 4.6,
        discount: 33,
        isNew: true,
        isTrending: true,
        brand: "ComfortPlus"
      },
      {
        id: "6",
        name: "Wireless Gaming Mouse RGB",
        price: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        description: "High-precision gaming mouse with customizable RGB lighting and 16000 DPI",
        affiliateLink: "https://ebay.com/affiliate-link-6",
        category: "Tech",
        platform: "ebay" as const,
        rating: 4.4,
        isNew: false,
        brand: "GameTech"
      },
      {
        id: "7",
        name: "Stainless Steel Cookware Set",
        price: 199.99,
        originalPrice: 299.99,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        description: "Professional 12-piece stainless steel cookware set with non-stick coating",
        affiliateLink: "https://amazon.com/affiliate-link-7",
        category: "Home",
        platform: "amazon" as const,
        rating: 4.8,
        discount: 33,
        isNew: false,
        isTrending: true,
        brand: "ChefWare"
      },
      {
        id: "8",
        name: "LED Desk Lamp with Wireless Charging",
        price: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Modern LED desk lamp with built-in wireless phone charger and touch controls",
        affiliateLink: "https://aliexpress.com/affiliate-link-8",
        category: "Home",
        platform: "aliexpress" as const,
        rating: 4.3,
        isNew: true,
        brand: "BrightTech"
      },
      {
        id: "9",
        name: "Bluetooth Mechanical Keyboard",
        price: 129.99,
        originalPrice: 179.99,
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
        description: "Premium mechanical keyboard with blue switches and RGB backlighting",
        affiliateLink: "https://ebay.com/affiliate-link-9",
        category: "Tech",
        platform: "ebay" as const,
        rating: 4.5,
        discount: 28,
        isNew: false,
        brand: "KeyMaster"
      },
      {
        id: "10",
        name: "Smart Home Security Camera",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        description: "1080p HD security camera with motion detection and night vision",
        affiliateLink: "https://amazon.com/affiliate-link-10",
        category: "Tech",
        platform: "amazon" as const,
        rating: 4.2,
        isNew: true,
        isTrending: true,
        brand: "SecureHome"
      },
      {
        id: "11",
        name: "Premium Yoga Mat Set",
        price: 49.99,
        originalPrice: 79.99,
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
        description: "Eco-friendly yoga mat with alignment guides and carrying strap",
        affiliateLink: "https://aliexpress.com/affiliate-link-11",
        category: "Fashion",
        platform: "aliexpress" as const,
        rating: 4.6,
        discount: 38,
        isNew: false,
        brand: "YogaLife"
      },
      {
        id: "12",
        name: "Electric Drill Tool Set",
        price: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop",
        description: "Cordless electric drill with 20 drill bits and carrying case",
        affiliateLink: "https://ebay.com/affiliate-link-12",
        category: "Tools",
        platform: "ebay" as const,
        rating: 4.4,
        isNew: false,
        isTrending: true,
        brand: "ToolMaster"
      },
      {
        id: "13",
        name: "Smart LED Light Bulbs 4-Pack",
        price: 39.99,
        originalPrice: 59.99,
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        description: "WiFi-enabled smart bulbs with color changing and voice control",
        affiliateLink: "https://amazon.com/affiliate-link-13",
        category: "Home",
        platform: "amazon" as const,
        rating: 4.3,
        discount: 33,
        isNew: true,
        brand: "LumiTech"
      },
      {
        id: "14",
        name: "Wireless Earbuds Pro",
        price: 149.99,
        originalPrice: 199.99,
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        description: "True wireless earbuds with active noise cancellation and 24-hour battery",
        affiliateLink: "https://aliexpress.com/affiliate-link-14",
        category: "Tech",
        platform: "aliexpress" as const,
        rating: 4.7,
        discount: 25,
        isNew: false,
        isTrending: true,
        brand: "AudioTech"
      },
      {
        id: "15",
        name: "Professional Hair Straightener",
        price: 89.99,
        originalPrice: 129.99,
        imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
        description: "Ceramic hair straightener with adjustable temperature and ionic technology",
        affiliateLink: "https://ebay.com/affiliate-link-15",
        category: "Fashion",
        platform: "ebay" as const,
        rating: 4.5,
        discount: 31,
        isNew: false,
        brand: "StylePro"
      }
    ].map(product => ({
      ...product,
      keywords: generateProductKeywords(product),
      seoDescription: generateSEODescription(product)
    }));
    
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keywords?.some(keyword => keyword.includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  const featuredProducts = products.filter(p => p.featured);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // SEO Meta tags
  useEffect(() => {
    document.title = "AffiliateHub Pro - Best Deals from Amazon, eBay & AliExpress";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Discover amazing deals and exclusive offers from top retailers worldwide. Compare prices, find trending products, and save money on tech, home, fashion, and tools.'
      );
    }
  }, []);

  const handleAdminClick = () => {
    if (adminAuth) {
      setShowAdmin(true);
      return;
    }
    const password = window.prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      localStorage.setItem(ADMIN_KEY, "true");
      setShowAdmin(true);
    } else if (password !== null) {
      alert("Incorrect password.");
    }
  };

  const handleAdminLogout = () => {
    setAdminAuth(false);
    localStorage.removeItem(ADMIN_KEY);
    setShowAdmin(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AffiliateHub Pro</h1>
              <p className="text-gray-600 dark:text-gray-300">Discover amazing deals from top retailers worldwide</p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowWishlist(!showWishlist)}
                className="flex items-center gap-2"
              >
                <Heart size={16} />
                Wishlist ({wishlist.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAdminClick}
                className="flex items-center gap-2"
              >
                <Settings size={16} />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      {showAdmin && adminAuth && (
        <AdminPanel 
          products={products} 
          setProducts={setProducts}
          onClose={() => setShowAdmin(false)}
          onLogout={handleAdminLogout}
        />
      )}

      {/* Wishlist Panel */}
      {showWishlist && (
        <WishlistPanel 
          products={products}
          wishlist={wishlist}
          setWishlist={setWishlist}
          onClose={() => setShowWishlist(false)}
        />
      )}

      {/* Main Content */}
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
              {selectedCategory === "all" ? "All Products" : selectedCategory} 
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
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
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

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AffiliateHub Pro</h3>
              <p className="text-gray-400">Find the best deals from Amazon, AliExpress, and eBay all in one place. Smart shopping made simple with exclusive offers and price comparisons.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tech & Electronics</li>
                <li>Home & Kitchen</li>
                <li>Fashion & Beauty</li>
                <li>Tools & Hardware</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Price Comparison</li>
                <li>Exclusive Deals</li>
                <li>Product Recommendations</li>
                <li>Mobile Optimized</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <p className="text-gray-400 text-sm">
                This site contains affiliate links. We may earn a commission when you purchase through our links at no additional cost to you.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
