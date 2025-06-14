
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { t } = useLanguage();

  const getCategoryLabel = (category: string) => {
    if (category === "all") return t('category.all');
    
    // Map category names to translation keys
    const categoryMap: { [key: string]: string } = {
      'electronics': 'category.electronics',
      'tech': 'category.tech',
      'home': 'category.home',
      'fashion': 'category.fashion',
      'tools': 'category.tools',
      'gaming': 'category.gaming',
      'general': 'category.general',
      'import': 'category.import',
      'home security': 'category.security',
      'home decor': 'category.decor',
      'security': 'category.security',
      'decor': 'category.decor'
    };

    const translationKey = categoryMap[category.toLowerCase()];
    return translationKey ? t(translationKey) : category;
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`cursor-pointer px-4 py-2 transition-all duration-200 ${
            selectedCategory === category 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'hover:bg-gray-100'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {getCategoryLabel(category)}
        </Badge>
      ))}
    </div>
  );
};
