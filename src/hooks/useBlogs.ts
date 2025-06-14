
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/Product';
import { toast } from 'sonner';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      
      // Transform database blogs to match BlogPost interface
      return data.map((blog): BlogPost => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        imageUrl: blog.image_url || '',
        link: blog.link || '#',
        publishedAt: blog.published_at
      }));
    }
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blog: Omit<BlogPost, 'id'>) => {
      const { data, error } = await supabase
        .from('blogs')
        .insert({
          title: blog.title,
          excerpt: blog.excerpt,
          image_url: blog.imageUrl,
          link: blog.link,
          published_at: blog.publishedAt
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding blog:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog post added successfully!');
    },
    onError: (error) => {
      console.error('Error adding blog:', error);
      toast.error('Failed to add blog post');
    }
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blog: BlogPost) => {
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title: blog.title,
          excerpt: blog.excerpt,
          image_url: blog.imageUrl,
          link: blog.link,
          published_at: blog.publishedAt
        })
        .eq('id', blog.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating blog:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog post updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog post');
    }
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (blogId: string) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId);
      
      if (error) {
        console.error('Error deleting blog:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog post deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog post');
    }
  });
};
