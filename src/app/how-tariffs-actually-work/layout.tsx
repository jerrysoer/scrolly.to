import Script from "next/script";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { faqs } from "@/lib/explainers/tariffs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "How Tariffs Actually Work — Interactive Explainer",
  description:
    "An interactive explainer on tariffs, who pays them, and what the Supreme Court's 6-3 ruling means for trade. Built with Scrolly.",
  keywords: [
    "tariffs",
    "trade",
    "SCOTUS",
    "IEEPA",
    "Supreme Court tariffs",
    "who pays tariffs",
    "tariff explainer",
    "interactive explainer",
    "Liberation Day tariffs",
  ],
  openGraph: {
    title: "How Tariffs Actually Work",
    description:
      "Most people think foreign countries pay tariffs. They don't. Here's how tariffs actually work — and what the Supreme Court just changed.",
    type: "article",
    locale: "en_US",
    siteName: "Scrolly",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Tariffs Actually Work",
    description:
      "Most people think foreign countries pay tariffs. They don't. Here's how tariffs actually work.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "How Tariffs Actually Work",
      description:
        "An interactive explainer on tariffs, who pays them, and what the Supreme Court's 6-3 ruling means for trade.",
      datePublished: "2026-02-20",
      author: {
        "@type": "Organization",
        name: "Scrolly",
        url: "https://scrolly.to",
      },
      publisher: {
        "@type": "Organization",
        name: "Scrolly",
        url: "https://scrolly.to",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function TariffsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-scope="explainer-tariffs"
      className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen`}
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "16px",
        lineHeight: "1.7",
      }}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('tariffs-theme');if(t==='light')document.querySelector('[data-scope="explainer-tariffs"]')?.setAttribute('data-theme','light')}catch(e){}})()`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      {/* Scrolly engagement pixel */}
      <Script
        src="https://scrolly.to/t.js"
        data-explainer="how-tariffs-actually-work"
        data-name="How Tariffs Actually Work"
        strategy="afterInteractive"
      />
    </div>
  );
}
