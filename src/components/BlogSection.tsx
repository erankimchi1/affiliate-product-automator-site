
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { BlogPost } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";

export const BlogSection = () => {
  const { t } = useLanguage();

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Top 10 Tech Deals This Week",
      excerpt: "Discover amazing discounts on the latest gadgets and electronics that you don't want to miss.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      link: "#",
      publishedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Best Home Kitchen Appliances Under $100",
      excerpt: "Transform your kitchen without breaking the bank with these incredible budget-friendly finds.",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      link: "#",
      publishedAt: "2024-01-14"
    },
    {
      id: "3",
      title: "Fashion Trends 2024: Affordable Style Guide",
      excerpt: "Stay fashionable on a budget with our curated selection of trendy and affordable clothing.",
      imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
      link: "#",
      publishedAt: "2024-01-13"
    }
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('main.latestGuides')}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t('main.guidesSubtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={14} />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                onClick={() => window.open(post.link, '_blank')}
              >
                {t('common.readMore')}
                <ExternalLink size={14} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
