import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const companies = [
  "Creatio",
  "HubSpot",
  "zendesk",
  "Bitrix24",
  "Apptivo",
  "freshbooks",
  "pipedrive",
];

export function CashFlowSection() {
  return (
    <section
      id="cashflow"
      className="relative isolate min-h-[740px] sm:min-h-[860px] py-24 sm:py-32 flex items-center justify-center overflow-hidden transition-colors"
      suppressHydrationWarning
    >
      {/* Pristine Scenic Canyon Landscape Background Image using Next.js Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/images/scenic-canyon.jpg"
          alt="Scenic Canyon Cash Flow Landscape"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Soft top gradient so the sky blends smoothly from previous section, while canyon cliffs stay vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/30 dark:from-[#0B0F17]/80 dark:via-transparent dark:to-[#0B0F17]/60 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Pill Badge (matching reference image) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-gray-900/90 border border-gray-200/90 dark:border-gray-700 shadow-sm mb-8 text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-xs">
          <span className="font-semibold text-gray-900 dark:text-white">New Features:</span>
          <span>Automate invoicing, track expenses & margins</span>
        </div>

        {/* Large Headline (matching reference image typography) */}
        <h2 className="font-sora text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-950 dark:text-white leading-[1.15] max-w-4xl mx-auto drop-shadow-xs">
          Gain complete visibility into your cash flow
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 text-base sm:text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed font-normal">
          Our accounting platform provides a centralized system for managing invoices, payments, and expenses efficiently. Generate professional invoices in minutes, accept online payments, and automate recurring billing.
        </p>

        {/* Action Buttons (matching reference image: solid black pill + outline pill) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Product</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-gray-900 dark:text-white bg-white/95 dark:bg-gray-900/90 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
          >
            <span>Book a demo</span>
          </Link>
        </div>

        {/* Partner / Trust Logos Carousel (Infinite moving with pause-on-hover & hover-zoom) */}
        <div className="mt-16 sm:mt-24 pt-8">
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Trusted by leaders in
          </p>

          {/* Constrained strictly within the valley between the canyon cliff lines with edge fade mask */}
          <div
            className="marquee-container relative max-w-2xl sm:max-w-3xl mx-auto overflow-hidden py-4 select-none"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <div className="animate-marquee-slow flex items-center gap-12 sm:gap-16">
              {/* First Set */}
              {companies.map((company, index) => (
                <span
                  key={`company-1-${index}`}
                  className="font-sora text-base sm:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 hover:text-black dark:hover:text-white transition-all duration-200 transform-gpu hover:scale-125 px-2 shrink-0 cursor-pointer"
                >
                  {company}
                </span>
              ))}
              {/* Duplicate Set for Seamless Infinite Scroll */}
              {companies.map((company, index) => (
                <span
                  key={`company-2-${index}`}
                  className="font-sora text-base sm:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 opacity-80 hover:opacity-100 hover:text-black dark:hover:text-white transition-all duration-200 transform-gpu hover:scale-125 px-2 shrink-0 cursor-pointer"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
