import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SuggestionBox from "@/components/SuggestionBox";
import { getBySection } from "@/lib/explainers/registry";

export const metadata: Metadata = {
  title: "Explore — scrolly.to",
  description:
    "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
  alternates: {
    canonical: "https://scrolly.to/explore",
  },
  openGraph: {
    title: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    url: "https://scrolly.to/explore",
    images: [
      {
        url: "https://scrolly.to/og-explore.png",
        width: 1200,
        height: 630,
        alt: "scrolly.to Explore — Interactive Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    images: ["https://scrolly.to/og-explore.png"],
  },
};

export default function ExplorePage() {
  const explainers = getBySection("explore");
  const categories = [
    "All",
    ...Array.from(new Set(explainers.map((e) => e.category))),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    url: "https://scrolly.to/explore",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: explainers.length,
      itemListElement: explainers.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.title,
        description: e.description,
        url: `https://scrolly.to/explore/${e.slug}`,
      })),
    },
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg pt-14">
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-center font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
              Explore
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-text-muted">
              Interactive guides for teams and practitioners. Deep-dive
              explainers on engineering, business, and ML topics.
            </p>

            {explainers.length > 0 ? (
              <>
                <p className="mt-2 text-center text-sm text-text-muted">
                  {explainers.length} guide{explainers.length !== 1 ? "s" : ""}{" "}
                  and counting
                </p>

                {categories.length > 2 && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-border bg-card-bg px-3.5 py-1 text-xs font-medium text-text-muted"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {explainers.map((e, i) => (
                    <a
                      key={e.slug}
                      href={`/explore/${e.slug}`}
                      className="group overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        opacity: 0,
                        animation: `fade-in-up 0.5s ease forwards`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    >
                      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#334155] p-6">
                        <span className="text-4xl font-bold text-white/20">
                          {e.title.charAt(0)}
                        </span>
                      </div>
                      <div className="p-5">
                        <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                          {e.category}
                        </span>
                        <h3 className="mt-2 font-condensed text-lg font-semibold uppercase text-text">
                          {e.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-muted">
                          {e.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-16 text-center">
                <p className="text-lg text-text-muted">
                  Professional explainers coming soon.
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Suggest a topic below and we&apos;ll build it.
                </p>
              </div>
            )}
          </div>
        </section>

        <SuggestionBox />

        {/* Scrolly analytics — explore page views */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://scrolly.to/pixel?s=hosted&e=explore-page-view&v=1"
          width={1}
          height={1}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
          alt=""
          loading="lazy"
          decoding="async"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}
