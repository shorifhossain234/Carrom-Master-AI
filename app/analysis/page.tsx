"use client";

import { useState } from "react";

type Point = {
  x: number;
  y: number;
};

export default function AnalysisPage() {
  const [striker, setStriker] = useState<Point>({
    x: 25,
    y: 70,
  });

  const [target, setTarget] = useState<Point>({
    x: 62,
    y: 35,
  });

  const [dragging, setDragging] = useState<
    "striker" | "target" | null
  >(null);

  const [bouncePath, setBouncePath] = useState(true);
  const [targetHighlight, setTargetHighlight] = useState(true);

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const angle = Math.round(
    Math.atan2(dy, dx) * (180 / Math.PI)
  );

  const distance = Math.sqrt(dx * dx + dy * dy);

  function movePiece(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (!dragging) return;

    const board = event.currentTarget.getBoundingClientRect();

    let x =
      ((event.clientX - board.left) / board.width) * 100;

    let y =
      ((event.clientY - board.top) / board.height) * 100;

    x = Math.max(8, Math.min(92, x));
    y = Math.max(8, Math.min(92, y));

    if (dragging === "striker") {
      setStriker({ x, y });
    }

    if (dragging === "target") {
      setTarget({ x, y });
    }
  }

  function resetBoard() {
    setStriker({ x: 25, y: 70 });
    setTarget({ x: 62, y: 35 });
  }

  return (
    <main className="min-h-screen bg-[#050812] px-4 py-6 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <header className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Carrom Master AI
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Shot Analysis
            </h1>

            <p className="text-xs text-slate-500">
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

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Interactive Analysis Board
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Drag STRIKER or TARGET anywhere on the board.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                ENGINE READY
              </span>
            </div>

            {/* REAL BOARD */}

            <div
              onPointerMove={movePiece}
              onPointerUp={() => setDragging(null)}
              onPointerLeave={() => setDragging(null)}
              className="relative mx-auto aspect-square w-full max-w-[680px] touch-none rounded-[32px] border-[16px] border-[#6b3f20] bg-[#d39a55] p-6 shadow-2xl"
            >

              {/* INNER BOARD */}

              <div className="relative h-full w-full overflow-hidden rounded-[24px] border-4 border-[#8b5a2b] bg-[#c98d48]">

                {/* CENTER CIRCLE */}

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#70451f]/50" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#70451f]/60" />

                {/* CENTER LINES */}

                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#70451f]/20" />

                <div className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#70451f]/20" />

                {/* POCKETS */}

                <Pocket left="2%" top="2%" />
                <Pocket left="98%" top="2%" />
                <Pocket left="2%" top="98%" />
                <Pocket left="98%" top="98%" />

                {/* STRAIGHT TRAJECTORY */}

                <div
                  className="pointer-events-none absolute z-10 h-[5px] origin-left rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
                  style={{
                    left: `${striker.x}%`,
                    top: `${striker.y}%`,
                    width: `${distance}%`,
                    transform: `rotate(${angle}deg)`,
                  }}
                />

                {/* TARGET HIGHLIGHT */}

                {targetHighlight && (
                  <div
                    className="pointer-events-none absolute z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      boxShadow:
                        "0 0 20px rgba(34,211,238,0.8)",
                    }}
                  />
                )}

                {/* STRIKER */}

                <div
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    event.currentTarget.setPointerCapture(
                      event.pointerId
                    );
                    setDragging("striker");
                  }}
                  className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none flex-col items-center active:cursor-grabbing"
                  style={{
                    left: `${striker.x}%`,
                    top: `${striker.y}%`,
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)]">
                    <div className="h-5 w-5 rounded-full bg-cyan-400" />
                  </div>

                  <span className="mt-2 rounded-full bg-black/80 px-2 py-1 text-[9px] font-bold">
                    STRIKER
                  </span>
                </div>

                {/* TARGET */}

                <div
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    event.currentTarget.setPointerCapture(
                      event.pointerId
                    );
                    setDragging("target");
                  }}
                  className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none flex-col items-center active:cursor-grabbing"
                  style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-slate-700 bg-[#111827] shadow-[0_0_25px_rgba(34,211,238,0.55)]">
                    <div className="h-5 w-5 rounded-full bg-cyan-300" />
                  </div>

                  <span className="mt-2 rounded-full bg-black/80 px-2 py-1 text-[9px] font-bold">
                    TARGET
                  </span>
                </div>

              </div>
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

            {/* STRIKER */}

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">
                  Striker
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  {striker.x.toFixed(0)}%, {striker.y.toFixed(0)}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Drag the striker on the board.
              </p>
            </div>

            {/* TARGET */}

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">
                  Target
                </span>

                <span className="text-xs font-bold text-cyan-300">
                  {target.x.toFixed(0)}%, {target.y.toFixed(0)}%
                </span>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                Drag the target on the board.
              </p>
            </div>

            {/* CALCULATIONS */}

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
                  {distance.toFixed(1)}%
                </span>
              </div>

            </div>

            {/* TRAJECTORY COLOR */}

            <div className="mt-6">
              <p className="mb-3 text-xs text-slate-400">
                Trajectory Color
              </p>

              <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
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
                directly on the board.
              </p>
            </div>

          </aside>
        </section>

      </div>
    </main>
  );
}

function Pocket({
  left,
  top,
}: {
  left: string;
  top: string;
}) {
  return (
    <div
      className="pointer-events-none absolute z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#090604] shadow-[inset_0_0_15px_rgba(0,0,0,1)]"
      style={{
        left,
        top,
      }}
    />
  );
                  }
