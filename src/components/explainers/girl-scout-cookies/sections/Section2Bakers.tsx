"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { bakerInfo } from "../data/bakerRegions";
import { Factory, MapPin } from "lucide-react";

export default function Section2Bakers() {
  const [hoveredBaker, setHoveredBaker] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="secret-bakers" layout="split-left">
      {/* LEFT column: Text content */}
      <div className="flex flex-col justify-center">
        <h2 className="mb-6 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-5xl">
          There are only 2 companies that make ALL Girl Scout cookies in America.
        </h2>

        <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
          Two secret bakeries. Every Thin Mint, every Samoa, every Tagalong — comes from one of them.
          And depending on where you live, your cookies taste slightly different than your cousin's.
        </p>

        <div className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">🍫</span>
            <h3 className="text-base font-bold text-[var(--color-text-primary)] sm:text-lg">
              Fun Fact
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
            If you live in LA, your Samoas are made by the same company that makes Nutella.
          </p>
        </div>

        {/* Baker info cards */}
        <div className="space-y-4">
          <button
            type="button"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            onMouseEnter={() => setHoveredBaker("littleBrownie")}
            onMouseLeave={() => setHoveredBaker(null)}
            style={{
              transform: hoveredBaker === "littleBrownie" ? "scale(1.02)" : "scale(1)",
            }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[var(--color-forward-blue)] p-2">
                  <Factory className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] sm:text-xl">
                    {bakerInfo.littleBrownie.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-tertiary)]">
                    Founded {bakerInfo.littleBrownie.founded}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-md bg-[var(--color-bg-secondary)] px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Owned by
              </p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                {bakerInfo.littleBrownie.owner}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {bakerInfo.littleBrownie.regions.map((region) => (
                <span
                  key={region}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forward-blue)] bg-opacity-10 px-3 py-1 text-xs font-medium text-[var(--color-forward-blue)]"
                >
                  <MapPin className="h-3 w-3" />
                  {region}
                </span>
              ))}
            </div>
          </button>

          <button
            type="button"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
            onMouseEnter={() => setHoveredBaker("abcBakers")}
            onMouseLeave={() => setHoveredBaker(null)}
            style={{
              transform: hoveredBaker === "abcBakers" ? "scale(1.02)" : "scale(1)",
            }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[var(--color-backward-orange)] p-2">
                  <Factory className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] sm:text-xl">
                    {bakerInfo.abcBakers.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-tertiary)]">
                    Founded {bakerInfo.abcBakers.founded}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-md bg-[var(--color-bg-secondary)] px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Owned by
              </p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">
                {bakerInfo.abcBakers.owner}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {bakerInfo.abcBakers.regions.map((region) => (
                <span
                  key={region}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--color-backward-orange)] bg-opacity-10 px-3 py-1 text-xs font-medium text-[var(--color-backward-orange)]"
                >
                  <MapPin className="h-3 w-3" />
                  {region}
                </span>
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* RIGHT column: SVG Map */}
      <div className="flex items-center justify-center">
        <figure className="w-full">
          <svg
            ref={mapRef}
            viewBox="0 0 960 600"
            className="h-auto w-full drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Map showing Little Brownie Bakers and ABC Bakers regions across the United States"
          >
            <title>Baker Regions Map</title>
            <desc>
              A simplified map of the United States showing the geographic distribution
              of the two Girl Scout cookie manufacturers
            </desc>

            {/* Background */}
            <rect width="960" height="600" fill="var(--color-bg-secondary)" rx="12" />

            {/* Accurate Continental USA outline */}
            <defs>
              {/* Simplified but accurate USA continental outline */}
              <path
                id="usaOutline"
                d="M 120 80 L 140 85 L 160 95 L 180 100 L 200 110 L 220 115 L 245 120 L 270 118 L 295 120 L 320 125 L 345 132 L 370 138 L 395 145 L 418 152 L 438 158 L 458 165 L 478 172 L 498 178 L 518 185 L 538 192 L 558 198 L 578 203 L 598 207 L 618 210 L 638 212 L 658 215 L 678 220 L 698 228 L 718 238 L 738 248 L 758 258 L 775 268 L 790 278 L 803 288 L 815 298 L 825 308 L 833 318 L 840 328 L 845 338 L 848 348 L 850 358 L 851 368 L 851 378 L 850 388 L 848 398 L 845 408 L 841 418 L 836 428 L 830 438 L 823 448 L 815 458 L 806 467 L 796 475 L 785 482 L 773 488 L 760 493 L 746 497 L 731 500 L 715 502 L 698 503 L 680 503 L 662 502 L 644 500 L 626 497 L 608 493 L 590 488 L 572 482 L 554 475 L 536 467 L 518 458 L 500 448 L 482 437 L 464 425 L 446 412 L 428 398 L 410 383 L 392 367 L 374 350 L 356 332 L 338 313 L 320 293 L 302 272 L 284 250 L 266 227 L 248 203 L 230 178 L 212 152 L 194 125 L 176 97 L 158 68 L 140 60 L 130 70 Z"
              />

              {/* Great Lakes notches for realism */}
              <g id="greatLakes">
                <ellipse cx="640" cy="180" rx="35" ry="20" fill="var(--color-bg-secondary)" opacity="0.8" />
                <ellipse cx="590" cy="165" rx="25" ry="15" fill="var(--color-bg-secondary)" opacity="0.8" />
                <ellipse cx="680" cy="190" rx="28" ry="18" fill="var(--color-bg-secondary)" opacity="0.8" />
              </g>
            </defs>

            {/* West/Midwest region (Little Brownie) - left side of map */}
            <g
              className={`transition-all duration-300 ${
                hoveredBaker === "littleBrownie" ? "opacity-100" : "opacity-75"
              }`}
            >
              {/* West coast - WA, OR, CA, NV, ID, MT, WY, UT, CO */}
              <path
                d="M 120 80 L 140 85 L 160 95 L 180 100 L 200 110 L 215 125 L 220 145 L 218 170 L 212 195 L 205 220 L 198 245 L 192 270 L 188 295 L 185 320 L 183 345 L 182 370 L 183 395 L 186 420 L 192 445 L 200 468 L 212 487 L 228 500 L 248 508 L 270 512 L 294 514 L 318 515 L 342 514 L 366 512 L 390 508 L 414 502 L 435 492 L 450 478 L 460 460 L 465 440 L 468 420 L 468 400 L 465 380 L 460 360 L 453 340 L 445 320 L 435 300 L 423 280 L 410 260 L 395 240 L 378 220 L 360 200 L 340 180 L 318 160 L 295 142 L 270 126 L 245 112 L 220 100 L 195 90 L 170 83 L 145 78 Z"
                fill="var(--color-forward-blue)"
                fillOpacity="0.4"
                stroke="var(--color-forward-blue)"
                strokeWidth="3"
                strokeDasharray={hoveredBaker === "littleBrownie" ? "0" : "6,4"}
                strokeLinejoin="round"
              />

              {/* Midwest extension - SD, ND, NE, KS, MN, IA, MO, WI, IL */}
              <path
                d="M 450 478 L 470 485 L 490 490 L 510 493 L 530 495 L 550 496 L 570 496 L 585 494 L 595 488 L 600 478 L 602 465 L 600 450 L 595 435 L 588 420 L 578 405 L 565 390 L 550 375 L 533 360 L 515 345 L 495 330 L 475 315 L 455 300 L 438 285 L 425 270 L 415 255 L 408 240 L 405 225 L 405 210 L 408 195 L 415 180 L 425 168 L 438 160 L 453 156 L 468 156 L 483 160 L 495 168 L 505 180 L 512 195 L 517 210 L 520 225 L 522 240 L 523 255 L 523 270 L 522 285 L 520 300 L 517 315 L 513 330 L 508 345 L 502 360 L 495 375 L 487 390 L 478 405 L 468 420 L 460 435 L 453 450 L 448 465 Z"
                fill="var(--color-forward-blue)"
                fillOpacity="0.35"
                stroke="var(--color-forward-blue)"
                strokeWidth="2.5"
                strokeDasharray={hoveredBaker === "littleBrownie" ? "0" : "6,4"}
                strokeLinejoin="round"
              />
            </g>

            {/* East/South region (ABC Bakers) - right side of map */}
            <g
              className={`transition-all duration-300 ${
                hoveredBaker === "abcBakers" ? "opacity-100" : "opacity-75"
              }`}
            >
              {/* East coast + South */}
              <path
                d="M 600 478 L 620 485 L 640 490 L 660 493 L 680 495 L 700 496 L 720 496 L 740 494 L 758 490 L 775 484 L 790 477 L 803 468 L 815 458 L 825 448 L 833 438 L 840 428 L 845 418 L 848 408 L 850 398 L 851 388 L 851 378 L 850 368 L 848 358 L 845 348 L 841 338 L 836 328 L 830 318 L 823 308 L 815 298 L 806 288 L 796 278 L 785 268 L 773 258 L 760 248 L 746 238 L 731 228 L 715 220 L 698 215 L 680 212 L 662 210 L 644 207 L 626 203 L 610 198 L 598 192 L 590 185 L 585 178 L 583 170 L 583 162 L 585 155 L 590 150 L 598 148 L 608 150 L 618 156 L 626 165 L 632 175 L 636 186 L 638 197 L 638 208 L 636 219 L 632 230 L 626 241 L 618 252 L 608 263 L 598 274 L 590 285 L 585 296 L 583 307 L 583 318 L 585 329 L 590 340 L 598 351 L 608 362 L 618 373 L 626 384 L 632 395 L 636 406 L 638 417 L 638 428 L 636 439 L 632 450 L 626 461 L 618 472 Z"
                fill="var(--color-backward-orange)"
                fillOpacity="0.4"
                stroke="var(--color-backward-orange)"
                strokeWidth="3"
                strokeDasharray={hoveredBaker === "abcBakers" ? "0" : "6,4"}
                strokeLinejoin="round"
              />

              {/* Florida peninsula - highly recognizable */}
              <path
                d="M 680 490 L 690 505 L 695 520 L 698 535 L 700 550 L 700 565 L 698 578 L 694 588 L 688 595 L 680 599 L 670 600 L 660 598 L 652 592 L 646 583 L 642 572 L 640 560 L 640 548 L 642 536 L 646 524 L 652 512 L 660 501 L 670 492 Z"
                fill="var(--color-backward-orange)"
                fillOpacity="0.5"
                stroke="var(--color-backward-orange)"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Texas - distinctive southwestern extension */}
              <path
                d="M 450 478 L 460 495 L 465 510 L 468 525 L 470 540 L 472 553 L 475 565 L 480 575 L 488 583 L 498 588 L 510 590 L 523 589 L 535 585 L 545 578 L 553 568 L 558 556 L 560 543 L 559 530 L 556 517 L 550 505 L 542 494 L 532 485 L 520 478 L 507 473 L 493 470 L 478 470 L 463 472 Z"
                fill="var(--color-backward-orange)"
                fillOpacity="0.45"
                stroke="var(--color-backward-orange)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>

            {/* Great Lakes for geographic reference */}
            <use href="#greatLakes" />

            {/* Mississippi River divider - prominent geographical feature */}
            <path
              d="M 520 150 Q 518 200, 515 250 Q 512 300, 510 350 Q 508 400, 505 450 Q 503 475, 500 495"
              stroke="var(--color-text-primary)"
              strokeWidth="2"
              strokeDasharray="10,6"
              fill="none"
              opacity="0.25"
            />

            {/* Label for Mississippi */}
            <text
              x="465"
              y="320"
              transform="rotate(-5 465 320)"
              className="fill-[var(--color-text-tertiary)]"
              style={{ fontSize: "11px", fontStyle: "italic", opacity: 0.5 }}
            >
              Mississippi River
            </text>

            {/* Labels */}
            <g className={visible ? "fade-in" : ""}>
              {/* Little Brownie label - positioned over Western region */}
              <g
                className={`transition-opacity duration-300 ${
                  hoveredBaker === "abcBakers" ? "opacity-40" : "opacity-100"
                }`}
              >
                <rect
                  x="200"
                  y="280"
                  width="250"
                  height="80"
                  fill="var(--color-bg-card)"
                  stroke="var(--color-forward-blue)"
                  strokeWidth="3"
                  rx="10"
                  className="drop-shadow-xl"
                  opacity="0.98"
                />
                <text
                  x="325"
                  y="310"
                  textAnchor="middle"
                  className="fill-[var(--color-text-primary)] text-sm font-bold sm:text-base"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  Little Brownie Bakers
                </text>
                <text
                  x="325"
                  y="335"
                  textAnchor="middle"
                  className="fill-[var(--color-text-secondary)] text-xs sm:text-sm"
                  style={{ fontSize: "14px" }}
                >
                  Owned by Ferrero
                </text>
                <text
                  x="325"
                  y="353"
                  textAnchor="middle"
                  className="fill-[var(--color-text-tertiary)] text-xs"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  West + Midwest
                </text>
              </g>

              {/* ABC Bakers label - positioned over Eastern region */}
              <g
                className={`transition-opacity duration-300 ${
                  hoveredBaker === "littleBrownie" ? "opacity-40" : "opacity-100"
                }`}
              >
                <rect
                  x="620"
                  y="300"
                  width="230"
                  height="80"
                  fill="var(--color-bg-card)"
                  stroke="var(--color-backward-orange)"
                  strokeWidth="3"
                  rx="10"
                  className="drop-shadow-xl"
                  opacity="0.98"
                />
                <text
                  x="735"
                  y="330"
                  textAnchor="middle"
                  className="fill-[var(--color-text-primary)] text-sm font-bold sm:text-base"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  ABC Bakers
                </text>
                <text
                  x="735"
                  y="355"
                  textAnchor="middle"
                  className="fill-[var(--color-text-secondary)] text-xs sm:text-sm"
                  style={{ fontSize: "14px" }}
                >
                  Owned by Interbake
                </text>
                <text
                  x="735"
                  y="373"
                  textAnchor="middle"
                  className="fill-[var(--color-text-tertiary)] text-xs"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  East + South
                </text>
              </g>
            </g>

            {/* State labels for geographic context */}
            <g className={visible ? "fade-in" : ""} opacity="0.4">
              <text x="200" y="260" className="fill-[var(--color-text-tertiary)]" style={{ fontSize: "10px", fontWeight: "600" }}>CA</text>
              <text x="670" y="545" className="fill-[var(--color-text-tertiary)]" style={{ fontSize: "10px", fontWeight: "600" }}>FL</text>
              <text x="490" y="535" className="fill-[var(--color-text-tertiary)]" style={{ fontSize: "10px", fontWeight: "600" }}>TX</text>
              <text x="780" y="310" className="fill-[var(--color-text-tertiary)]" style={{ fontSize: "10px", fontWeight: "600" }}>NY</text>
              <text x="160" y="140" className="fill-[var(--color-text-tertiary)]" style={{ fontSize: "10px", fontWeight: "600" }}>WA</text>
            </g>

            {/* Factory icons */}
            <g className={visible ? "fade-in" : ""}>
              {/* Little Brownie factory pin - positioned in western US */}
              <circle
                cx="280"
                cy="380"
                r="15"
                fill="var(--color-forward-blue)"
                stroke="white"
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              <circle cx="280" cy="380" r="8" fill="white" opacity="0.95" />
              <text
                x="280"
                y="415"
                textAnchor="middle"
                className="fill-[var(--color-text-primary)]"
                style={{ fontSize: "10px", fontWeight: "700" }}
              >
                🏭
              </text>

              {/* ABC Bakers factory pin - positioned in eastern US */}
              <circle
                cx="720"
                cy="400"
                r="15"
                fill="var(--color-backward-orange)"
                stroke="white"
                strokeWidth="3"
                className="drop-shadow-lg"
              />
              <circle cx="720" cy="400" r="8" fill="white" opacity="0.95" />
              <text
                x="720"
                y="435"
                textAnchor="middle"
                className="fill-[var(--color-text-primary)]"
                style={{ fontSize: "10px", fontWeight: "700" }}
              >
                🏭
              </text>
            </g>

            {/* "USA" label to make it completely explicit */}
            <g opacity="0.5">
              <text
                x="480"
                y="45"
                textAnchor="middle"
                className="fill-[var(--color-text-primary)]"
                style={{ fontSize: "16px", fontWeight: "700", letterSpacing: "3px" }}
              >
                UNITED STATES
              </text>
              <line x1="380" y1="50" x2="580" y2="50" stroke="var(--color-text-tertiary)" strokeWidth="1" opacity="0.4" />
            </g>
          </svg>

          <figcaption className="mt-4 text-center text-sm text-[var(--color-text-tertiary)]">
            Geographic distribution of the two Girl Scout cookie manufacturers.
            Your local council determines which baker supplies your cookies.
          </figcaption>
        </figure>
      </div>
    </SectionWrapper>
  );
}
