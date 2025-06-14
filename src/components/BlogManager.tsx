
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BlogPost } from "@/types/Product";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface BlogManagerProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: BlogPost | null;
  onSave: (blog: BlogPost) => void;
}

export const BlogManager = ({ isOpen, onClose, blog, onSave }: BlogManagerProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    imageUrl: blog?.imageUrl || "",
    link: blog?.link || "#"
  });

  const handleSave = () => {
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      toast.error(t('message.fillRequiredFields'));
      return;
    }

    const newBlog: BlogPost = {
      id: blog?.id || Date.now().toString(),
      title: formData.title,
      excerpt: formData.excerpt,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      link: formData.link,
      publishedAt: blog?.publishedAt || new Date().toISOString().split('T')[0]
    };

    onSave(newBlog);
    toast.success(t('message.blogSaved'));
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {blog ? t('admin.editBlog') : t('admin.addBlog')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">{t('blog.title')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('blog.titlePlaceholder')}
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">{t('blog.excerpt')} *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder={t('blog.excerptPlaceholder')}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="imageUrl">{t('blog.imageUrl')}</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              placeholder={t('blog.imageUrlPlaceholder')}
            />
          </div>
          
          <div>
            <Label htmlFor="link">{t('blog.link')}</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder={t('blog.linkPlaceholder')}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>
              {t('common.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
