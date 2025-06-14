
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
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    onClose();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      console.log('Link copied to clipboard');
      onClose();
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <Card className="w-52 shadow-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 z-[100]">
      <CardContent className="p-3">
        <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">Share this deal</h4>
        <div className="space-y-2 max-h-80 overflow-y-auto">
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('telegram')}
            className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-600"
          >
            ✈️ Telegram
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('linkedin')}
            className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-800"
          >
            💼 LinkedIn
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('reddit')}
            className="w-full justify-start bg-orange-50 hover:bg-orange-100 text-orange-600"
          >
            🔗 Reddit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="w-full justify-start bg-gray-50 hover:bg-gray-100 text-gray-700"
          >
            📋 Copy Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
