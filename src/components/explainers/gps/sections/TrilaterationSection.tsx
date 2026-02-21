"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  DEFAULT_SATELLITES,
  computeTrilateration,
  computeRadii,
  type SatellitePoint,
} from "@/lib/explainers/gps";

const CANVAS_W = 480;
const CANVAS_H = 420;

export default function TrilaterationSection() {
  const [satellites, setSatellites] =
    useState<SatellitePoint[]>(DEFAULT_SATELLITES);
  const [receiver, setReceiver] = useState({ x: 220, y: 220 });
  const [dragging, setDragging] = useState<string | null>(null);
  const [showFourth, setShowFourth] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const radii = computeRadii(satellites, receiver);
  const intersection = computeTrilateration(satellites, radii);

  const getMousePos = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return {
        x: Math.max(
          20,
          Math.min(CANVAS_W - 20, (clientX - rect.left) * scaleX)
        ),
        y: Math.max(
          20,
          Math.min(CANVAS_H - 20, (clientY - rect.top) * scaleY)
        ),
      };
    },
    []
  );

  const handlePointerDown = useCallback((id: string) => {
    setDragging(id);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const pos = getMousePos(e);
      if (dragging === "receiver") {
        setReceiver(pos);
      } else {
        setSatellites((prev) =>
          prev.map((s) => (s.id === dragging ? { ...s, ...pos } : s))
        );
      }
    },
    [dragging, getMousePos]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    const handleUp = () => setDragging(null);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <SectionWrapper id="trilateration">
      <div className="text-center mb-12">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{
            color: "var(--forward-blue)",
            fontFamily: "var(--font-inter)",
          }}
        >
          Section 3
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Trilateration: Three Circles,{" "}
          <span style={{ color: "var(--accent-purple)" }}>One Point</span>
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontFamily: "var(--font-inter)",
          }}
        >
          If you know your distance from three satellites, there is exactly one
          point where all three distance spheres intersect. Drag the satellites
          or the receiver to see how trilateration works.
        </p>
      </div>

      {/* Interactive Visualization */}
      <div
        className="rounded-2xl p-4 sm:p-6 mb-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="w-full max-w-[600px] mx-auto touch-none"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "12px",
          }}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchEnd={handlePointerUp}
        >
          {/* Distance circles */}
          {satellites.map((sat, i) => (
            <circle
              key={`circle-${sat.id}`}
              cx={sat.x}
              cy={sat.y}
              r={radii[i]}
              fill="none"
              stroke={sat.color}
              strokeWidth={2}
              strokeDasharray="6 4"
              opacity={0.5}
            />
          ))}

          {/* Lines from satellites to receiver */}
          {satellites.map((sat) => (
            <line
              key={`line-${sat.id}`}
              x1={sat.x}
              y1={sat.y}
              x2={receiver.x}
              y2={receiver.y}
              stroke={sat.color}
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.3}
            />
          ))}

          {/* Intersection highlight */}
          {intersection && (
            <>
              <circle
                cx={intersection.x}
                cy={intersection.y}
                r={18}
                fill="none"
                stroke="var(--correct-green, #4CAF50)"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              <circle
                cx={intersection.x}
                cy={intersection.y}
                r={5}
                fill="var(--correct-green, #4CAF50)"
                opacity={0.4}
              />
            </>
          )}

          {/* Satellites (draggable) */}
          {satellites.map((sat) => (
            <g
              key={sat.id}
              style={{ cursor: "grab" }}
              onMouseDown={() => handlePointerDown(sat.id)}
              onTouchStart={() => handlePointerDown(sat.id)}
            >
              <circle cx={sat.x} cy={sat.y} r={20} fill="transparent" />
              <circle
                cx={sat.x}
                cy={sat.y}
                r={12}
                fill={sat.color}
                opacity={0.2}
              />
              <circle cx={sat.x} cy={sat.y} r={7} fill={sat.color} />
              <text
                x={sat.x}
                y={sat.y - 18}
                textAnchor="middle"
                fill={sat.color}
                fontSize={11}
                fontWeight={600}
                fontFamily="var(--font-inter)"
              >
                {sat.label}
              </text>
            </g>
          ))}

          {/* Receiver (draggable) */}
          <g
            style={{ cursor: "grab" }}
            onMouseDown={() => handlePointerDown("receiver")}
            onTouchStart={() => handlePointerDown("receiver")}
          >
            <circle
              cx={receiver.x}
              cy={receiver.y}
              r={20}
              fill="transparent"
            />
            <circle
              cx={receiver.x}
              cy={receiver.y}
              r={8}
              fill="var(--correct-green, #4CAF50)"
            />
            <circle
              cx={receiver.x}
              cy={receiver.y}
              r={12}
              fill="none"
              stroke="var(--correct-green, #4CAF50)"
              strokeWidth={2}
              opacity={0.5}
            >
              <animate
                attributeName="r"
                from="10"
                to="20"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <text
              x={receiver.x}
              y={receiver.y + 24}
              textAnchor="middle"
              fill="var(--correct-green, #4CAF50)"
              fontSize={11}
              fontWeight={600}
              fontFamily="var(--font-inter)"
            >
              You
            </text>
          </g>
        </svg>

        {/* Distance readouts */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {satellites.map((sat, i) => (
            <div
              key={sat.id}
              className="text-center p-3 rounded-xl"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: sat.color }}
              />
              <p
                className="text-xs mb-1"
                style={{
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {sat.label}
              </p>
              <p
                className="text-sm font-bold"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: sat.color,
                }}
              >
                {radii[i].toFixed(0)} px
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why 4 satellites? */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-1"
            style={{
              backgroundColor: "rgba(124,92,191,0.15)",
            }}
          >
            <span
              className="text-lg font-bold"
              style={{ color: "var(--accent-purple)" }}
            >
              ?
            </span>
          </div>
          <div>
            <h3
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              But wait — why do you need 4 satellites?
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
              }}
            >
              This 2D demo shows trilateration with 3 satellites. In 3D space,
              three spheres intersect at two points. Usually, one point is deep
              in space (easy to discard), but the real problem is{" "}
              <strong>your clock is wrong</strong>.
            </p>
            <button
              onClick={() => setShowFourth(!showFourth)}
              className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
              style={{
                backgroundColor: showFourth
                  ? "var(--accent-purple)"
                  : "rgba(124,92,191,0.15)",
                color: showFourth ? "#fff" : "var(--accent-purple)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {showFourth ? "Got it!" : "Show me the problem \u2192"}
            </button>
            {showFourth && (
              <div
                className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                <p>
                  Your phone doesn&apos;t have an atomic clock. Its cheap
                  quartz oscillator drifts by microseconds — but at light
                  speed,{" "}
                  <strong>1 microsecond = 300 meters of error</strong>.
                </p>
                <p className="mt-2">
                  The fourth satellite provides the extra equation needed to
                  solve for time <em>and</em> position simultaneously.
                  It&apos;s solving 4 equations for 4 unknowns: x, y, z, and
                  t.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
