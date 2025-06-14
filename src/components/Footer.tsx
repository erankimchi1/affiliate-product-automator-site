
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('header.title')}</h3>
            <p className="text-gray-400">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footer.techElectronics')}</li>
              <li>{t('footer.homeKitchen')}</li>
              <li>{t('footer.fashionBeauty')}</li>
              <li>{t('footer.toolsHardware')}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.features')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footer.priceComparison')}</li>
              <li>{t('footer.exclusiveDeals')}</li>
              <li>{t('footer.recommendations')}</li>
              <li>{t('footer.mobileOptimized')}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <p className="text-gray-400 text-sm">
              {t('footer.affiliate')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
