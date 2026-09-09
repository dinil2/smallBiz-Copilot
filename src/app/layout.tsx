import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smallbiz-copilot.vercel.app"),
  title: {
    default: "SmallBiz Copilot — AI Business Intelligence for Small Businesses",
    template: "%s | SmallBiz Copilot",
  },
  description:
    "Turn raw sales and spreadsheets into clear profit margins, inventory trends, and grounded AI recommendations. Built for small business owners, retail shops, cafes, and restaurants in Sri Lanka. 100% grounded in your actual numbers.",
  applicationName: "SmallBiz Copilot",
  authors: [{ name: "Dinil Bhashana", url: "https://www.linkedin.com/in/dinil-bhashana/" }],
  creator: "Dinil Bhashana",
  publisher: "SmallBiz Copilot",
  keywords: [
    "SmallBiz Copilot",
    "AI business intelligence",
    "small business financial software",
    "Sri Lanka retail accounting",
    "profit margin tracker",
    "cash flow analytics for SMEs",
    "restaurant profit calculator",
    "shop sales analytics",
    "retail inventory copilot",
    "Groq AI business analyst",
    "LKR currency business dashboard",
    "free business analytics tool",
    "Dinil Bhashana",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SmallBiz Copilot — Every Business Signal, One Calm Dashboard",
    description:
      "Plain-English financial insights, profit margins, and grounded AI recommendations for retail shops and cafes. Never guess your numbers again.",
    url: "https://smallbiz-copilot.vercel.app",
    siteName: "SmallBiz Copilot",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/scenic-canyon.jpg",
        width: 1200,
        height: 630,
        alt: "SmallBiz Copilot — AI Financial Intelligence Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmallBiz Copilot — AI Financial Copilot for Small Businesses",
    description:
      "Transform messy sales records into crystal-clear profit margins and grounded AI growth actions.",
    creator: "@dinilbhashana",
    images: ["/images/scenic-canyon.jpg"],
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const origError = console.error;
                  console.error = function(...args) {
                    const text = args.map(a => (typeof a === 'string' ? a : (a && a.message) ? a.message : '')).join(' ');
                    if (text.indexOf('bis_skin_checked') !== -1) {
                      return;
                    }
                    origError.apply(console, args);
                  };

                  if (typeof MutationObserver !== 'undefined') {
                    const observer = new MutationObserver(function(mutations) {
                      for (let i = 0; i < mutations.length; i++) {
                        const m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                          m.target.removeAttribute('bis_skin_checked');
                        }
                      }
                    });
                    observer.observe(document.documentElement, {
                      attributes: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col font-inter antialiased selection:bg-indigo-500/20 selection:text-indigo-600"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
