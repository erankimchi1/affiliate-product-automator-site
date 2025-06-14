
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Header
    'header.title': 'AffiliateHub Pro',
    'header.subtitle': 'Best Deals from Top Retailers',
    'header.wishlist': 'Wishlist',
    'header.admin': 'Admin',
    'header.darkMode': 'Dark Mode',
    'header.lightMode': 'Light Mode',
    
    // Categories
    'category.all': 'All Products',
    'category.tech': 'Tech',
    'category.home': 'Home',
    'category.fashion': 'Fashion',
    'category.tools': 'Tools',
    'category.gaming': 'Gaming',
    
    // Product actions
    'product.addToWishlist': 'Add to Wishlist',
    'product.removeFromWishlist': 'Remove from Wishlist',
    'product.buyNow': 'Buy Now',
    'product.viewDetails': 'View Details',
    'product.comparePrice': 'Compare Prices',
    'product.share': 'Share',
    
    // Search
    'search.placeholder': 'Search products...',
    'search.noResults': 'No products found matching your search.',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.addProduct': 'Add New Product',
    'admin.scrapeProduct': 'Scrape Product',
    'admin.manageProducts': 'Manage Products',
    'admin.logout': 'Logout',
    
    // Quick Add
    'quickAdd.title': 'AI-Powered Product Scraper',
    'quickAdd.urlLabel': 'Affiliate URL',
    'quickAdd.urlPlaceholder': 'https://amazon.com/dp/B123456789?tag=youraffid',
    'quickAdd.description': 'Real-time scraping for Amazon, AliExpress, and eBay',
    'quickAdd.button': 'Scrape & Add Product',
    'quickAdd.scraping': 'Scraping Product...',
    
    // Scraping steps
    'scraping.initializing': 'Initializing scraper...',
    'scraping.fetching': 'Fetching product page...',
    'scraping.extracting': 'Extracting product data...',
    'scraping.processing': 'Processing product information...',
    'scraping.adding': 'Adding product...',
    
    // Messages
    'message.productAdded': 'Product added successfully!',
    'message.productScraped': 'Product scraped and added successfully!',
    'message.scrapingFailed': 'Real scraping failed, using fallback data. Try again later.',
    'message.enterUrl': 'Please enter an affiliate URL',
    'message.invalidUrl': 'Please enter a valid URL',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.affiliate': 'Affiliate Disclosure: We may earn commissions from purchases made through our links.',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.language': 'Language'
  },
  he: {
    // Header
    'header.title': 'AffiliateHub Pro',
    'header.subtitle': 'המבצעים הטובים ביותר מקמעונאים מובילים',
    'header.wishlist': 'רשימת המשאלות',
    'header.admin': 'ניהול',
    'header.darkMode': 'מצב כהה',
    'header.lightMode': 'מצב בהיר',
    
    // Categories
    'category.all': 'כל המוצרים',
    'category.tech': 'טכנולוגיה',
    'category.home': 'בית',
    'category.fashion': 'אופנה',
    'category.tools': 'כלים',
    'category.gaming': 'משחקים',
    
    // Product actions
    'product.addToWishlist': 'הוסף לרשימת המשאלות',
    'product.removeFromWishlist': 'הסר מרשימת המשאלות',
    'product.buyNow': 'קנה עכשיו',
    'product.viewDetails': 'צפה בפרטים',
    'product.comparePrice': 'השווה מחירים',
    'product.share': 'שתף',
    
    // Search
    'search.placeholder': 'חפש מוצרים...',
    'search.noResults': 'לא נמצאו מוצרים התואמים לחיפוש שלך.',
    
    // Admin
    'admin.title': 'פאנל ניהול',
    'admin.addProduct': 'הוסף מוצר חדש',
    'admin.scrapeProduct': 'גרוף מוצר',
    'admin.manageProducts': 'נהל מוצרים',
    'admin.logout': 'התנתק',
    
    // Quick Add
    'quickAdd.title': 'גורף מוצרים מבוסס בינה מלאכותית',
    'quickAdd.urlLabel': 'קישור שותפות',
    'quickAdd.urlPlaceholder': 'https://amazon.com/dp/B123456789?tag=youraffid',
    'quickAdd.description': 'גרוף בזמן אמת מאמזון, AliExpress ו-eBay',
    'quickAdd.button': 'גרוף והוסף מוצר',
    'quickAdd.scraping': 'גורף מוצר...',
    
    // Scraping steps
    'scraping.initializing': 'מאתחל גורף...',
    'scraping.fetching': 'טוען דף המוצר...',
    'scraping.extracting': 'מחלץ נתוני מוצר...',
    'scraping.processing': 'מעבד מידע על המוצר...',
    'scraping.adding': 'מוסיף מוצר...',
    
    // Messages
    'message.productAdded': 'המוצר נוסף בהצלחה!',
    'message.productScraped': 'המוצר נגרף ונוסף בהצלחה!',
    'message.scrapingFailed': 'הגריפה הכשלה, משתמש בנתוני גיבוי. נסה שוב מאוחר יותר.',
    'message.enterUrl': 'אנא הזן קישור שותפות',
    'message.invalidUrl': 'אנא הזן קישור תקין',
    
    // Footer
    'footer.rights': 'כל הזכויות שמורות',
    'footer.affiliate': 'גילוי שותפות: אנו עשויים לקבל עמלות מרכישות שנעשו דרך הקישורים שלנו.',
    
    // Common
    'common.close': 'סגור',
    'common.save': 'שמור',
    'common.cancel': 'בטל',
    'common.loading': 'טוען...',
    'common.error': 'שגיאה',
    'common.success': 'הצלחה',
    'common.language': 'שפה'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'he';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
