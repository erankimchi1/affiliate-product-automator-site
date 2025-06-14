
export interface ProductSource {
  platform: 'amazon' | 'aliexpress' | 'ebay';
  price: number;
  link: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  affiliateLink: string;
  category: string;
  platform: 'amazon' | 'aliexpress' | 'ebay';
  featured?: boolean;
  rating?: number;
  discount?: number;
  isNew?: boolean;
  isTrending?: boolean;
  priceDropped?: boolean;
  sources?: ProductSource[];
  createdAt?: string;
  views?: number;
  brand?: string;
  isExclusive?: boolean;
  isEarlyAccess?: boolean;
  hasUrgentDeal?: boolean;
  urgentDealExpiry?: string;
  keywords?: string[];
  seoDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  publishedAt: string;
}
