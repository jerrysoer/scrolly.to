import { ReactNode } from "react";

export interface ExplainerCardData {
  title: string;
  desc: string;
  category: string;
  gradient: string;
  url?: string;
  darkText?: boolean;
  svg: ReactNode;
}

interface ExplainerCardProps {
  card: ExplainerCardData;
  index?: number;
  animate?: boolean;
}

export default function ExplainerCard({
  card,
  index = 0,
  animate = false,
}: ExplainerCardProps) {
  const isLink = !!card.url;
  const isExternal = card.url && !card.url.startsWith("#");
  const Wrapper = isLink ? "a" : "div";
  const linkProps = isLink
    ? {
        href: card.url,
        ...(isExternal
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {}),
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className={`group overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card.url ? "cursor-pointer" : "cursor-default"}`}
      style={
        animate
          ? {
              opacity: 0,
              animation: `fade-in-up 0.5s ease forwards`,
              animationDelay: `${index * 0.08}s`,
            }
          : undefined
      }
    >
      <div
        className={`flex h-40 items-center justify-center bg-gradient-to-br p-6 ${card.gradient}`}
      >
        <div className="h-full w-full">{card.svg}</div>
      </div>
      <div className="p-5">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
            card.darkText
              ? "bg-white/20 text-white/80"
              : "bg-surface text-text-muted"
          }`}
          style={
            card.darkText ? { background: "rgba(0,0,0,0.08)" } : undefined
          }
        >
          {card.category}
        </span>
        <h3 className="mt-2 font-condensed text-lg font-semibold uppercase text-text">
          {card.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted">{card.desc}</p>
      </div>
    </Wrapper>
  );
}
