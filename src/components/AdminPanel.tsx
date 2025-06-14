import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Trash2, Code, Webhook, Edit, BookOpen } from "lucide-react";
import { Product, BlogPost } from "@/types/Product";
import { QuickAddProduct } from "@/components/QuickAddProduct";
import { BlogManager } from "@/components/BlogManager";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onClose: () => void;
  onLogout?: () => void;
}

export const AdminPanel = ({ products, setProducts, onClose, onLogout }: AdminPanelProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    imageUrl: "",
    description: "",
    affiliateLink: "",
    category: "",
    platform: "amazon" as const,
    featured: false,
    rating: "",
    isNew: false,
    isTrending: false
  });

  const [showApiInfo, setShowApiInfo] = useState(false);
  const [showBlogManager, setShowBlogManager] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([
    {
      id: "1",
      title: "10 מבצעי הטק הטובים ביותר השבוע",
      excerpt: "גלו הנחות מדהימות על הגאדג'טים והאלקטרוניקה החדשים ביותר שאתם לא רוצים לפספס.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      link: "#tech-deals",
      publishedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "מכשירי מטבח ביתיים הטובים ביותר מתחת ל-400₪",
      excerpt: "שנו את המטבח שלכם בלי לפוצץ את התקציב עם הממצאים המדהימים והחסכוניים האלה.",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      link: "#kitchen-deals",
      publishedAt: "2024-01-14"
    },
    {
      id: "3",
      title: "טרנדי אופנה 2024: מדריך סטייל במחירים נוחים",
      excerpt: "הישארו אופנתיים בתקציב מוגבל עם המבחר הנבחר שלנו של בגדים אופנתיים ובמחירים נגישים.",
      imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
      link: "#fashion-deals",
      publishedAt: "2024-01-13"
    }
  ]);

  const handleProductAdd = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleBlogSave = (blog: BlogPost) => {
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
      toast.success(t('message.blogUpdated'));
    } else {
      setBlogs([blog, ...blogs]);
      toast.success(t('message.blogAdded'));
    }
    setEditingBlog(null);
    setShowBlogManager(false);
  };

  const handleBlogEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowBlogManager(true);
  };

  const handleBlogDelete = (blogId: string) => {
    if (window.confirm(t('message.confirmDeleteBlog'))) {
      setBlogs(blogs.filter(b => b.id !== blogId));
      toast.success(t('message.blogDeleted'));
    }
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    setShowBlogManager(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      imageUrl: formData.imageUrl,
      description: formData.description,
      affiliateLink: formData.affiliateLink,
      category: formData.category,
      platform: formData.platform,
      featured: formData.featured,
      rating: formData.rating ? parseFloat(formData.rating) : undefined,
      isNew: formData.isNew,
      isTrending: formData.isTrending,
      createdAt: new Date().toISOString(),
      discount: formData.originalPrice ? 
        Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100) : 
        undefined
    };

    setProducts([newProduct, ...products]);
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      imageUrl: "",
      description: "",
      affiliateLink: "",
      category: "",
      platform: "amazon",
      featured: false,
      rating: "",
      isNew: false,
      isTrending: false
    });

    toast.success("Product added successfully!");
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleWebhookTest = () => {
    const testProduct = {
      name: "Auto-Added Test Product",
      price: 99.99,
      originalPrice: 149.99,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      description: "This product was automatically added via webhook",
      affiliateLink: "https://example.com/test",
      category: "Tech",
      platform: "amazon" as const,
      isNew: true
    };

    const newProduct: Product = {
      ...testProduct,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      discount: Math.round(((testProduct.originalPrice - testProduct.price) / testProduct.originalPrice) * 100)
    };

    setProducts([newProduct, ...products]);
    toast.success("Webhook test successful! Product auto-added.");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('admin.dashboard')}</h2>
              <div className="flex gap-2">
                {onLogout && (
                  <Button
                    variant="secondary"
                    onClick={onLogout}
                    className="text-xs"
                  >{t('admin.logout')}</Button>
                )}
                <Button variant="outline" onClick={onClose}>
                  <X size={20} />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products">{t('admin.products')}</TabsTrigger>
                <TabsTrigger value="blogs">{t('admin.blogs')}</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Add Product */}
                  <QuickAddProduct onProductAdd={handleProductAdd} />

                  {/* Manual Add Product Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus size={20} />
                        {t('admin.manualAddProduct')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">{t('product.name')} *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">{t('product.price')} *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="originalPrice">{t('product.originalPrice')}</Label>
                            <Input
                              id="originalPrice"
                              type="number"
                              step="0.01"
                              value={formData.originalPrice}
                              onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="imageUrl">{t('product.imageUrl')} *</Label>
                          <Input
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">{t('product.description')}</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                          />
                        </div>

                        <div>
                          <Label htmlFor="affiliateLink">{t('product.affiliateLink')} *</Label>
                          <Input
                            id="affiliateLink"
                            value={formData.affiliateLink}
                            onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">{t('product.category')} *</Label>
                            <Input
                              id="category"
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="platform">{t('product.platform')}</Label>
                            <Select value={formData.platform} onValueChange={(value: any) => setFormData({...formData, platform: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="amazon">Amazon</SelectItem>
                                <SelectItem value="aliexpress">AliExpress</SelectItem>
                                <SelectItem value="ebay">eBay</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="rating">{t('product.rating')} (1-5)</Label>
                          <Input
                            id="rating"
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={formData.rating}
                            onChange={(e) => setFormData({...formData, rating: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="featured"
                              checked={formData.featured}
                              onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
                            />
                            <Label htmlFor="featured">{t('product.featured')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="isNew"
                              checked={formData.isNew}
                              onCheckedChange={(checked) => setFormData({...formData, isNew: !!checked})}
                            />
                            <Label htmlFor="isNew">{t('product.markAsNew')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="isTrending"
                              checked={formData.isTrending}
                              onCheckedChange={(checked) => setFormData({...formData, isTrending: !!checked})}
                            />
                            <Label htmlFor="isTrending">{t('product.markAsTrending')}</Label>
                          </div>
                        </div>

                        <Button type="submit" className="w-full">
                          {t('admin.addProduct')}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* API Integration & Product List */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Webhook Integration */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Webhook size={20} />
                        {t('admin.automaticIntegration')}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiInfo(!showApiInfo)}
                        >
                          {showApiInfo ? t('common.hide') : t('common.show')} {t('common.details')}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">{t('admin.webhookEndpoint')}:</h4>
                          <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                            POST https://your-domain.com/api/products/webhook
                          </code>
                        </div>
                        <Button onClick={handleWebhookTest} className="w-full">
                          {t('admin.testWebhook')}
                        </Button>
                      </div>
                      
                      {showApiInfo && (
                        <div className="mt-4 space-y-4 text-sm">
                          <div>
                            <h4 className="font-semibold mb-2">{t('admin.expectedFormat')}:</h4>
                            <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">
{`{
  "name": "Product Name",
  "price": 29.99,
  "originalPrice": 49.99,
  "imageUrl": "https://example.com/image.jpg",
  "description": "Product description",
  "affiliateLink": "https://affiliate-url.com",
  "category": "Tech",
  "platform": "amazon",
  "rating": 4.5,
  "featured": false,
  "isNew": true,
  "isTrending": false
}`}
                            </pre>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Current Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('admin.currentProducts')} ({products.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {products.map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-3 border rounded bg-gray-50 dark:bg-gray-700">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                ${product.price} - {product.category}
                                {product.isNew && <span className="ml-2 text-purple-600 font-semibold">{t('product.new')}</span>}
                                {product.isTrending && <span className="ml-2 text-pink-600 font-semibold">{t('product.trending')}</span>}
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="blogs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen size={20} />
                        {t('admin.blogManagement')}
                      </div>
                      <Button onClick={handleAddBlog} className="gap-2">
                        <Plus size={16} />
                        {t('admin.addBlog')}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="flex items-center justify-between p-4 border rounded bg-gray-50 dark:bg-gray-700">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{blog.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{blog.excerpt}</p>
                            <p className="text-xs text-gray-400 mt-2">{t('blog.publishedAt')}: {blog.publishedAt}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBlogEdit(blog)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleBlogDelete(blog.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Blog Manager Dialog */}
      {showBlogManager && (
        <BlogManager
          isOpen={showBlogManager}
          onClose={() => {
            setShowBlogManager(false);
            setEditingBlog(null);
          }}
          blog={editingBlog}
          onSave={handleBlogSave}
        />
      )}
    </>
  );
};
