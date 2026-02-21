import Script from "next/script";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { getExplainer, type Section } from "@/lib/explainers/registry";
import { ExplainerContextProvider } from "./ExplainerContextProvider";
import { ExplainerNav } from "./ExplainerNav";

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

interface ExplainerLayoutProps {
  slug: string;
  section: Section;
  children: React.ReactNode;
}

export function ExplainerLayout({
  slug,
  section,
  children,
}: ExplainerLayoutProps) {
  const config = getExplainer(slug);
  if (!config) return notFound();

  const sectionLabel = section === "learn" ? "Learn" : "Explore";
  const sectionUrl = `https://scrolly.to/${section}`;
  const canonical = `${sectionUrl}/${slug}`;

  // Font classes based on config
  const fontClasses = (() => {
    switch (config.fonts) {
      case "dispatch":
        return `${inter.variable} ${jetbrainsMono.variable}`;
      case "education":
        return `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`;
      default:
        return `${inter.variable}`;
    }
  })();

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: config.title,
        description: config.description,
        datePublished: config.datePublished,
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
        isPartOf: {
          "@type": "CollectionPage",
          url: sectionUrl,
        },
      },
      {
        "@type": "LearningResource",
        name: config.title,
        description: config.description,
        educationalLevel:
          section === "learn" ? "General audience" : "Professional",
        url: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://scrolly.to",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: sectionLabel,
            item: sectionUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: config.title,
          },
        ],
      },
      ...(config.faqs && config.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: config.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div
      data-scope={config.scopeName}
      className={`${fontClasses} min-h-screen`}
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
          __html: config.defaultTheme === "dark"
            ? `(function(){try{var t=localStorage.getItem('${config.themeKey}');if(t==='light')document.querySelector('[data-scope="${config.scopeName}"]')?.setAttribute('data-theme','light')}catch(e){}})()`
            : `(function(){try{var t=localStorage.getItem('${config.themeKey}');if(t==='dark')document.querySelector('[data-scope="${config.scopeName}"]')?.setAttribute('data-theme','dark')}catch(e){}})()`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExplainerContextProvider
        scopeName={config.scopeName}
        themeKey={config.themeKey}
        section={section}
      >
        <ExplainerNav section={section} />
        {children}
      </ExplainerContextProvider>
      {/* Scrolly engagement pixel */}
      <Script
        src="https://scrolly.to/t.js"
        data-explainer={slug}
        data-name={config.title}
        strategy="afterInteractive"
      />
    </div>
  );
}
