'use client'; // Required if you plan to add state (like a mobile menu toggle)

import Image from 'next/image';
import Link from 'next/link';
import logoImg from "@/public/favicon.png"; // Standard Next.js import

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          {/* Use Next.js Image component for optimization */}
          <div className="h-8 w-8 overflow-hidden">
            <Image 
              src={logoImg} 
              alt="Simamia Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>
          <Link href='/' className="text-xl font-bold tracking-tight text-gray-900">
            Simamia <span className="text-sky-600">Portal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/private" className="transition-colors hover:text-sky-600">Dashboard</Link>
          <Link href="#" className="transition-colors hover:text-sky-600">Debts</Link>
          <Link href="#" className="transition-colors hover:text-sky-600">Expenses</Link>
          <Link href="#" className="transition-colors hover:text-sky-600">Sales</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-sky-500 to-indigo-600 border border-white shadow-sm cursor-pointer"></div>
        </div>
      </div>
    </header>
  );
};