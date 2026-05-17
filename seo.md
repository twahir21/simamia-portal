Your metadata is good, but **metadata alone does NOT make Google index your site**.

Right now the problem is likely one of these:

1. Google has never discovered your site
2. Your site blocks crawling accidentally
3. No sitemap submitted
4. Domain is too new
5. No backlinks/mentions yet
6. Rendering issue with Next.js
7. Pages have weak index signals

You need both:

* **Technical SEO**
* **Google discovery/indexing setup**

---

# 1. First Check — Is Google Blocking Your Site?

Open these URLs:

* `https://simamia.co.tz/robots.txt`
* `https://simamia.co.tz/sitemap.xml`

They MUST exist.

---

# 2. Add Proper `robots.ts` in Next.js

Inside `app/robots.ts`

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://simamia.co.tz/sitemap.xml",
  };
}
```

This generates:

```txt
User-agent: *
Allow: /

Sitemap: https://simamia.co.tz/sitemap.xml
```

---

# 3. Add Dynamic Sitemap

Inside `app/sitemap.ts`

```ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://simamia.co.tz",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: "https://simamia.co.tz/features",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: "https://simamia.co.tz/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: "https://simamia.co.tz/download",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
```

---

# 4. VERY IMPORTANT — Add Canonical URL

In your metadata:

```ts
alternates: {
  canonical: "https://simamia.co.tz",
},
```

Without canonical tags, Google sometimes delays indexing.

---

# 5. Add Verification for Google Search Console

Go to Google Search Console:

* [https://search.google.com/search-console](https://search.google.com/search-console)

Add property:

```txt
https://simamia.co.tz
```

Then verify using DNS TXT record.

After verification:

### Submit:

```txt
https://simamia.co.tz/sitemap.xml
```

THIS is the biggest thing you're missing.

Without Search Console, Google may take weeks/months.

With sitemap submission:

* sometimes indexed within hours
* usually few days

---

# 6. Force Indexing Request

After Search Console verification:

* URL Inspection
* Enter:

```txt
https://simamia.co.tz
```

Then:

```txt
Request Indexing
```

Do this for:

* homepage
* pricing page
* features page
* download page

---

# 7. Your Homepage Needs Strong SEO Text

Google ranks/indexes TEXT.

If your homepage is mostly animations/cards/buttons only:
Google struggles.

Add real text like:

```html
<h1>
Simamia — Offline Business Management App for Shops and SMEs
</h1>

<h2>
Track sales, stock, debts and expenses easily
</h2>
```

Then several paragraphs describing:

* what Simamia does
* who it's for
* Tanzania/Africa keywords
* offline POS
* inventory
* small business management

---

# 8. Add Structured Data (VERY IMPORTANT)

Inside homepage:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Simamia",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Offline-first business management app for sales, expenses, debts, and stock tracking.",
      url: "https://simamia.co.tz",
    }),
  }}
/>
```

This helps Google understand:

* your app
* your brand
* your business type

---

# 9. Make Sure Pages Are Server Rendered

If homepage is fully client-side:

```tsx
"use client"
```

and content loads later via JS,
Google indexing weakens.

For SEO pages:

* use Server Components
* render text directly in HTML

---

# 10. Add These Pages

Google trusts sites more when they have:

* `/about`
* `/contact`
* `/privacy-policy`
* `/terms`
* `/features`

Especially privacy + terms.

---

# 11. Add Social Presence (Huge for Brand Discovery)

Create:

* Facebook page
* LinkedIn page
* X profile
* Instagram page

Use SAME brand name:

```txt
Simamia
```

Then link your website.

Google uses these to understand your brand exists.

---

# 12. Add Backlinks

Right now Google probably sees:

* zero mentions
* zero backlinks
* zero authority

Even 5 backlinks help massively.

Examples:

* Product Hunt
* Reddit posts
* Dev.to article
* Medium article
* LinkedIn post
* Tanzanian startup directories

---

# 13. Register Business Location

You said:

> "if someone typed simamia to get all my sites and location"

Then create:

* Google Business Profile

Add:

* business name
* website
* phone
* location
* logo

Then Google can show:

* maps
* location
* brand panel

---

# 14. Add Favicon Properly

Google sometimes uses favicon for recognition.

Make sure these exist:

```txt
/favicon.ico
/favicon-32x32.png
/apple-touch-icon.png
```

---

# 15. Check If Your Site Accidentally Has `noindex`

Search your page source for:

```html
noindex
```

If found anywhere:
REMOVE IT.

Also ensure:

```ts
robots: {
  index: true,
  follow: true,
},
```

inside metadata.

---

# 16. Add This to Metadata

Your metadata is missing a few strong fields:

```ts
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
},
```

---

# 17. Important Reality About New Domains

Even perfect SEO does NOT instantly rank.

Google first:

* discovers
* crawls
* indexes
* trusts
* ranks

For a fresh domain:

* indexing: few days
* ranking brand name: days/weeks
* ranking keywords: weeks/months

BUT:
If you submit Search Console + sitemap,
typing:

```txt
simamia
```

should eventually show:

* simamia.co.tz
* socials
* app pages

---

# 18. Most Important Checklist

Do these TODAY in order:

### Critical

* [ ] robots.txt
* [ ] sitemap.xml
* [ ] Google Search Console
* [ ] submit sitemap
* [ ] request indexing
* [ ] canonical URL
* [ ] structured data

### Important

* [ ] about page
* [ ] privacy page
* [ ] terms page
* [ ] social accounts
* [ ] backlinks

### Extra

* [ ] Google Business Profile
* [ ] blog/articles
* [ ] feature pages

---

# 19. Final Thing — Check Current Index Status

Search on Google:

```txt
site:simamia.co.tz
```

If nothing appears:
Google has not indexed yet.

If pages appear:
indexing works but brand ranking is still building.

---

Your metadata is already better than many startups. The missing part is mostly:

* discovery
* sitemap submission
* Search Console
* backlinks
* structured data
* time.
