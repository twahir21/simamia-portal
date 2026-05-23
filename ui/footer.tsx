"use client";

import { APK_LINK, PHONE_LINK, PHONE_SUPPORT } from "@/const/links.const";
import { useTranslation } from "@/provider/translation";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900">Simamia App</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.ourSystem}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href={`${APK_LINK}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.footer.mobileApp}
                </Link>
              </li>
              <li>
                <Link
                  href="/private"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.footer.account}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.support}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.footer.helpCenter}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.footer.termsOfService}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.contactUs}
            </h4>
            <div className="mt-4 text-sm text-gray-600">
              {t.footer.callUs} <br />
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
          © {currentYear} Simamia App. {t.footer.rightsReserved}
        </div>
      </div>
    </footer>
  );
};
