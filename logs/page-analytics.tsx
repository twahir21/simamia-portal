"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface VisitorData {
  visitorId: string;
  visits: number;
  lastSeen: number;
  pages: string[];
}

export default function CustomPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Safely execute only on the client side
    if (typeof window === "undefined") return;

    // skip home page for bots 
    if (pathname === "/") return;

    // 1. Get or Create Visitor ID
    let visitorId = localStorage.getItem("custom_visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("custom_visitor_id", visitorId);
    }

    // 2. Fetch existing data or setup defaults
    const storedData = localStorage.getItem("custom_analytics_data");
    let data: VisitorData = storedData
      ? JSON.parse(storedData)
      : { visitorId, visits: 0, lastSeen: Date.now(), pages: [] };

    // 3. Track Sessions (30-minute inactivity threshold)
    const thirtyMinutes = 30 * 60 * 1000;
    if (Date.now() - data.lastSeen > thirtyMinutes || data.visits === 0) {
      data.visits += 1;
    }

    // 4. Update last seen timestamp
    data.lastSeen = Date.now();

    // 5. Track unique clean pages (with a cap of last 20 pages)
    if (!data.pages.includes(pathname)) {
      data.pages.push(pathname);

      // Keep the history manageable (Optional cap)
      if (data.pages.length > 20) {
        data.pages.shift(); // Removes the oldest page
      }
    }

    // 6. Save data silently back to localStorage
    localStorage.setItem("custom_analytics_data", JSON.stringify(data));

    // NOTE: This is exactly where you would trigger a database save:
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }, [pathname]);

  // Returns absolutely nothing to the DOM, keeping your frontend invisible and lightweight!
  return null;
}
