"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Point of Sale",
    description: "Scan, search, and save. The ultimate command center for rapid-fire retail.",
    image: "/sale.png",
    tags: ["Scan", "Quick Sales", "Save Cart"]
  },
  {
    title: "Command Center",
    description: "Your entire business at a glance. Manage customers, suppliers, and history.",
    image: "/pages.png",
    tags: ["Reports", "CRM", "History"]
  },
  {
    title: "Order Fulfillment",
    description: "Track pending sales and manage deliveries with real-time status updates.",
    image: "/orders.png",
    tags: ["Delivery", "Processing", "Queued"]
  },
  {
    title: "Inventory Intelligence",
    description: "Real-time stock summaries with automated 'Low Stock' intelligence.",
    image: "/stocks.png",
    tags: ["Low Stock", "Margins", "Automated"]
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (features.length - 1),
          end: () => `+=${triggerRef.current?.offsetWidth}`,
        },
      }
    );
    return () => pin.kill();
  }, { scope: triggerRef });

  return (
    // Background updated to Sky/Twilight tones
    <div className="bg-linear-to-b from-sky-400 via-indigo-500 to-slate-900 overflow-x-hidden">
      <div ref={triggerRef} className="relative">
        
        <div ref={sectionRef} className="flex flex-row w-[400vw] h-screen items-center">
          
          {features.map((feature, index) => (
            <section 
              key={index} 
              className="w-screen h-full flex items-center justify-center px-4 md:px-20"
            >
              {/* Card Container: wider to accommodate text on the left */}
              <div className="glass-card relative w-full max-w-5xl h-[80vh] rounded-[3rem] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center">
                
                {/* Text Content: Now on the LEFT */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feature.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sky-100 text-lg md:text-xl leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </div>

                {/* Mobile Screenshot: Now on the RIGHT & fitting to bottom */}
                <div className="w-full md:w-3/5 h-[50vh] md:h-full relative order-1 md:order-2 flex justify-center items-end pt-10">
                   <div className="relative w-70 md:w-[320px] h-full overflow-hidden rounded-t-4xl border-x-[6px] border-t-[6px] border-slate-900/40 shadow-2xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority={index === 0}
                    />
                  </div>
                </div>

              </div>
            </section>
          ))}
          
        </div>
      </div>
    </div>
  );
}