"use client";

import { useState, useEffect, useRef } from "react";
import { Outfit } from "next/font/google";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { bakerInfo } from "../data/bakerRegions";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function Section2Bakers() {
  const [clickedState, setClickedState] = useState<string | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  const handleStateClick = (stateName: string) => {
    setClickedState(stateName);
    setTimeout(() => setClickedState(null), 1500);
  };

  return (
    <SectionWrapper id="secret-bakers" layout="full-bleed">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }

        @keyframes popIn {
          from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes popOut {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }

        .decoration-cookie {
          animation: wiggle 3s ease-in-out infinite;
        }

        .decoration-cookie-1 {
          animation-delay: 0s;
        }

        .decoration-cookie-2 {
          animation-delay: 0.5s;
        }

        .decoration-cookie-3 {
          animation-delay: 1s;
        }

        .info-card-icon {
          animation: bounce 2s ease-in-out infinite;
        }

        .state-popup {
          animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .state-popup-exit {
          animation: popOut 0.4s cubic-bezier(0.6, -0.28, 0.74, 0.05) forwards;
        }
      `}</style>

      <div
        className={`relative overflow-hidden ${outfit.className}`}
        style={{
          background: 'linear-gradient(135deg, #FFF5E1 0%, #FFE5CC 50%, #FFD9B3 100%)',
          minHeight: '100vh',
          padding: '60px 20px',
        }}
      >
        {/* Decorative background elements */}
        <div
          className="pointer-events-none absolute"
          style={{
            top: '-50%',
            right: '-20%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            bottom: '-30%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <div
              className="mb-5 inline-block rounded-[20px] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                letterSpacing: '1.2px',
              }}
            >
              🍪 Girl Scout Cookies
            </div>
            <h1
              className="mb-5 text-5xl font-extrabold leading-tight text-gray-800 md:text-6xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Two Bakers,<br />One Mission
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Discover which manufacturer supplies your favorite cookies based on where you live
            </p>
          </div>

          {/* Map wrapper */}
          <div
            className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl"
            style={{
              padding: '56px 48px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Decorative cookies */}
            <div className="decoration-cookie decoration-cookie-1 pointer-events-none absolute left-[8%] top-[15%] text-[32px] opacity-10">
              🍪
            </div>
            <div className="decoration-cookie decoration-cookie-2 pointer-events-none absolute right-[10%] top-[25%] text-[28px] opacity-10">
              🍪
            </div>
            <div className="decoration-cookie decoration-cookie-3 pointer-events-none absolute bottom-[20%] left-[12%] text-[36px] opacity-10">
              🍪
            </div>

            {/* Map title */}
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                United States Cookie Territory
              </h2>
              <p className="text-sm text-gray-400 md:text-base">
                Hover over states to explore the regions
              </p>
            </div>

            {/* SVG Map */}
            <div className="relative mx-auto w-full max-w-6xl">
              <svg
                ref={mapRef}
                className="h-auto w-full"
                viewBox="0 0 960 500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Map showing Little Brownie Bakers and ABC Bakers regions across the United States"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.06))' }}
              >
                <title>Baker Regions Map</title>
                <desc>
                  A map of the United States showing the geographic distribution
                  of the two Girl Scout cookie manufacturers
                </desc>

                {/* West Coast States (Little Brownie) */}
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Washington"
                  d="M 75,55 L 140,50 L 150,70 L 135,95 L 120,100 L 90,88 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Washington")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Oregon"
                  d="M 75,105 L 135,100 L 145,130 L 130,150 L 85,145 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Oregon")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="California"
                  d="M 85,155 L 130,155 L 145,190 L 155,240 L 145,290 L 120,305 L 95,285 L 85,240 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("California")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Nevada"
                  d="M 132,158 L 175,165 L 185,210 L 178,265 L 148,285 L 133,258 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Nevada")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Idaho"
                  d="M 138,103 L 182,95 L 195,125 L 188,160 L 175,163 L 145,133 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Idaho")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Montana"
                  d="M 185,50 L 305,45 L 310,95 L 195,100 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Montana")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Wyoming"
                  d="M 195,105 L 310,100 L 315,155 L 200,160 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Wyoming")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Utah"
                  d="M 180,168 L 245,165 L 250,225 L 185,230 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Utah")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Arizona"
                  d="M 145,295 L 178,270 L 185,310 L 180,355 L 145,350 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Arizona")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="New Mexico"
                  d="M 188,235 L 248,230 L 253,310 L 188,315 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("New Mexico")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />

                {/* Midwest States (Little Brownie) */}
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="North Dakota"
                  d="M 315,50 L 415,48 L 418,95 L 315,98 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("North Dakota")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="South Dakota"
                  d="M 315,103 L 418,100 L 422,148 L 318,150 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("South Dakota")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Nebraska"
                  d="M 318,155 L 422,152 L 425,200 L 320,203 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Nebraska")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Kansas"
                  d="M 320,208 L 425,205 L 428,250 L 323,253 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Kansas")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Colorado"
                  d="M 250,168 L 315,165 L 318,225 L 253,228 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Colorado")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Oklahoma"
                  d="M 323,258 L 428,255 L 432,295 L 327,298 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Oklahoma")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />

                {/* Texas (Little Brownie) */}
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Texas"
                  d="M 255,315 L 327,303 L 365,330 L 385,370 L 375,420 L 340,445 L 290,440 L 255,410 L 240,370 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Texas")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />

                {/* Minnesota/Wisconsin/Iowa (Little Brownie) */}
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Minnesota"
                  d="M 425,53 L 485,50 L 490,105 L 425,108 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Minnesota")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Wisconsin"
                  d="M 490,110 L 535,108 L 540,155 L 495,158 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Wisconsin")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Iowa"
                  d="M 425,113 L 490,110 L 493,158 L 428,160 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Iowa")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />
                <path
                  className="state region-west cursor-pointer transition-all duration-500"
                  data-name="Missouri"
                  d="M 428,165 L 493,162 L 498,215 L 433,218 Z"
                  fill="#DBEAFE"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Missouri")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#BFDBFE');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#DBEAFE');
                  }}
                />

                {/* East Coast States (ABC) */}
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Maine"
                  d="M 870,65 L 895,60 L 900,90 L 885,98 L 870,88 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Maine")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="New York"
                  d="M 780,95 L 860,88 L 865,128 L 785,135 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("New York")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Pennsylvania"
                  d="M 750,140 L 850,135 L 853,172 L 755,178 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Pennsylvania")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="New Jersey"
                  d="M 855,138 L 872,136 L 875,168 L 858,170 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("New Jersey")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Virginia"
                  d="M 730,185 L 825,178 L 828,218 L 735,225 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Virginia")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="North Carolina"
                  d="M 735,230 L 830,223 L 835,260 L 740,268 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("North Carolina")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="South Carolina"
                  d="M 740,273 L 810,267 L 813,295 L 745,302 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("South Carolina")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Georgia"
                  d="M 700,275 L 765,270 L 768,330 L 705,335 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Georgia")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Florida"
                  d="M 710,340 L 765,335 L 775,380 L 785,425 L 770,460 L 745,465 L 730,440 L 720,395 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Florida")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Alabama"
                  d="M 650,275 L 695,272 L 700,335 L 655,338 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Alabama")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Mississippi"
                  d="M 600,270 L 645,268 L 650,335 L 605,338 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Mississippi")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Louisiana"
                  d="M 555,305 L 605,300 L 610,355 L 565,360 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Louisiana")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Arkansas"
                  d="M 500,220 L 555,218 L 560,275 L 505,278 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Arkansas")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Tennessee"
                  d="M 610,225 L 725,220 L 728,258 L 615,263 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Tennessee")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Kentucky"
                  d="M 620,185 L 720,180 L 723,218 L 625,223 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Kentucky")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Indiana"
                  d="M 565,140 L 610,138 L 613,188 L 570,190 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Indiana")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Ohio"
                  d="M 615,142 L 685,138 L 688,185 L 620,190 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Ohio")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Michigan"
                  d="M 565,95 L 635,90 L 640,140 L 570,145 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Michigan")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />
                <path
                  className="state region-east cursor-pointer transition-all duration-500"
                  data-name="Illinois"
                  d="M 500,115 L 560,112 L 563,185 L 505,188 Z"
                  fill="#FFEDD5"
                  stroke="#F97316"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  onClick={() => handleStateClick("Illinois")}
                  style={{ transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                    e.currentTarget.style.filter = 'brightness(1.1)';
                    e.currentTarget.setAttribute('fill', '#FED7AA');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.filter = '';
                    e.currentTarget.setAttribute('fill', '#FFEDD5');
                  }}
                />

                {/* Mississippi River Divider */}
                <path
                  className="divider"
                  d="M 495 55 Q 498 100, 500 150 Q 502 200, 503 250 Q 504 300, 500 350"
                  stroke="#9CA3AF"
                  strokeWidth="3"
                  strokeDasharray="12 8"
                  opacity="0.25"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* State Labels */}
                <text className="state-label" x="110" y="75" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>WA</text>
                <text className="state-label" x="105" y="125" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>OR</text>
                <text className="state-label" x="110" y="220" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>CA</text>
                <text className="state-label" x="290" y="370" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>TX</text>
                <text className="state-label" x="750" y="410" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>FL</text>
                <text className="state-label" x="815" y="115" fill="#4B5563" opacity="0.5" fontSize="14" fontWeight="700" style={{ letterSpacing: '0.5px', pointerEvents: 'none' }}>NY</text>
              </svg>
            </div>

            {/* Info cards */}
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {/* Little Brownie Bakers card */}
              <div
                className="relative min-w-[320px] overflow-hidden rounded-[24px] border-2 border-transparent p-8 shadow-lg transition-all duration-[400ms]"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#3B82F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className="absolute left-0 right-0 top-0 h-[6px] rounded-t-[24px]"
                  style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)' }}
                />
                <div className="info-card-icon mb-4 inline-block text-5xl">🏭</div>
                <div className="company mb-3 text-2xl font-bold text-gray-800">
                  {bakerInfo.littleBrownie.name}
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Owned by:</span>
                  <span>{bakerInfo.littleBrownie.owner}</span>
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Territory:</span>
                  <span>West + Midwest</span>
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Coverage:</span>
                  <span>23 states</span>
                </div>
                <div
                  className="badge-tag mt-3 inline-block rounded-xl px-4 py-2 text-xs font-semibold"
                  style={{ background: '#DBEAFE', color: '#1E40AF' }}
                >
                  Premium Chocolate Coating
                </div>
              </div>

              {/* ABC Bakers card */}
              <div
                className="relative min-w-[320px] overflow-hidden rounded-[24px] border-2 border-transparent p-8 shadow-lg transition-all duration-[400ms]"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#F97316';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className="absolute left-0 right-0 top-0 h-[6px] rounded-t-[24px]"
                  style={{ background: 'linear-gradient(90deg, #F97316 0%, #FB923C 100%)' }}
                />
                <div className="info-card-icon mb-4 inline-block text-5xl">🏭</div>
                <div className="company mb-3 text-2xl font-bold text-gray-800">
                  {bakerInfo.abcBakers.name}
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Owned by:</span>
                  <span>{bakerInfo.abcBakers.owner}</span>
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Territory:</span>
                  <span>East + South</span>
                </div>
                <div className="detail mb-2 flex items-center gap-2 text-sm text-gray-600">
                  <span className="label font-semibold text-gray-700">Coverage:</span>
                  <span>27 states</span>
                </div>
                <div
                  className="badge-tag mt-3 inline-block rounded-xl px-4 py-2 text-xs font-semibold"
                  style={{ background: '#FFEDD5', color: '#C2410C' }}
                >
                  Regional Specialty Recipes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State click popup */}
        {clickedState && (
          <div
            className="state-popup fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white px-10 py-6 text-3xl font-bold shadow-2xl"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
            }}
          >
            {clickedState}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
