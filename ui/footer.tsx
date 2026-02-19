import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900">Simamia</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              The ultimate business management tool for tracking debts, profits, expenses, and sales with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Mobile App</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">API Docs</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Stay Connected</h4>
            <div className="mt-4 text-sm text-gray-600">
              Contact us at: <br />
              <a href="mailto:support@simamia.com" className="font-bold hover:text-blue-600 transition-colors">
                support@simamia.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          © {currentYear} Simamia App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};