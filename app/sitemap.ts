import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://simamia.co.tz";

    return [
        // 1. Core Public Pages (High Priority)
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "daily", // Bumped up if you update the landing page frequently
            priority: 1.0,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/download`,
            lastModified: new Date(),
            changeFrequency: "weekly", // Important for users looking to get the app
            priority: 0.9,
        },

        // 2. New Public Educational Content (Great for Search Traffic)
        {
            url: `${baseUrl}/help-center`,
            lastModified: new Date(),
            changeFrequency: "weekly", // Assuming tutorials or videos are added/updated often
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },

        // 3. Legal Compliance Pages (Low Priority but required for SEO trust)
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}