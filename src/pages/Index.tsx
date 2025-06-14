
import { useState } from "react";
import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";
import { WishlistPanel } from "@/components/WishlistPanel";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product } from "@/types/Product";
import { useProducts, useAddProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useBlogs, useAddBlog, useUpdateBlog, useDeleteBlog } from "@/hooks/useBlogs";

const Index = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage<Product[]>("wishlist", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Use hooks for dynamic data
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: blogs = [], isLoading: blogsLoading } = useBlogs();
  const addProductMutation = useAddProduct();
  const deleteProductMutation = useDeleteProduct();
  const addBlogMutation = useAddBlog();
  const updateBlogMutation = useUpdateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const handleAddProduct = (newProduct: Product) => {
    addProductMutation.mutate(newProduct);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header 
        onAdminClick={() => setIsAdminOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <MainContent 
        products={filteredProducts}
        blogs={blogs}
        onAddToWishlist={addToWishlist}
        onRemoveFromWishlist={removeFromWishlist}
        wishlist={wishlist}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        isLoading={productsLoading || blogsLoading}
        isAdmin={isLoggedIn}
        onEditBlog={(blog) => updateBlogMutation.mutate(blog)}
        onDeleteBlog={(blogId) => deleteBlogMutation.mutate(blogId)}
        onAddBlog={(blog) => addBlogMutation.mutate(blog)}
      />
      
      <Footer />

      {isAdminOpen && (
        <AdminPanel 
          products={products}
          setProducts={handleAddProduct}
          onClose={() => setIsAdminOpen(false)}
          onLogout={() => {
            setIsLoggedIn(false);
            setIsAdminOpen(false);
          }}
          onDeleteProduct={handleDeleteProduct}
          blogs={blogs}
          onAddBlog={(blog) => addBlogMutation.mutate(blog)}
          onUpdateBlog={(blog) => updateBlogMutation.mutate(blog)}
          onDeleteBlog={(blogId) => deleteBlogMutation.mutate(blogId)}
        />
      )}

      {isWishlistOpen && (
        <WishlistPanel 
          wishlist={wishlist}
          onRemoveFromWishlist={removeFromWishlist}
          onClose={() => setIsWishlistOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
