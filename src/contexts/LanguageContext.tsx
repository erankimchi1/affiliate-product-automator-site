
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  t: (key: string) => key,
  setLanguage: () => {}
});

const translations = {
  en: {
    header: {
      title: "AffiliateHub Pro",
      subtitle: "Best Deals from Amazon, eBay & AliExpress",
      darkMode: "Switch to Dark Mode",
      lightMode: "Switch to Light Mode",
      wishlist: "Wishlist",
      admin: "Admin Panel"
    },
    main: {
      featuredDeals: "Featured Deals",
      featuredSubtitle: "Discover the best deals handpicked just for you",
      latestProducts: "Latest Products",
      latestGuides: "Latest Guides",
      guidesSubtitle: "Explore our latest tips, tricks, and recommendations.",
      noProductsFound: "No products found in this category.",
      exclusiveDeals: "Exclusive Deals",
      exclusiveSubtitle: "Limited time offers available only to our members"
    },
    search: {
      placeholder: "Search for products...",
      noResults: "No products found matching your search."
    },
    product: {
      viewDetails: "View Details",
      addToWishlist: "Add to Wishlist",
      removeFromWishlist: "Remove from Wishlist",
      discount: "Discount",
      rating: "Rating",
      sources: "Available on:",
      goToProduct: "Go to Product",
      earlyAccess: "Early Access",
      exclusive: "Exclusive",
      urgentDeal: "Urgent Deal! Ends in",
      hours: "hours",
      minutes: "minutes",
      name: "Product Name",
      price: "Price",
      originalPrice: "Original Price", 
      imageUrl: "Image URL",
      description: "Description",
      affiliateLink: "Affiliate Link",
      category: "Category",
      platform: "Platform",
      featured: "Featured Product",
      markAsNew: "Mark as New",
      markAsTrending: "Mark as Trending",
      new: "NEW",
      trending: "TRENDING"
    },
    admin: {
      dashboard: "Admin Dashboard",
      products: "Products", 
      blogs: "Blogs",
      logout: "Logout",
      addProduct: "Add Product",
      addBlog: "Add Blog",
      editBlog: "Edit Blog",
      manualAddProduct: "Manual Add Product",
      automaticIntegration: "Automatic Product Integration",
      webhookEndpoint: "Webhook Endpoint",
      testWebhook: "Test Webhook (Add Sample Product)",
      expectedFormat: "Expected JSON Format",
      currentProducts: "Current Products",
      blogManagement: "Blog Management"
    },
    blog: {
      title: "Title",
      titlePlaceholder: "Enter blog title...",
      excerpt: "Excerpt", 
      excerptPlaceholder: "Enter blog excerpt...",
      imageUrl: "Image URL",
      imageUrlPlaceholder: "Enter image URL...",
      link: "Link",
      linkPlaceholder: "Enter blog link...",
      publishedAt: "Published at"
    },
    message: {
      fillRequiredFields: "Please fill in all required fields",
      blogSaved: "Blog post saved successfully",
      blogUpdated: "Blog post updated successfully", 
      blogAdded: "Blog post added successfully",
      blogDeleted: "Blog post deleted successfully",
      confirmDeleteBlog: "Are you sure you want to delete this blog post?"
    },
    category: {
      all: "All",
      electronics: "Electronics",
      tech: "Tech",
      home: "Home",
      fashion: "Fashion",
      tools: "Tools",
      gaming: "Gaming",
      general: "General",
      import: "Import",
      security: "Home Security",
      decor: "Home Decor"
    },
    common: {
      readMore: "Read More",
      cancel: "Cancel",
      save: "Save",
      hide: "Hide",
      show: "Show",
      details: "Details"
    },
    footer: {
      copyright: "© {year} AffiliateHub Pro. All rights reserved.",
      description: "Find the best deals from top e-commerce platforms",
      categories: "Categories",
      techElectronics: "Tech & Electronics",
      homeKitchen: "Home & Kitchen",
      fashionBeauty: "Fashion & Beauty",
      toolsHardware: "Tools & Hardware",
      features: "Features",
      priceComparison: "Price Comparison",
      exclusiveDeals: "Exclusive Deals",
      recommendations: "Smart Recommendations",
      mobileOptimized: "Mobile Optimized",
      legal: "Legal",
      affiliate: "We may earn a commission from qualifying purchases made through our affiliate links."
    }
  },
  he: {
    header: {
      title: "אפיליאציה האב פרו",
      subtitle: "המבצעים הטובים ביותר מאמזון, איביי ועליאקספרס",
      darkMode: "מעבר למצב חשוך",
      lightMode: "מעבר למצב בהיר",
      wishlist: "רשימת משאלות",
      admin: "פאנל ניהול"
    },
    main: {
      featuredDeals: "מבצעים מומלצים",
      featuredSubtitle: "גלו את המבצעים הטובים ביותר שנבחרו במיוחד עבורכם",
      latestProducts: "המוצרים האחרונים",
      latestGuides: "המדריכים האחרונים",
      guidesSubtitle: "גלו את הטיפים, הטריקים וההמלצות האחרונות שלנו.",
      noProductsFound: "לא נמצאו מוצרים בקטגוריה זו.",
      exclusiveDeals: "מבצעים בלעדיים",
      exclusiveSubtitle: "הצעות מוגבלות בזמן זמינות רק לחברים שלנו"
    },
    search: {
      placeholder: "חפש מוצרים...",
      noResults: "לא נמצאו מוצרים התואמים לחיפוש שלך."
    },
    product: {
      viewDetails: "ראה פרטים",
      addToWishlist: "הוסף לרשימת המשאלות",
      removeFromWishlist: "הסר מרשימת המשאלות",
      discount: "הנחה",
      rating: "דירוג",
      sources: "זמין ב:",
      goToProduct: "עבור למוצר",
      earlyAccess: "גישה מוקדמת",
      exclusive: "בלעדי",
      urgentDeal: "מבצע דחוף! מסתיים בעוד",
      hours: "שעות",
      minutes: "דקות",
      name: "שם המוצר",
      price: "מחיר",
      originalPrice: "מחיר מקורי",
      imageUrl: "קישור לתמונה", 
      description: "תיאור",
      affiliateLink: "קישור שותפות",
      category: "קטגוריה",
      platform: "פלטפורמה",
      featured: "מוצר מומלץ",
      markAsNew: "סמן כחדש",
      markAsTrending: "סמן כטרנדי",
      new: "חדש",
      trending: "טרנדי"
    },
    admin: {
      dashboard: "לוח בקרה למנהל",
      products: "מוצרים",
      blogs: "בלוגים", 
      logout: "התנתק",
      addProduct: "הוסף מוצר",
      addBlog: "הוסף פוסט בבלוג",
      editBlog: "ערוך פוסט בבלוג",
      manualAddProduct: "הוספת מוצר ידנית",
      automaticIntegration: "אינטגרציה אוטומטית של מוצרים",
      webhookEndpoint: "נקודת קצה לוובהוק",
      testWebhook: "בדוק וובהוק (הוסף מוצר לדוגמה)",
      expectedFormat: "פורמט JSON צפוי",
      currentProducts: "מוצרים נוכחיים",
      blogManagement: "ניהול בלוג"
    },
    blog: {
      title: "כותרת",
      titlePlaceholder: "הכנס כותרת לפוסט...",
      excerpt: "תקציר",
      excerptPlaceholder: "הכנס תקציר לפוסט...", 
      imageUrl: "קישור לתמונה",
      imageUrlPlaceholder: "הכנס קישור לתמונה...",
      link: "קישור",
      linkPlaceholder: "הכנס קישור לפוסט...",
      publishedAt: "פורסם ב"
    },
    message: {
      fillRequiredFields: "אנא מלא את כל השדות הנדרשים",
      blogSaved: "פוסט הבלוג נשמר בהצלחה",
      blogUpdated: "פוסט הבלוג עודכן בהצלחה",
      blogAdded: "פוסט הבלוג נוסף בהצלחה", 
      blogDeleted: "פוסט הבלוג נמחק בהצלחה",
      confirmDeleteBlog: "האם אתה בטוח שברצונך למחוק את פוסט הבלוג הזה?"
    },
    category: {
      all: "הכל",
      electronics: "אלקטרוניקה",
      tech: "טכנולוגיה",
      home: "בית",
      fashion: "אופנה",
      tools: "כלים",
      gaming: "גיימינג",
      general: "כללי",
      import: "יבוא",
      security: "אבטחת בית",
      decor: "עיצוב הבית"
    },
    common: {
      readMore: "קרא עוד",
      cancel: "בטל",
      save: "שמור",
      hide: "הסתר",
      show: "הצג",
      details: "פרטים"
    },
    footer: {
      copyright: "© {year} אפיליאציה האב פרו. כל הזכויות שמורות.",
      description: "מצא את המבצעים הטובים ביותר מפלטפורמות הקנייה המובילות",
      categories: "קטגוריות",
      techElectronics: "טכנולוגיה ואלקטרוניקה",
      homeKitchen: "בית ומטבח",
      fashionBeauty: "אופנה ויופי",
      toolsHardware: "כלים וחומרה",
      features: "תכונות",
      priceComparison: "השוואת מחירים",
      exclusiveDeals: "מבצעים בלעדיים",
      recommendations: "המלצות חכמות",
      mobileOptimized: "מותאם לנייד",
      legal: "משפטי",
      affiliate: "אנחנו עשויים לקבל עמלה מרכישות מתאימות שנעשות דרך קישורי השותפות שלנו."
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string) => {
    const keys = key.split('.');
    const lang = language as keyof typeof translations;
    let value: any = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
