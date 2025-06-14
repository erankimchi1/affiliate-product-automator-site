
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { BlogPost } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogSectionProps {
  blogs: BlogPost[];
  isAdmin?: boolean;
  onEditBlog?: (blog: BlogPost) => void;
  onDeleteBlog?: (blogId: string) => void;
  onAddBlog?: () => void;
}

export const BlogSection = ({ 
  blogs, 
  isAdmin = false, 
  onEditBlog, 
  onDeleteBlog, 
  onAddBlog 
}: BlogSectionProps) => {
  const { t, language } = useLanguage();

  const handleBlogClick = (blog: BlogPost) => {
    if (blog.link && blog.link !== "#") {
      // If it's a proper URL, open in new tab
      if (blog.link.startsWith('http')) {
        window.open(blog.link, '_blank', 'noopener,noreferrer');
      } else {
        // If it's a relative link, navigate within the app
        window.location.href = blog.link;
      }
    } else {
      // Default behavior for placeholder links
      console.log(`Navigating to blog: ${blog.title}`);
    }
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('main.latestGuides')}</h2>
          {isAdmin && (
            <Button onClick={onAddBlog} size="sm" className="gap-2">
              <Plus size={16} />
              {t('admin.addBlog')}
            </Button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300">{t('main.guidesSubtitle')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditBlog?.(post);
                    }}
                    className="opacity-80 hover:opacity-100"
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog?.(post.id);
                    }}
                    className="opacity-80 hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={14} />
                {new Date(post.publishedAt).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
              </div>
              <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
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
                onClick={() => handleBlogClick(post)}
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
