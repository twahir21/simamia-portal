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

          {/* 1. Our System (Product & App) */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.ourSystem}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/download" className="hover:text-blue-600 transition-colors">
                  {t.footer.download}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-600 transition-colors">
                  {t.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={APK_LINK} className="hover:text-blue-600 transition-colors">
                  {t.footer.mobileApp}
                </Link>
              </li>
              <li>
                <Link href="/private" className="hover:text-blue-600 transition-colors">
                  {t.footer.account}
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.company}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors">
                  {t.footer.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  {t.footer.contactPage}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Support & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.support}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/help-center" className="hover:text-blue-600 transition-colors">
                  {t.footer.helpCenter}
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-blue-600 transition-colors">
                  {t.footer.faqs}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              {t.footer.contactUs}
            </h4>
            <div className="mt-4 text-sm text-gray-600 space-y-3">
              <div>
                {t.footer.callUs} <br />
                <a
                  href={PHONE_LINK}
                  className="font-bold hover:text-blue-600 transition-colors"
                >
                  {PHONE_SUPPORT}
                </a>
              </div>
              {/* Optional: You can add an email or physical address here if needed */}
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
