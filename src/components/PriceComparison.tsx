
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ProductSource } from "@/types/Product";

interface PriceComparisonProps {
  sources: ProductSource[];
}

export const PriceComparison = ({ sources }: PriceComparisonProps) => {
  const sortedSources = [...sources].sort((a, b) => a.price - b.price);
  const bestPrice = sortedSources[0].price;

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'amazon': return 'bg-orange-500';
      case 'aliexpress': return 'bg-red-500';
      case 'ebay': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="mt-2 border border-gray-200 dark:border-gray-600">
      <CardContent className="p-3">
        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Price Comparison</h4>
        <div className="space-y-2">
          {sortedSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex items-center gap-2">
                <Badge className={`${getPlatformColor(source.platform)} text-white text-xs`}>
                  {source.platform.toUpperCase()}
                </Badge>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${source.price}
                </span>
                {source.price === bestPrice && (
                  <Badge className="bg-green-500 text-white text-xs">
                    BEST
                  </Badge>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(source.link, '_blank')}
                className="h-6 px-2 text-xs"
              >
                <ExternalLink size={12} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
