
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
    return t(`category.${category.toLowerCase()}`) || category;
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
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
