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

  const [bounce, setBounce] = useState(true);
  const [highlight, setHighlight] = useState(true);
  const [color, setColor] = useState("#22d3ee");

  function updatePosition(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (!dragging || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();

    let x =
      ((event.clientX - rect.left) / rect.width) * 100;

    let y =
      ((event.clientY - rect.top) / rect.height) * 100;

    x = Math.max(5, Math.min(95, x));
    y = Math.max(5, Math.min(95, y));

    if (dragging === "striker") {
      setStriker({ x, y });
    } else {
      setTarget({ x, y });
    }
  }

  const dx = target.x - striker.x;
  const dy = target.y - striker.y;

  const angle = Math.round(
    Math.atan2(dy, dx) * (180 / Math.PI)
  );

  const distance = Math.sqrt(dx * dx + dy * dy);

  function resetBoard() {
    setStriker({ x: 25, y: 70 });
    setTarget({ x: 62, y: 35 });
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

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Interactive Analysis Board
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Drag the striker and target directly on the board.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                ENGINE READY
              </span>
            </div>

            <div
              ref={boardRef}
              onPointerMove={updatePosition}
              onPointerUp={() => setDragging(null)}
              onPointerCancel={() => setDragging(null)}
              className="relative mx-auto aspect-square w-full max-w-[700px] touch-none rounded-[28px] border-[14px] border-[#633918] bg-[#d6a05c] p-[6%] shadow-2xl"
            >

              <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-[#4a2917] bg-[#c88f4e]">

                {/* Board lines */}

                <div className="pointer-events-none absolute inset-[9%] rounded-full border-2 border-[#70451f]/30" />

                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#70451f]/15" />

                <div className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#70451f]/15" />

                {/* Pockets */}

                <Pocket className="-left-7 -top-7" />
                <Pocket className="-right-7 -top-7" />
                <Pocket className="-bottom-7 -left-7" />
                <Pocket className="-bottom-7 -right-7" />

                {/* Trajectory */}

                <Trajectory
                  striker={striker}
                  target={target}
                  color={color}
                />

                {/* Target highlight */}

                {highlight && (
                  <div
                    className="pointer-events-none absolute z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      borderColor: color,
                      boxShadow: `0 0 20px ${color}`,
                    }}
                  />
                )}

                {/* Bounce */}

                {bounce && (
                  <div
                    className="pointer-events-none absolute z-10 h-[3px] origin-left border-t-2 border-dashed"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      width: "25%",
                      borderColor: color,
                      transform: "rotate(-40deg)",
                    }}
                  />
                )}

                {/* STRIKER */}

                <Piece
                  point={striker}
                  label="STRIKER"
                  dark={false}
                  onStart={() => setDragging("striker")}
                />

                {/* TARGET */}

                <Piece
                  point={target}
                  label="TARGET"
                  dark={true}
                  onStart={() => setDragging("target")}
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

              <Info
                title="Striker"
                point={striker}
              />

              <Info
                title="Target"
                point={target}
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

            {/* COLOR */}

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
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setColor(item)}
                    className="h-9 w-9 rounded-full border-2 border-white/20"
                    style={{
                      backgroundColor: item,
                      boxShadow:
                        color === item
                          ? `0 0 15px ${item}`
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* TOGGLES */}

            <div className="mt-6 space-y-3">

              <Toggle
                name="Bounce Path"
                value={bounce}
                onClick={() => setBounce(!bounce)}
              />

              <Toggle
                name="Target Highlight"
                value={highlight}
                onClick={() => setHighlight(!highlight)}
              />

            </div>

            <button
              onClick={resetBoard}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-bold"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
              <p className="text-xs font-semibold text-cyan-300">
                Interactive Mode
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Touch and drag the white STRIKER or dark TARGET
                on the board.
              </p>
            </div>

          </aside>
        </section>
      </div>
    </main>
  );
}

function Piece({
  point,
  label,
  dark,
  onStart,
}: {
  point: Point;
  label: string;
  dark: boolean;
  onStart: () => void;
}) {
  return (
    <div
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onStart();
      }}
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none active:cursor-grabbing"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
      }}
    >

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border-4 shadow-2xl ${
          dark
            ? "border-slate-700 bg-[#111827]"
            : "border-white bg-white"
        }`}
      >

        <div
          className={`h-4 w-4 rounded-full ${
            dark
              ? "bg-cyan-300"
              : "bg-cyan-500"
          }`}
        />

      </div>

      <div className="mt-2 rounded-full bg-black/80 px-2 py-1 text-center text-[9px] font-bold text-white">
        {label}
      </div>

    </div>
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

  const angle =
    Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="pointer-events-none absolute z-20 h-1 origin-left rounded-full"
      style={{
        left: `${striker.x}%`,
        top: `${striker.y}%`,
        width: `${length}%`,
        backgroundColor: color,
        boxShadow: `0 0 14px ${color}`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

function Pocket({
  className,
}: {
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 h-14 w-14 rounded-full bg-[#080604] shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] ${className}`}
    />
  );
}

function Info({
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

        <span className="text-xs font-bold text-cyan-300">
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
  name,
  value,
  onClick,
}: {
  name: string;
  value: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
    >
      <span>{name}</span>

      <span
        className={
          value
            ? "font-bold text-cyan-300"
            : "font-bold text-slate-600"
        }
      >
        {value ? "ON" : "OFF"}
      </span>
    </button>
  );
                }
