
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface SocialShareProps {
  product: Product;
  onClose: () => void;
}

export const SocialShare = ({ product, onClose }: SocialShareProps) => {
  const shareUrl = window.location.href;
  const shareText = `Check out this amazing deal: ${product.name} for only $${product.price}!`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    onClose();
  };

  return (
    <Card className="w-48 shadow-lg border border-gray-200 dark:border-gray-600">
      <CardContent className="p-3">
        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Share this deal</h4>
        <div className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('whatsapp')}
            className="w-full justify-start bg-green-50 hover:bg-green-100 text-green-700"
          >
            📱 WhatsApp
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('facebook')}
            className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700"
          >
            📘 Facebook
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="w-full justify-start bg-sky-50 hover:bg-sky-100 text-sky-700"
          >
            🐦 Twitter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
