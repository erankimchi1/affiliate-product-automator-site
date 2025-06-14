
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash2, Code } from "lucide-react";
import { Product } from "@/pages/Index";
import { toast } from "sonner";

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onClose: () => void;
}

export const AdminPanel = ({ products, setProducts, onClose }: AdminPanelProps) => {
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
    rating: ""
  });

  const [showApiInfo, setShowApiInfo] = useState(false);

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
      discount: formData.originalPrice ? 
        Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100) : 
        undefined
    };

    setProducts([...products, newProduct]);
    
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
      rating: ""
    });

    toast.success("Product added successfully!");
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <Button variant="outline" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus size={20} />
                  Add New Product
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

                  <Button type="submit" className="w-full">
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Product List & API Info */}
            <div className="space-y-6">
              {/* API Integration Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code size={20} />
                    Python API Integration
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiInfo(!showApiInfo)}
                    >
                      {showApiInfo ? 'Hide' : 'Show'} Details
                    </Button>
                  </CardTitle>
                </CardHeader>
                {showApiInfo && (
                  <CardContent>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">API Endpoint for Adding Products:</h4>
                        <code className="block bg-gray-100 p-2 rounded">
                          POST /api/products
                        </code>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Python Script Example:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`import requests

def add_product(product_data):
    url = "http://localhost:8080/api/products"
    response = requests.post(url, json=product_data)
    return response.json()

# Example usage
product = {
    "name": "Amazing Gadget",
    "price": 29.99,
    "imageUrl": "https://example.com/image.jpg",
    "description": "Great product",
    "affiliateLink": "https://amazon.com/...",
    "category": "Electronics",
    "platform": "amazon"
}

add_product(product)`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Current Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Products ({products.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">${product.price} - {product.category}</p>
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
    </div>
  );
};
