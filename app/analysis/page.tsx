"use client";

import { useMemo, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const W = 1000;
const H = 700;

export default function ShotAnalysis() {
  const [striker, setStriker] = useState<Point>({ x: 790, y: 540 });
  const [target, setTarget] = useState<Point>({ x: 700, y: 330 });

  const [dragging, setDragging] = useState<
    "striker" | "target" | null
  >(null);

  const [bouncePath, setBouncePath] = useState(true);
  const [targetHighlight, setTargetHighlight] = useState(true);

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const angle = Math.round(
    (Math.atan2(dy, dx) * 180) / Math.PI
  );

  const distance = Math.sqrt(dx * dx + dy * dy);

  const bouncePoints = useMemo(() => {
    if (!bouncePath) return [];

    return [
      { x: 560, y: 610 },
      { x: 300, y: 500 },
      { x: 180, y: 260 },
      { x: 330, y: 95 },
    ];
  }, [bouncePath]);

  function getPoint(
    event: React.PointerEvent<SVGSVGElement>
  ): Point {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: Math.max(
        70,
        Math.min(
          W - 70,
          ((event.clientX - rect.left) / rect.width) * W
        )
      ),
      y: Math.max(
        70,
        Math.min(
          H - 70,
          ((event.clientY - rect.top) / rect.height) * H
        )
      ),
    };
  }

  function handleMove(
    event: React.PointerEvent<SVGSVGElement>
  ) {
    if (!dragging) return;

    const point = getPoint(event);

    if (dragging === "striker") {
      setStriker(point);
    } else {
      setTarget(point);
    }
  }

  function resetBoard() {
    setStriker({ x: 790, y: 540 });
    setTarget({ x: 700, y: 330 });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-5">

        {/* HEADER */}

        <header className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
              Carrom Master AI
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Shot Analysis
            </h1>

            <p className="text-xs text-slate-500">
              Training trajectory overlay prototype
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300"
          >
            Back to Home
          </a>
        </header>

        <div className="grid gap-5 lg:grid-cols-[1fr_310px]">

          {/* OVERLAY VIEW */}

          <section className="rounded-3xl border border-white/10 bg-[#050505] p-3 md:p-5">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Training Overlay
                </h2>

                <p className="mt-1 text-[11px] text-slate-500">
                  Manual training visualization
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
                ENGINE READY
              </span>
            </div>

            {/* BOARD / OVERLAY AREA */}

            <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-[#17100d] shadow-[0_0_50px_rgba(168,85,247,0.08)]">

              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="block w-full touch-none select-none"
                onPointerMove={handleMove}
                onPointerUp={() => setDragging(null)}
                onPointerCancel={() => setDragging(null)}
              >

                {/* BOARD BACKGROUND */}

                <rect
                  width={W}
                  height={H}
                  fill="#6f4225"
                />

                <rect
                  x="38"
                  y="38"
                  width="924"
                  height="624"
                  rx="18"
                  fill="#b9793f"
                  stroke="#2d160b"
                  strokeWidth="16"
                />

                {/* POCKETS */}

                <Pocket x={58} y={58} />
                <Pocket x={942} y={58} />
                <Pocket x={58} y={642} />
                <Pocket x={942} y={642} />

                {/* CENTER MARKING */}

                <circle
                  cx="500"
                  cy="350"
                  r="78"
                  fill="none"
                  stroke="#4a2815"
                  strokeWidth="3"
                  opacity="0.65"
                />

                <circle
                  cx="500"
                  cy="350"
                  r="7"
                  fill="#4a2815"
                />

                <line
                  x1="90"
                  y1="350"
                  x2="910"
                  y2="350"
                  stroke="#4a2815"
                  strokeWidth="2"
                  opacity="0.25"
                />

                <line
                  x1="500"
                  y1="90"
                  x2="500"
                  y2="610"
                  stroke="#4a2815"
                  strokeWidth="2"
                  opacity="0.25"
                />

                {/* GHOST COINS */}

                <Coin x={260} y={270} color="#f3f4f6" />
                <Coin x={315} y={315} color="#151515" />
                <Coin x={370} y={275} color="#f3f4f6" />
                <Coin x={430} y={325} color="#151515" />
                <Coin x={500} y={300} color="#d92727" />
                <Coin x={550} y={355} color="#f3f4f6" />
                <Coin x={610} y={285} color="#151515" />
                <Coin x={665} y={390} color="#f3f4f6" />

                {/* MAIN BOUNCE PATH */}

                {bouncePath && (
                  <>
                    <polyline
                      points={[
                        `${striker.x},${striker.y}`,
                        `${bouncePoints[0].x},${bouncePoints[0].y}`,
                        `${bouncePoints[1].x},${bouncePoints[1].y}`,
                        `${bouncePoints[2].x},${bouncePoints[2].y}`,
                        `${bouncePoints[3].x},${bouncePoints[3].y}`,
                        `${target.x},${target.y}`,
                      ].join(" ")}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="16"
                      opacity="0.13"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <polyline
                      points={[
                        `${striker.x},${striker.y}`,
                        `${bouncePoints[0].x},${bouncePoints[0].y}`,
                        `${bouncePoints[1].x},${bouncePoints[1].y}`,
                        `${bouncePoints[2].x},${bouncePoints[2].y}`,
                        `${bouncePoints[3].x},${bouncePoints[3].y}`,
                        `${target.x},${target.y}`,
                      ].join(" ")}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {bouncePoints.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="12"
                          fill="#a855f7"
                          opacity="0.2"
                        />

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="6"
                          fill="#e9d5ff"
                          stroke="#a855f7"
                          strokeWidth="3"
                        />
                      </g>
                    ))}
                  </>
                )}

                {/* DIRECT AIMING LINE */}

                <line
                  x1={striker.x}
                  y1={striker.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray="9 10"
                  opacity="0.85"
                />

                {/* TARGET HIGHLIGHT */}

                {targetHighlight && (
                  <circle
                    cx={target.x}
                    cy={target.y}
                    r="38"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="3"
                    strokeDasharray="8 8"
                  />
                )}

                {/* RED DIRECTION ARROW */}

                <line
                  x1={target.x}
                  y1={target.y}
                  x2="850"
                  y2="350"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <polygon
                  points="850,350 828,338 828,362"
                  fill="#ef4444"
                />

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
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="5"
                  />

                  <circle
                    cx={striker.x}
                    cy={striker.y}
                    r="9"
                    fill="#a855f7"
                  />

                  <text
                    x={striker.x}
                    y={striker.y + 53}
                    textAnchor="middle"
                    fill="white"
                    fontSize="15"
                    fontWeight="bold"
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
                    r="9"
                    fill="#c084fc"
                  />

                  <text
                    x={target.x}
                    y={target.y + 53}
                    textAnchor="middle"
                    fill="white"
                    fontSize="15"
                    fontWeight="bold"
                  >
                    TARGET
                  </text>
                </g>

              </svg>
            </div>
          </section>

          {/* CONTROLS */}

          <aside className="rounded-3xl border border-white/10 bg-[#080808] p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Controls
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Shot Configuration
            </h2>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm">
                  Striker
                </span>

                <span className="text-xs text-purple-300">
                  {Math.round((striker.x / W) * 100)}%,{" "}
                  {Math.round((striker.y / H) * 100)}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Touch and drag the white striker.
              </p>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm">
                  Target
                </span>

                <span className="text-xs text-purple-300">
                  {Math.round((target.x / W) * 100)}%,{" "}
                  {Math.round((target.y / H) * 100)}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Touch and drag the target coin.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">

              <div className="flex justify-between">
                <span className="text-xs text-slate-400">
                  Calculated Angle
                </span>

                <span className="font-bold text-purple-300">
                  {angle}°
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-xs text-slate-400">
                  Shot Distance
                </span>

                <span className="font-bold text-purple-300">
                  {distance.toFixed(1)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setBouncePath(!bouncePath)}
              className="mt-5 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span>Bounce Path</span>

              <span className="font-bold text-purple-300">
                {bouncePath ? "ON" : "OFF"}
              </span>
            </button>

            <button
              onClick={() =>
                setTargetHighlight(!targetHighlight)
              }
              className="mt-3 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span>Target Highlight</span>

              <span className="font-bold text-purple-300">
                {targetHighlight ? "ON" : "OFF"}
              </span>
            </button>

            <button
              onClick={resetBoard}
              className="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <p className="text-xs font-semibold text-purple-300">
                Training Overlay
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                This prototype provides visual shot guidance only.
                It does not control or automatically play another
                game.
              </p>
            </div>

          </aside>
        </div>
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
      r="28"
      fill="#080604"
      stroke="#32180b"
      strokeWidth="7"
    />
  );
}

function Coin({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="20"
        fill="#000000"
        opacity="0.2"
        transform="translate(2 3)"
      />

      <circle
        cx={x}
        cy={y}
        r="19"
        fill={color}
        stroke="#e5e7eb"
        strokeWidth="2"
      />

      <circle
        cx={x - 5}
        cy={y - 5}
        r="5"
        fill="white"
        opacity="0.18"
      />
    </g>
  );
}
