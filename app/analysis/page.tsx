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

  const [dragging, setDragging] = useState<
    "striker" | "target" | null
  >(null);

  const [showBounce, setShowBounce] = useState(true);
  const [showTarget, setShowTarget] = useState(true);
  const [trajectoryColor, setTrajectoryColor] =
    useState("#22d3ee");

  const movePiece = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging || !boardRef.current) return;

    const rect =
      boardRef.current.getBoundingClientRect();

    let x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    let y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    x = Math.max(7, Math.min(93, x));
    y = Math.max(7, Math.min(93, y));

    if (dragging === "striker") {
      setStriker({ x, y });
    }

    if (dragging === "target") {
      setTarget({ x, y });
    }
  };

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const angle = Math.round(
    Math.atan2(dy, dx) * (180 / Math.PI)
  );

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );

  const resetBoard = () => {
    setStriker({
      x: 25,
      y: 70,
    });

    setTarget({
      x: 62,
      y: 35,
    });

    setShowBounce(true);
    setShowTarget(true);
    setTrajectoryColor("#22d3ee");
  };

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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
          >
            Back to Home
          </a>

        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* BOARD */}

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 md:p-6">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

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

            <div
              ref={boardRef}
              onPointerMove={movePiece}
              onPointerUp={() =>
                setDragging(null)
              }
              onPointerLeave={() =>
                setDragging(null)
              }
              onPointerCancel={() =>
                setDragging(null)
              }
              className="relative mx-auto aspect-square w-full max-w-[700px] touch-none rounded-[2rem] border-[12px] border-[#70451f] bg-[#d6a35f] p-[6%] shadow-2xl"
            >

              <div className="relative h-full w-full overflow-hidden rounded-xl border-[4px] border-[#432514] bg-[#c99352]">

                {/* Board decorations */}

                <div className="pointer-events-none absolute inset-[8%] rounded-full border-2 border-[#70451f]/30" />

                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#70451f]/10" />

                <div className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#70451f]/10" />

                <Pocket className="left-[-6%] top-[-6%]" />
                <Pocket className="right-[-6%] top-[-6%]" />
                <Pocket className="bottom-[-6%] left-[-6%]" />
                <Pocket className="bottom-[-6%] right-[-6%]" />

                {/* Trajectory */}

                <Trajectory
                  striker={striker}
                  target={target}
                  color={trajectoryColor}
                />

                {/* Target highlight */}

                {showTarget && (
                  <div
                    className="pointer-events-none absolute z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      borderColor:
                        trajectoryColor,
                      boxShadow:
                        `0 0 20px ${trajectoryColor}`,
                    }}
                  />
                )}

                {/* Bounce guide */}

                {showBounce && (
                  <BounceGuide
                    target={target}
                    color={trajectoryColor}
                  />
                )}

                {/* Striker */}

                <Piece
                  point={striker}
                  label="STRIKER"
                  type="striker"
                  onStart={() =>
                    setDragging("striker")
                  }
                />

                {/* Target */}

                <Piece
                  point={target}
                  label="TARGET"
                  type="target"
                  onStart={() =>
                    setDragging("target")
                  }
                />

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

            <div className="mt-6 space-y-3">

              <InfoCard
                title="Striker"
                x={striker.x}
                y={striker.y}
              />

              <InfoCard
                title="Target"
                x={target.x}
                y={target.y}
              />

            </div>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

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

            {/* COLORS */}

            <div className="mt-6">

              <p className="mb-3 text-xs text-slate-400">
                Trajectory Color
              </p>

              <div className="flex gap-2">

                {[
                  "#22d3ee",
                  "#3b82f6",
                  "#22c55e",
                  "#facc15",
                  "#ec4899",
                ].map((color) => (

                  <button
                    key={color}
                    onClick={() =>
                      setTrajectoryColor(color)
                    }
                    className="h-9 w-9 rounded-full border-2 border-white/20 transition hover:scale-110"
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        trajectoryColor === color
                          ? `0 0 15px ${color}`
                          : "none",
                    }}
                    aria-label="Trajectory color"
                  />

                ))}

              </div>

            </div>

            {/* TOGGLES */}

            <div className="mt-6 space-y-3">

              <Toggle
                label="Bounce Path"
                enabled={showBounce}
                onClick={() =>
                  setShowBounce(!showBounce)
                }
              />

              <Toggle
                label="Target Highlight"
                enabled={showTarget}
                onClick={() =>
                  setShowTarget(!showTarget)
                }
              />

            </div>

            <button
              onClick={resetBoard}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold shadow-lg shadow-cyan-500/10 hover:scale-[1.01]"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

              <p className="text-xs font-semibold text-cyan-300">
                Interactive Mode
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Touch and drag the white STRIKER or
                dark TARGET directly on the board.
              </p>

            </div>

          </aside>

        </section>

      </div>

    </main>
  );
}

