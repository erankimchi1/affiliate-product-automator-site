
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
    'category.electronics': 'Electronics',
    'category.general': 'General',
    'category.import': 'Import',
    'category.security': 'Home Security',
    'category.decor': 'Home Decor',
    
    // Product actions
    'product.addToWishlist': 'Add to Wishlist',
    'product.removeFromWishlist': 'Remove from Wishlist',
    'product.buyNow': 'Buy Now',
    'product.viewDetails': 'View Details',
    'product.comparePrice': 'Compare Prices',
    'product.share': 'Share',
    'product.featured': 'Featured',
    'product.trending': 'Trending',
    'product.new': 'New',
    'product.exclusive': 'Exclusive',
    'product.earlyAccess': 'Early Access',
    'product.urgentDeal': 'Limited Time',
    'product.discount': 'OFF',
    'product.rating': 'Rating',
    'product.brand': 'Brand',
    
    // Search
    'search.placeholder': 'Search products...',
    'search.noResults': 'No products found matching your search.',
    'search.results': 'results',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.addProduct': 'Add New Product',
    'admin.scrapeProduct': 'Scrape Product',
    'admin.manageProducts': 'Manage Products',
    'admin.logout': 'Logout',
    'admin.close': 'Close Admin Panel',
    
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
    'scraping.analyzing': 'Analyzing page content...',
    'scraping.parsing': 'Parsing product details...',
    
    // Messages
    'message.productAdded': 'Product added successfully!',
    'message.productScraped': 'Product "{name}" scraped and added successfully!',
    'message.scrapingFailed': 'Scraping failed. Please check the URL and try again.',
    'message.enterUrl': 'Please enter an affiliate URL',
    'message.invalidUrl': 'Please enter a valid URL',
    'message.addedToWishlist': 'Added to wishlist',
    'message.removedFromWishlist': 'Removed from wishlist',
    
    // Main content
    'main.featuredDeals': 'Featured Deals',
    'main.featuredSubtitle': "Don't miss these amazing limited-time offers!",
    'main.exclusiveDeals': 'Exclusive & Early Access Deals',
    'main.exclusiveSubtitle': 'Limited-time exclusive offers just for you!',
    'main.allProducts': 'All Products',
    'main.latestGuides': 'Latest Deal Guides',
    'main.guidesSubtitle': 'Expert tips and curated lists to help you save more',
    
    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    'pagination.page': 'Page',
    
    // Price comparison
    'price.comparison': 'Price Comparison',
    'price.best': 'BEST',
    'price.viewOffer': 'View Offer',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.affiliate': 'Affiliate Disclosure: We may earn commissions from purchases made through our links.',
    'footer.categories': 'Categories',
    'footer.features': 'Features',
    'footer.legal': 'Legal',
    'footer.description': 'Find the best deals from Amazon, AliExpress, and eBay all in one place. Smart shopping made simple with exclusive offers and price comparisons.',
    'footer.priceComparison': 'Price Comparison',
    'footer.exclusiveDeals': 'Exclusive Deals',
    'footer.recommendations': 'Product Recommendations',
    'footer.mobileOptimized': 'Mobile Optimized',
    
    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDescription': 'Add some products to your wishlist to see them here',
    'wishlist.remove': 'Remove from wishlist',
    
    // Categories in footer
    'footer.techElectronics': 'Tech & Electronics',
    'footer.homeKitchen': 'Home & Kitchen',
    'footer.fashionBeauty': 'Fashion & Beauty',
    'footer.toolsHardware': 'Tools & Hardware',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.language': 'Language',
    'common.readMore': 'Read More',
    'common.showMore': 'Show More',
    'common.showLess': 'Show Less',
    'common.viewAll': 'View All'
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
    'category.electronics': 'אלקטרוניקה',
    'category.general': 'כללי',
    'category.import': 'יבוא',
    'category.security': 'אבטחה ביתית',
    'category.decor': 'עיצוב הבית',
    
    // Product actions
    'product.addToWishlist': 'הוסף לרשימת המשאלות',
    'product.removeFromWishlist': 'הסר מרשימת המשאלות',
    'product.buyNow': 'קנה עכשיו',
    'product.viewDetails': 'צפה בפרטים',
    'product.comparePrice': 'השווה מחירים',
    'product.share': 'שתף',
    'product.featured': 'מומלץ',
    'product.trending': 'פופולרי',
    'product.new': 'חדש',
    'product.exclusive': 'בלעדי',
    'product.earlyAccess': 'גישה מוקדמת',
    'product.urgentDeal': 'זמן מוגבל',
    'product.discount': 'הנחה',
    'product.rating': 'דירוג',
    'product.brand': 'מותג',
    
    // Search
    'search.placeholder': 'חפש מוצרים...',
    'search.noResults': 'לא נמצאו מוצרים התואמים לחיפוש שלך.',
    'search.results': 'תוצאות',
    
    // Admin
    'admin.title': 'פאנל ניהול',
    'admin.addProduct': 'הוסף מוצר חדש',
    'admin.scrapeProduct': 'גרוף מוצר',
    'admin.manageProducts': 'נהל מוצרים',
    'admin.logout': 'התנתק',
    'admin.close': 'סגור פאנל ניהול',
    
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
    'scraping.analyzing': 'מנתח תוכן הדף...',
    'scraping.parsing': 'מפרק פרטי המוצר...',
    
    // Messages
    'message.productAdded': 'המוצר נוסף בהצלחה!',
    'message.productScraped': 'המוצר "{name}" נגרף ונוסף בהצלחה!',
    'message.scrapingFailed': 'הגריפה נכשלה. אנא בדוק את הקישור ונסה שוב.',
    'message.enterUrl': 'אנא הזן קישור שותפות',
    'message.invalidUrl': 'אנא הזן קישור תקין',
    'message.addedToWishlist': 'נוסף לרשימת המשאלות',
    'message.removedFromWishlist': 'הוסר מרשימת המשאלות',
    
    // Main content
    'main.featuredDeals': 'מבצעים מומלצים',
    'main.featuredSubtitle': 'אל תפספסו את ההצעות המוגבלות המדהימות האלה!',
    'main.exclusiveDeals': 'מבצעים בלעדיים וגישה מוקדמת',
    'main.exclusiveSubtitle': 'הצעות בלעדיות לזמן מוגבל רק בשבילכם!',
    'main.allProducts': 'כל המוצרים',
    'main.latestGuides': 'מדריכי המבצעים החדשים',
    'main.guidesSubtitle': 'טיפים מומחה ורשימות נבחרות שיעזרו לכם לחסוך יותר',
    
    // Pagination
    'pagination.previous': 'הקודם',
    'pagination.next': 'הבא',
    'pagination.page': 'עמוד',
    
    // Price comparison
    'price.comparison': 'השוואת מחירים',
    'price.best': 'הטוב ביותר',
    'price.viewOffer': 'צפה בהצעה',
    
    // Footer
    'footer.rights': 'כל הזכויות שמורות',
    'footer.affiliate': 'גילוי שותפות: אנו עשויים לקבל עמלות מרכישות שנעשו דרך הקישורים שלנו.',
    'footer.categories': 'קטגוריות',
    'footer.features': 'תכונות',
    'footer.legal': 'משפטי',
    'footer.description': 'מצאו את המבצעים הטובים ביותר מאמזון, AliExpress ו-eBay במקום אחד. קניות חכמות בפשטות עם הצעות בלעדיות והשוואת מחירים.',
    'footer.priceComparison': 'השוואת מחירים',
    'footer.exclusiveDeals': 'מבצעים בלעדיים',
    'footer.recommendations': 'המלצות מוצרים',
    'footer.mobileOptimized': 'מותאם לנייד',
    
    // Wishlist
    'wishlist.title': 'רשימת המשאלות שלי',
    'wishlist.empty': 'רשימת המשאלות שלך ריקה',
    'wishlist.emptyDescription': 'הוסף כמה מוצרים לרשימת המשאלות שלך כדי לראות אותם כאן',
    'wishlist.remove': 'הסר מרשימת המשאלות',
    
    // Categories in footer
    'footer.techElectronics': 'טכנולוgiה ואלקטרוניקה',
    'footer.homeKitchen': 'בית ומטבח',
    'footer.fashionBeauty': 'אופנה ויופי',
    'footer.toolsHardware': 'כלים וחומרה',
    
    // Common
    'common.close': 'סגור',
    'common.save': 'שמור',
    'common.cancel': 'בטל',
    'common.loading': 'טוען...',
    'common.error': 'שגיאה',
    'common.success': 'הצלחה',
    'common.language': 'שפה',
    'common.readMore': 'קרא עוד',
    'common.showMore': 'הצג עוד',
    'common.showLess': 'הצג פחות',
    'common.viewAll': 'צפה בהכל'
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
