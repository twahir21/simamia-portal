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
    // Skip home page tracking entirely
    if (pathname === "/") return;

    // 1. Get or create visitor ID
    let visitorId = localStorage.getItem("custom_visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("custom_visitor_id", visitorId);
    }

    // 2. Fetch existing data or set defaults
    const storedData = localStorage.getItem("custom_analytics_data");
    const data: VisitorData = storedData
      ? JSON.parse(storedData)
      : { visitorId, visits: 0, lastSeen: Date.now(), pages: [] };

    // 3. Count a new session after 30 min of inactivity
    const thirtyMinutes = 30 * 60 * 1000;
    if (Date.now() - data.lastSeen > thirtyMinutes || data.visits === 0) {
      data.visits += 1;
    }

    // 4. Update last seen
    data.lastSeen = Date.now();

    // 5. Track unique pages (capped at last 20)
    if (!data.pages.includes(pathname)) {
      data.pages.push(pathname);
      if (data.pages.length > 20) data.pages.shift();
    }

    // 6. Persist locally
    localStorage.setItem("custom_analytics_data", JSON.stringify(data));

    // 7. Sync to server
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => console.warn("[Analytics] Failed to sync:", err));
  }, [pathname]);

  return null;
}