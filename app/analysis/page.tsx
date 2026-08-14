"use client";

import { PointerEvent, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

export default function AnalysisPage() {
  const boardRef = useRef<HTMLDivElement>(null);

  const [striker, setStriker] = useState<Point>({
    x: 25,
    y: 70,
  });

  const [target, setTarget] = useState<Point>({
    x: 62,
    y: 35,
  });

  const [dragging, setDragging] = useState<"striker" | "target" | null>(
    null
  );

  const [lineColor, setLineColor] = useState("#22d3ee");
  const [showBounce, setShowBounce] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();

    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;

    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));

    if (dragging === "striker") {
      setStriker({ x, y });
    } else {
      setTarget({ x, y });
    }
  };

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.round(
    Math.atan2(dy, dx) * (180 / Math.PI)
  );

  const resetBoard = () => {
    setStriker({ x: 25, y: 70 });
    setTarget({ x: 62, y: 35 });
    setLineColor("#22d3ee");
    setShowBounce(true);
    setShowTarget(true);
  };

  return (
    <main className="min-h-screen bg-[#050812] px-4 py-5 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:p-6">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  Interactive Analysis Board
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Drag the striker and target directly on the board.
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                ENGINE READY
              </div>
            </div>

            <div
              ref={boardRef}
              onPointerMove={updatePosition}
              onPointerUp={() => setDragging(null)}
              onPointerCancel={() => setDragging(null)}
              className="relative mx-auto aspect-square w-full max-w-[700px] touch-none rounded-[2rem] border-[10px] border-[#74451f] bg-[#d5a263] p-[7%] shadow-2xl"
            >

              <div className="relative h-full w-full overflow-hidden border-[3px] border-[#4b2b18] bg-[#c99254]">

                <div className="absolute left-1/2 top-0 h-full w-px bg-[#4b2b18]/10" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-[#4b2b18]/10" />

                <Pocket className="left-[-7%] top-[-7%]" />
                <Pocket className="right-[-7%] top-[-7%]" />
                <Pocket className="bottom-[-7%] left-[-7%]" />
                <Pocket className="bottom-[-7%] right-[-7%]" />

                {showTarget && (
                  <div
                    className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      borderColor: lineColor,
                    }}
                  />
                )}

                <Trajectory
                  striker={striker}
                  target={target}
                  color={lineColor}
                />

                {showBounce && (
                  <BouncePath
                    target={target}
                    color={lineColor}
                  />
                )}

                <DraggablePiece
                  label="STRIKER"
                  point={striker}
                  color="white"
                  onPointerDown={() => setDragging("striker")}
                />

                <DraggablePiece
                  label="TARGET"
                  point={target}
                  color="#111827"
                  onPointerDown={() => setDragging("target")}
                />

              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Controls
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Shot Configuration
            </h2>

            <div className="mt-6 space-y-4">

              <PositionCard
                title="Striker"
                point={striker}
              />

              <PositionCard
                title="Target"
                point={target}
              />

            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Calculated Angle
                </span>

                <span className="text-sm font-bold text-cyan-300">
                  {angle}°
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Shot Distance
                </span>

                <span className="text-sm font-bold text-cyan-300">
                  {distance.toFixed(1)}%
                </span>
              </div>

            </div>

            <div className="mt-6">

              <p className="mb-3 text-xs text-slate-400">
                Trajectory Color
              </p>

              <div className="grid grid-cols-5 gap-2">
                {[
                  "#22d3ee",
                  "#3b82f6",
                  "#22c55e",
                  "#facc15",
                  "#ec4899",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => setLineColor(color)}
                    className="h-9 rounded-xl border border-white/10 transition hover:scale-105"
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        lineColor === color
                          ? `0 0 15px ${color}`
                          : "none",
                    }}
                  />
                ))}
              </div>

            </div>

            <div className="mt-6 space-y-3">

              <Toggle
                label="Bounce Path"
                enabled={showBounce}
                onClick={() => setShowBounce(!showBounce)}
              />

              <Toggle
                label="Target Highlight"
                enabled={showTarget}
                onClick={() => setShowTarget(!showTarget)}
              />

            </div>

            <button
              onClick={resetBoard}
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

              <p className="text-xs font-semibold text-cyan-300">
                Interactive Mode
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Drag the white striker or dark target directly on the board
                to update the trajectory.
              </p>

            </div>

          </aside>
        </section>
      </div>
    </main>
  );
}

function DraggablePiece({
  label,
  point,
  color,
  onPointerDown,
}: {
  label: string;
  point: Point;
  color: string;
  onPointerDown: () => void;
}) {
  return (
    <>
      <div
        onPointerDown={(event) => {
          event.preventDefault();
          onPointerDown();
        }}
        className="absolute z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-xl active:cursor-grabbing"
        style={{
          left: `${point.x}%`,
          top: `${point.y}%`,
          backgroundColor: color,
        }}
      />

      <div
        className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-2 py-1 text-[8px] text-white backdrop-blur"
        style={{
          left: `${point.x}%`,
          top: `${Math.min(point.y + 7, 92)}%`,
        }}
      >
        {label}
      </div>
    </>
  );
}

function Trajectory({
  striker,
  target,
  color,
}: {
  striker: Point;
  target: Point;
  color: string;
}) {
  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const length = Math.sqrt(dx * dx + dy * dy);

  const rotation =
    Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="pointer-events-none absolute z-10 h-[3px] origin-left"
      style={{
        left: `${striker.x}%`,
        top: `${striker.y}%`,
        width: `${length}%`,
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function BouncePath({
  target,
  color,
}: {
  target: Point;
  color: string;
}) {
  return (
    <div
      className="pointer-events-none absolute z-10 h-[2px] origin-left"
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        width: "25%",
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
        transform: "rotate(-42deg)",
      }}
    />
  );
}

function Pocket({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-12 w-12 rounded-full bg-[#17110d] shadow-[inset_0_0_14px_rgba(0,0,0,0.9)] ${className}`}
    />
  );
}

function PositionCard({
  title,
  point,
}: {
  title: string;
  point: Point;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">
          {title}
        </span>

        <span className="text-xs text-cyan-300">
          {point.x.toFixed(0)}%, {point.y.toFixed(0)}%
        </span>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Drag the {title.toLowerCase()} on the board.
      </p>

    </div>
  );
}

function Toggle({
  label,
  enabled,
  onClick,
}: {
  label: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-white/10"
    >
      <span>{label}</span>

      <span
        className={
          enabled
            ? "text-cyan-300"
            : "text-slate-600"
        }
      >
        {enabled ? "ON" : "OFF"}
      </span>
    </button>
  );
          }
