
import { Button } from "@/components/ui/button";
import { Settings, Heart, Sun, Moon } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  wishlist: string[];
  setShowWishlist: (value: boolean) => void;
  showWishlist: boolean;
  showAdminButton: boolean;
  onAdminClick: () => void;
}

export const Header = ({
  darkMode,
  setDarkMode,
  wishlist,
  setShowWishlist,
  showWishlist,
  showAdminButton,
  onAdminClick
}: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AffiliateHub Pro</h1>
            <p className="text-gray-600 dark:text-gray-300">Discover amazing deals from top retailers worldwide</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowWishlist(!showWishlist)}
              className="flex items-center gap-2"
            >
              <Heart size={16} />
              Wishlist ({wishlist.length})
            </Button>
            {showAdminButton && (
              <Button 
                variant="outline" 
                onClick={onAdminClick}
                className="flex items-center gap-2"
                title="Admin Panel (Ctrl+Shift+A to toggle visibility)"
              >
                <Settings size={16} />
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
