import Head from 'next/head';
import { Download, Smartphone } from 'lucide-react';
import { APK_LINK } from '@/const/links.const';
import Image from 'next/image';

export default function DownloadPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-sky-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      <Head>
        <title>Download Simamia App | Manage Your Business</title>
        <meta name="description" content="Download the latest version of Simamia APK to manage your business efficiently." />
      </Head>

      {/* BACKGROUND IMAGE LAYER WITH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
            src="/apk-bg.jpg" 
            alt="Background"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>
      
      {/* Content Layer - Set to relative and z-10 to stay above the image */}
      <main className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-sky-100 shadow-sm">
            <Smartphone size={18} className="text-sky-600" />
            <span className="text-sky-700 font-medium text-sm">Play Store Coming Soon</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
            Simamia <span className="text-sky-600 italic">App</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            The ultimate companion for managing your business operations. 
            Get the professional tools you need, right in your pocket.
          </p>
        </section>

        {/* Primary Download Button */}
        <section className="w-full max-w-md px-4">
          <a
            href={APK_LINK}
            className="group relative flex items-center justify-center space-x-3 bg-sky-600 hover:bg-sky-700 text-white py-6 px-8 rounded-3xl shadow-2xl shadow-sky-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 w-full"
          >
            <Download className="group-hover:animate-bounce" size={28} />
            <div className="text-left">
              <span className="block text-xs uppercase tracking-[0.2em] font-bold opacity-70">v1.0.0</span>
              <span className="text-2xl font-black">Download APK</span>
            </div>
          </a>
          
          <div className="mt-6 flex flex-col items-center space-y-2">
            <p className="text-sm font-semibold text-slate-500">
              126MB • Android 8.0+
            </p>
            <p className="text-xs text-slate-400">
              Secure direct download from Google Drive
            </p>
          </div>
        </section>

        {/* Floating Instruction Tip */}
        <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl max-w-xs">
          <p className="text-xs text-sky-800 leading-tight">
            <strong>Tip:</strong> If prompted, allow &#34;Install from Unknown Sources&#34; in your browser settings to complete the setup.
          </p>
        </div>

      </main>
    </div>
  );
}