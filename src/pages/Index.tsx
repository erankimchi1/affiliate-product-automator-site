import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";
import { WishlistPanel } from "@/components/WishlistPanel";
import { SearchBar } from "@/components/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import { useBlogs } from "@/hooks/useBlogs";
import { BlogPost } from "@/types/Product";

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products = [], isLoading: productsLoading, refetch: refetchProducts } = useProducts();
  const { data: blogs = [], isLoading: blogsLoading, refetch: refetchBlogs } = useBlogs();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedDarkMode);

    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminPanel(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddProduct = (product: any) => {
    // This will be handled by the database hooks
    refetchProducts();
  };

  const handleEditBlog = (blog: BlogPost) => {
    // This will be handled by the database hooks
    refetchBlogs();
  };

  const handleDeleteBlog = (blogId: string) => {
    // This will be handled by the database hooks
    refetchBlogs();
  };

  const handleAddBlog = () => {
    // This will be handled by the database hooks
    refetchBlogs();
  };

  // Get unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          wishlist={wishlist}
          onWishlistClick={() => setShowWishlist(!showWishlist)}
          showAdminButton={showAdminPanel}
          onAdminClick={() => setShowAdminPanel(!showAdminPanel)}
          isLoggedIn={false}
          onLogin={() => {}}
          onLogout={() => {}}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {showAdminPanel && (
          <AdminPanel 
            onProductAdd={handleAddProduct}
            onClose={() => setShowAdminPanel(false)}
          />
        )}

        {showWishlist && (
          <WishlistPanel 
            wishlist={wishlist}
            setWishlist={setWishlist}
            products={filteredProducts}
            onClose={() => setShowWishlist(false)}
          />
        )}

        <MainContent 
          products={filteredProducts}
          blogs={blogs}
          wishlist={wishlist}
          setWishlist={setWishlist}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          isLoading={productsLoading || blogsLoading}
          isAdmin={showAdminPanel}
          onEditBlog={handleEditBlog}
          onDeleteBlog={handleDeleteBlog}
          onAddBlog={handleAddBlog}
        />

        <Footer />
      </div>
    </div>
  );
}