/* ---------------- PIECE ---------------- */

function Piece({
  point,
  label,
  type,
  onStart,
}: {
  point: Point;
  label: string;
  type: "striker" | "target";
  onStart: () => void;
}) {
  return (
    <div
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onStart();
      }}
      className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 cursor-grab flex-col items-center active:cursor-grabbing"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
      }}
    >

      <div
        className={`relative h-12 w-12 rounded-full border-4 shadow-2xl ${
          type === "striker"
            ? "border-white bg-white"
            : "border-slate-800 bg-[#111827]"
        }`}
      >

        <div
          className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            type === "striker"
              ? "bg-cyan-400"
              : "bg-cyan-300"
          }`}
        />

      </div>

      <span className="mt-2 rounded-full bg-black/70 px-2 py-1 text-[8px] font-bold tracking-wider text-white backdrop-blur">
        {label}
      </span>

    </div>
  );
}

/* ---------------- TRAJECTORY ---------------- */

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

  const length = Math.sqrt(
    dx * dx + dy * dy
  );

  const angle =
    Math.atan2(dy, dx) *
    (180 / Math.PI);

  return (
    <div
      className="pointer-events-none absolute z-20 h-[4px] origin-left rounded-full"
      style={{
        left: `${striker.x}%`,
        top: `${striker.y}%`,
        width: `${length}%`,
        backgroundColor: color,
        boxShadow: `0 0 14px ${color}`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rotate-45"
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
}

/* ---------------- BOUNCE ---------------- */

function BounceGuide({
  target,
  color,
}: {
  target: Point;
  color: string;
}) {
  return (
    <div
      className="pointer-events-none absolute z-10 h-[3px] origin-left border-t-2 border-dashed"
      style={{
        left: `${target.x}%`,
        top: `${target.y}%`,
        width: "25%",
        borderColor: color,
        transform:
          "rotate(-42deg)",
        filter:
          `drop-shadow(0 0 5px ${color})`,
      }}
    />
  );
}

/* ---------------- POCKET ---------------- */

function Pocket({
  className,
}: {
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-5 h-14 w-14 rounded-full bg-[#0b0806] shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] ${className}`}
    />
  );
}

/* ---------------- INFO CARD ---------------- */

function InfoCard({
  title,
  x,
  y,
}: {
  title: string;
  x: number;
  y: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center justify-between">

        <span className="text-sm font-semibold">
          {title}
        </span>

        <span className="text-xs font-bold text-cyan-300">
          {x.toFixed(0)}%, {y.toFixed(0)}%
        </span>

      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Drag the {title.toLowerCase()} on the board.
      </p>

    </div>
  );
}

/* ---------------- TOGGLE ---------------- */

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
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
    >

      <span>{label}</span>

      <span
        className={
          enabled
            ? "font-bold text-cyan-300"
            : "font-bold text-slate-600"
        }
      >
        {enabled ? "ON" : "OFF"}
      </span>

    </button>
  );
          }
