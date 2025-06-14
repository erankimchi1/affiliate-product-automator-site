
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCategories = ["Tech", "Home", "Fashion", "Tools"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter(c => c !== category));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || categories.length === 0) {
      toast.error("Please enter your email and select at least one category");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send to your backend
    console.log("Subscription:", { email, categories });
    
    toast.success("Successfully subscribed to deal notifications!");
    setEmail("");
    setCategories([]);
    setIsSubmitting(false);
  };

  return (
    <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          🔔 Never Miss a Deal!
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300">
          Subscribe to get weekly deal summaries delivered to your inbox
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <Label>Interested Categories</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {availableCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to Deals"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
