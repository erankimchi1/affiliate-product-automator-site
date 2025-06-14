import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Trash2, Code, Webhook } from "lucide-react";
import { Product } from "@/types/Product";
import { QuickAddProduct } from "@/components/QuickAddProduct";
import { toast } from "sonner";

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onClose: () => void;
  onLogout?: () => void;
}

export const AdminPanel = ({ products, setProducts, onClose, onLogout }: AdminPanelProps) => {
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

  const handleProductAdd = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
            <div className="flex gap-2">
              {onLogout && (
                <Button
                  variant="secondary"
                  onClick={onLogout}
                  className="text-xs"
                >Logout</Button>
              )}
              <Button variant="outline" onClick={onClose}>
                <X size={20} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Add Product */}
            <QuickAddProduct onProductAdd={handleProductAdd} />

            {/* Manual Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus size={20} />
                  Manual Add Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
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
                      <Label htmlFor="originalPrice">Original Price</Label>
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
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="affiliateLink">Affiliate Link *</Label>
                    <Input
                      id="affiliateLink"
                      value={formData.affiliateLink}
                      onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="platform">Platform</Label>
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
                    <Label htmlFor="rating">Rating (1-5)</Label>
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
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isNew"
                        checked={formData.isNew}
                        onCheckedChange={(checked) => setFormData({...formData, isNew: !!checked})}
                      />
                      <Label htmlFor="isNew">Mark as New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isTrending"
                        checked={formData.isTrending}
                        onCheckedChange={(checked) => setFormData({...formData, isTrending: !!checked})}
                      />
                      <Label htmlFor="isTrending">Mark as Trending</Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* API Integration & Product List - moved to full width */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Webhook Integration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook size={20} />
                  Automatic Product Integration
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiInfo(!showApiInfo)}
                  >
                    {showApiInfo ? 'Hide' : 'Show'} Details
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Webhook Endpoint:</h4>
                    <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                      POST https://your-domain.com/api/products/webhook
                    </code>
                  </div>
                  <Button onClick={handleWebhookTest} className="w-full">
                    Test Webhook (Add Sample Product)
                  </Button>
                </div>
                
                {showApiInfo && (
                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Expected JSON Format:</h4>
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
                    
                    <div>
                      <h4 className="font-semibold mb-2">Python Script Example:</h4>
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">
{`import requests
import json

def add_product_via_webhook(product_data):
    webhook_url = "https://your-domain.com/api/products/webhook"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
    
    response = requests.post(
        webhook_url, 
        headers=headers,
        json=product_data
    )
    
    return response.json()

# Example usage
product = {
    "name": "Wireless Headphones",
    "price": 89.99,
    "originalPrice": 129.99,
    "imageUrl": "https://example.com/headphones.jpg",
    "description": "High-quality wireless headphones",
    "affiliateLink": "https://amazon.com/dp/B123456789?tag=youraffid",
    "category": "Tech",
    "platform": "amazon",
    "rating": 4.5,
    "isNew": True
}

result = add_product_via_webhook(product)
print(f"Product added: {result}")`}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Products */}
            <Card>
              <CardHeader>
                <CardTitle>Current Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded bg-gray-50 dark:bg-gray-700">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ${product.price} - {product.category}
                          {product.isNew && <span className="ml-2 text-purple-600 font-semibold">NEW</span>}
                          {product.isTrending && <span className="ml-2 text-pink-600 font-semibold">TRENDING</span>}
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
        </div>
      </div>
    </div>
  );
};
