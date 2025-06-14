
export const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AffiliateHub Pro</h3>
            <p className="text-gray-400">Find the best deals from Amazon, AliExpress, and eBay all in one place. Smart shopping made simple with exclusive offers and price comparisons.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Tech & Electronics</li>
              <li>Home & Kitchen</li>
              <li>Fashion & Beauty</li>
              <li>Tools & Hardware</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Price Comparison</li>
              <li>Exclusive Deals</li>
              <li>Product Recommendations</li>
              <li>Mobile Optimized</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <p className="text-gray-400 text-sm">
              This site contains affiliate links. We may earn a commission when you purchase through our links at no additional cost to you.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
