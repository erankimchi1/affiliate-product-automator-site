
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/Product';
import { toast } from 'sonner';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      // Transform database products to match Product interface
      return data.map((product): Product => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        originalPrice: product.original_price ? Number(product.original_price) : undefined,
        imageUrl: product.image_url || '',
        description: product.description || '',
        affiliateLink: product.affiliate_link,
        category: product.category || '',
        platform: product.platform as 'amazon' | 'aliexpress' | 'ebay',
        featured: product.featured || false,
        rating: product.rating ? Number(product.rating) : undefined,
        discount: product.discount,
        isNew: product.is_new || false,
        isTrending: product.is_trending || false,
        priceDropped: product.price_dropped || false,
        createdAt: product.created_at,
        views: product.views || 0,
        brand: product.brand,
        keywords: product.keywords || [],
        seoDescription: product.seo_description
      }));
    }
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          price: product.price,
          original_price: product.originalPrice,
          image_url: product.imageUrl,
          description: product.description,
          affiliate_link: product.affiliateLink,
          category: product.category,
          platform: product.platform,
          featured: product.featured,
          rating: product.rating,
          discount: product.discount,
          is_new: product.isNew,
          is_trending: product.isTrending,
          price_dropped: product.priceDropped,
          views: product.views,
          brand: product.brand,
          keywords: product.keywords,
          seo_description: product.seoDescription
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding product:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added successfully!');
    },
    onError: (error) => {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  });
};
