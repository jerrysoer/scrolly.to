import type { Metadata } from "next";
import { Instrument_Serif, Barlow_Condensed, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scrolly.to"),
  title: "scrolly.to — Interactive Visual Explainers",
  description:
    "AI-powered interactive visual explainers that break down complex topics into scroll-driven, animated single-page apps. Open source.",
  openGraph: {
    title: "scrolly.to — Interactive Visual Explainers",
    description:
      "AI-powered interactive visual explainers that break down complex topics into scroll-driven, animated single-page apps.",
    url: "https://scrolly.to",
    siteName: "scrolly.to",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "scrolly.to — Interactive Visual Explainers",
    description:
      "AI-powered interactive visual explainers that break down complex topics into scroll-driven, animated single-page apps.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "scrolly.to",
      url: "https://scrolly.to",
      description:
        "AI-powered interactive visual explainers that break down complex topics into scroll-driven, animated single-page apps.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      license: "https://opensource.org/licenses/MIT",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is scrolly.to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "scrolly.to is an open-source AI skill that generates interactive visual explainers — scroll-driven, animated single-page apps that break down complex topics.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use scrolly.to?",
          acceptedAnswer: {
            "@type": "Answer",
            text: 'Install the Claude skill and run /scrolly "Your topic here". The AI generates a complete, self-contained HTML explainer with animations and visualizations.',
          },
        },
        {
          "@type": "Question",
          name: "Is scrolly.to free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, scrolly.to is completely free and open source under the MIT license.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${barlowCondensed.variable} ${dmMono.variable}`}
      >
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        {/* Scrolly analytics — landing page views */}
        <img src="https://scrolly.to/pixel?s=hosted&e=904f5090-c37f-4c62-a645-5711cc54ffff&v=1" width={1} height={1} style={{position:'absolute',bottom:0,left:0,opacity:0,pointerEvents:'none'}} alt="" loading="lazy" decoding="async" />
      </body>
    </html>
  );
}
