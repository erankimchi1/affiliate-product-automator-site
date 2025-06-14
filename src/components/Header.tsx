
import { Button } from "@/components/ui/button";
import { Settings, Heart, Sun, Moon } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  wishlist: string[];
  onWishlistClick: () => void;
  showAdminButton: boolean;
  onAdminClick: () => void;
  showLanguageSwitcher?: boolean;
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Header = ({
  darkMode,
  setDarkMode,
  wishlist,
  onWishlistClick,
  showAdminButton,
  onAdminClick,
  showLanguageSwitcher = true,
  isLoggedIn = false,
  onLogin,
  onLogout,
  searchTerm,
  onSearchChange
}: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('header.title')}</h1>
            <p className="text-gray-600 dark:text-gray-300">{t('header.subtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            {showLanguageSwitcher && <LanguageSwitcher />}
            <Button 
              variant="outline" 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2"
              title={darkMode ? t('header.lightMode') : t('header.darkMode')}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button 
              variant="outline" 
              onClick={onWishlistClick}
              className="flex items-center gap-2"
            >
              <Heart size={16} />
              {t('header.wishlist')} ({wishlist.length})
            </Button>
            {showAdminButton && (
              <Button 
                variant="outline" 
                onClick={onAdminClick}
                className="flex items-center gap-2"
                title="Admin Panel (Ctrl+Shift+A to toggle visibility)"
              >
                <Settings size={16} />
                {t('header.admin')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
