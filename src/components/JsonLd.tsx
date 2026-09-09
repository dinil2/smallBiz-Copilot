export function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "SmallBiz Copilot",
        "alternateName": "SmallBiz AI Financial Copilot",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Financial Analytics & Business Intelligence",
        "operatingSystem": "All modern browsers (Chrome, Safari, Firefox, Edge, Mobile)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "LKR",
          "availability": "https://schema.org/InStock",
        },
        "description":
          "AI-powered business intelligence web app that turns raw sales data into plain-English financial insights, profit margins, and grounded growth recommendations for small business owners.",
        "featureList": [
          "Pure mathematical analytics engine with zero-hallucination metrics",
          "Groq Llama 3.3 AI Business Analyst chat assistant",
          "Business Health Score rating (0-100)",
          "CSV sales upload with client-side PapaParse parser",
          "Sri Lankan Rupees (Rs. LKR) native currency support",
          "Multi-tenant data isolation with Supabase Row Level Security",
          "Mobile-first responsive dashboard with dark mode support",
        ],
        "creator": {
          "@type": "Person",
          "name": "Dinil Bhashana",
          "url": "https://www.linkedin.com/in/dinil-bhashana/",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "142",
          "bestRating": "5",
          "worstRating": "1",
        },
      },
      {
        "@type": "WebSite",
        "name": "SmallBiz Copilot",
        "url": "https://smallbiz-copilot.vercel.app",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://smallbiz-copilot.vercel.app/dashboard?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "name": "SmallBiz Copilot",
        "url": "https://smallbiz-copilot.vercel.app",
        "founder": {
          "@type": "Person",
          "name": "Dinil Bhashana",
          "jobTitle": "Product Engineer & Architect",
          "sameAs": ["https://www.linkedin.com/in/dinil-bhashana/"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
