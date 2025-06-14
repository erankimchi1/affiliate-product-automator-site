
import { Product } from "@/types/Product";

export const generateSEODescription = (product: Product): string => {
  const templates = [
    `This ${product.category.toLowerCase()} product is perfect for ${getUseCase(product.category)}—${getFeatures(product)}.`,
    `Get this amazing ${product.name} with ${getFeatures(product)}. Perfect for ${getUseCase(product.category)}.`,
    `${product.name} offers ${getFeatures(product)}. Ideal for ${getUseCase(product.category)} at an unbeatable price.`,
    `Discover the ${product.name}—featuring ${getFeatures(product)}. Great for ${getUseCase(product.category)}.`
  ];

  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return randomTemplate;
};

const getUseCase = (category: string): string => {
  const useCases = {
    'Tech': 'work, gaming, and entertainment',
    'Home': 'everyday living and home improvement',
    'Fashion': 'style and comfort',
    'Tools': 'DIY projects and professional work',
    'default': 'everyday use'
  };
  
  return useCases[category as keyof typeof useCases] || useCases.default;
};

const getFeatures = (product: Product): string => {
  const features = [];
  
  if (product.rating && product.rating > 4) {
    features.push('excellent reviews');
  }
  
  if (product.discount && product.discount > 30) {
    features.push('amazing savings');
  }
  
  if (product.isNew) {
    features.push('latest technology');
  }
  
  if (product.platform === 'amazon') {
    features.push('fast shipping');
  }
  
  if (features.length === 0) {
    features.push('great quality', 'reliable performance');
  }
  
  return features.slice(0, 3).join(', ');
};

export const generateProductKeywords = (product: Product): string[] => {
  const keywords = [];
  
  // Category keywords
  keywords.push(product.category.toLowerCase());
  
  // Brand keywords
  if (product.brand) {
    keywords.push(product.brand.toLowerCase());
  }
  
  // Extract keywords from name
  const nameKeywords = product.name
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 5);
  
  keywords.push(...nameKeywords);
  
  // Platform keywords
  keywords.push(product.platform);
  
  return [...new Set(keywords)];
};
