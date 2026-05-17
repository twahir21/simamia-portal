import { APK_LINK, PHONE_LINK, PHONE_SUPPORT } from '@/const/links.const';
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
              Mfumo bora zaidi wa usimamizi wa biashara kwa ajili ya kufuatilia
              madeni, faida, matumizi na mauzo kwa urahisi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Mfumo wetu
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href={`${APK_LINK}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  Programu ya Simu (App)
                </Link>
              </li>
              <li>
                <Link
                  href="/private"
                  className="hover:text-blue-600 transition-colors"
                >
                  Akaunti
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Msaada
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-blue-600 transition-colors"
                >
                  Kituo cha Msaada
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Sera ya Faragha
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Masharti ya Matumizi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Wasiliana Nasi
            </h4>
            <div className="mt-4 text-sm text-gray-600">
              Tupigie kupitia: <br />
              <a
                href={PHONE_LINK}
                className="font-bold hover:text-blue-600 transition-colors"
              >
                {PHONE_SUPPORT}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          © {currentYear} Simamia App. Haki zote zimehifadhiwa.
        </div>
      </div>
    </footer>
  );
};