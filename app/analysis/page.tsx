"use client";

import { useState } from "react";

type Point = {
  x: number;
  y: number;
};

const BOARD_SIZE = 700;

export default function AnalysisPage() {
  const [striker, setStriker] = useState<Point>({
    x: 175,
    y: 490,
  });

  const [target, setTarget] = useState<Point>({
    x: 434,
    y: 245,
  });

  const [dragging, setDragging] = useState<"striker" | "target" | null>(
    null
  );

  const [bouncePath, setBouncePath] = useState(true);
  const [targetHighlight, setTargetHighlight] = useState(true);

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
  const distance = Math.sqrt(dx * dx + dy * dy);

  const strikerX = Math.round((striker.x / BOARD_SIZE) * 100);
  const strikerY = Math.round((striker.y / BOARD_SIZE) * 100);

  const targetX = Math.round((target.x / BOARD_SIZE) * 100);
  const targetY = Math.round((target.y / BOARD_SIZE) * 100);

  function getBoardPoint(
    event: React.PointerEvent<SVGSVGElement>
  ): Point {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();

    const scaleX = BOARD_SIZE / rect.width;
    const scaleY = BOARD_SIZE / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    return {
      x: Math.max(45, Math.min(655, x)),
      y: Math.max(45, Math.min(655, y)),
    };
  }

  function handlePointerMove(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (!dragging) return;

    const point = getBoardPoint(event);

    if (dragging === "striker") {
      setStriker(point);
    } else {
      setTarget(point);
    }
  }

  function resetBoard() {
    setStriker({
      x: 175,
      y: 490,
    });

    setTarget({
      x: 434,
      y: 245,
    });
  }

  return (
    <main className="min-h-screen bg-[#050812] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Carrom Master AI
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Shot Analysis
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Interactive trajectory workspace
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* BOARD */}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:p-6">

            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  Interactive Analysis Board
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Drag the white striker or black target.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                ENGINE READY
              </span>
            </div>

            {/* SVG CARROM BOARD */}

            <div className="mx-auto w-full max-w-[720px] overflow-hidden rounded-[32px] border-[12px] border-[#5b3218] bg-[#8b5428] p-2 shadow-2xl">

              <svg
                viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
                className="block h-auto w-full touch-none select-none rounded-[18px]"
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDragging(null)}
                onPointerCancel={() => setDragging(null)}
              >

                {/* WOOD BOARD */}

                <rect
                  x="0"
                  y="0"
                  width="700"
                  height="700"
                  rx="25"
                  fill="#d29a58"
                />

                {/* INNER PLAYING AREA */}

                <rect
                  x="35"
                  y="35"
                  width="630"
                  height="630"
                  rx="14"
                  fill="#c88c49"
                  stroke="#75431f"
                  strokeWidth="6"
                />

                {/* BASE MARKINGS */}

                <circle
                  cx="350"
                  cy="350"
                  r="72"
                  fill="none"
                  stroke="#75431f"
                  strokeWidth="3"
                  opacity="0.65"
                />

                <circle
                  cx="350"
                  cy="350"
                  r="9"
                  fill="#75431f"
                  opacity="0.8"
                />

                <line
                  x1="350"
                  y1="60"
                  x2="350"
                  y2="640"
                  stroke="#75431f"
                  strokeWidth="2"
                  opacity="0.18"
                />

                <line
                  x1="60"
                  y1="350"
                  x2="640"
                  y2="350"
                  stroke="#75431f"
                  strokeWidth="2"
                  opacity="0.18"
                />

                {/* POCKETS */}

                <Pocket x={45} y={45} />
                <Pocket x={655} y={45} />
                <Pocket x={45} y={655} />
                <Pocket x={655} y={655} />

                {/* TRAJECTORY */}

                <line
                  x1={striker.x}
                  y1={striker.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#22d3ee"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.95"
                />

                {/* TRAJECTORY GLOW */}

                <line
                  x1={striker.x}
                  y1={striker.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#22d3ee"
                  strokeWidth="18"
                  strokeLinecap="round"
                  opacity="0.12"
                />

                {/* OPTIONAL BOUNCE PATH */}

                {bouncePath && (
                  <line
                    x1={target.x}
                    y1={target.y}
                    x2={target.x + 150}
                    y2={Math.max(70, target.y - 110)}
                    stroke="#67e8f9"
                    strokeWidth="4"
                    strokeDasharray="12 10"
                    opacity="0.8"
                  />
                )}

                {/* TARGET HIGHLIGHT */}

                {targetHighlight && (
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="42"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="8 7"
                  />
                )}

                {/* STRIKER */}

                <g
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    event.currentTarget.setPointerCapture(
                      event.pointerId
                    );
                    setDragging("striker");
                  }}
                  className="cursor-grab"
                >

                  <circle
                    cx={striker.x}
                    cy={striker.y}
                    r="31"
                    fill="#ffffff"
                    stroke="#dbeafe"
                    strokeWidth="5"
                  />

                  <circle
                    cx={striker.x}
                    cy={striker.y}
                    r="10"
                    fill="#22d3ee"
                  />

                  <text
                    x={striker.x}
                    y={striker.y + 55}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="15"
                    fontWeight="700"
                  >
                    STRIKER
                  </text>
                </g>

                {/* TARGET */}

                <g
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    event.currentTarget.setPointerCapture(
                      event.pointerId
                    );
                    setDragging("target");
                  }}
                  className="cursor-grab"
                >

                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="31"
                    fill="#111827"
                    stroke="#374151"
                    strokeWidth="5"
                  />

                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="10"
                    fill="#67e8f9"
                  />

                  <text
                    x={target.x}
                    y={target.y + 55}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="15"
                    fontWeight="700"
                  >
                    TARGET
                  </text>
                </g>

              </svg>
            </div>
          </div>

          {/* CONTROLS */}

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Controls
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Shot Configuration
            </h2>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">
                  Striker
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  {strikerX}%, {strikerY}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Drag the white striker on the board.
              </p>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">
                  Target
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  {targetX}%, {targetY}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Drag the dark target on the board.
              </p>
            </div>

            {/* ANALYSIS */}

            <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

              <div className="flex justify-between">
                <span className="text-xs text-slate-400">
                  Calculated Angle
                </span>

                <span className="font-bold text-cyan-300">
                  {angle}°
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-xs text-slate-400">
                  Shot Distance
                </span>

                <span className="font-bold text-cyan-300">
                  {distance.toFixed(1)}
                </span>
              </div>
            </div>

            {/* BOUNCE */}

            <button
              onClick={() => setBouncePath(!bouncePath)}
              className="mt-6 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span>Bounce Path</span>

              <span className="font-bold text-cyan-300">
                {bouncePath ? "ON" : "OFF"}
              </span>
            </button>

            {/* HIGHLIGHT */}

            <button
              onClick={() =>
                setTargetHighlight(!targetHighlight)
              }
              className="mt-3 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span>Target Highlight</span>

              <span className="font-bold text-cyan-300">
                {targetHighlight ? "ON" : "OFF"}
              </span>
            </button>

            {/* RESET */}

            <button
              onClick={resetBoard}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold shadow-lg shadow-cyan-500/20"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
              <p className="text-xs font-semibold text-cyan-300">
                Interactive Mode
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Touch and drag the white STRIKER or dark TARGET
                directly on the Carrom board.
              </p>
            </div>

          </aside>
        </section>
      </div>
    </main>
  );
}

function Pocket({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r="27"
      fill="#080604"
      stroke="#3a2111"
      strokeWidth="6"
    />
  );
                      }
