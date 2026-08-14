"use client";

import { useMemo, useState } from "react";

export default function AnalysisPage() {
  const [strikerX, setStrikerX] = useState(25);
  const [strikerY, setStrikerY] = useState(70);
  const [targetX, setTargetX] = useState(62);
  const [targetY, setTargetY] = useState(35);
  const [lineColor, setLineColor] = useState("#22d3ee");
  const [showBounce, setShowBounce] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  const angle = useMemo(() => {
    const dx = targetX - strikerX;
    const dy = targetY - strikerY;
    return Math.round(Math.atan2(dy, dx) * (180 / Math.PI));
  }, [strikerX, strikerY, targetX, targetY]);

  const resetBoard = () => {
    setStrikerX(25);
    setStrikerY(70);
    setTargetX(62);
    setTargetY(35);
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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur-xl md:p-6">

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  Analysis Board
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Adjust positions and preview the shot path.
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                ENGINE READY
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[700px] rounded-[2rem] border-[10px] border-[#74451f] bg-[#d5a263] p-[7%] shadow-2xl">

              <div className="relative h-full w-full overflow-hidden border-[3px] border-[#4b2b18] bg-[#c99254]">

                <div className="absolute left-1/2 top-0 h-full w-px bg-[#4b2b18]/10" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-[#4b2b18]/10" />

                <Pocket className="left-[-7%] top-[-7%]" />
                <Pocket className="right-[-7%] top-[-7%]" />
                <Pocket className="bottom-[-7%] left-[-7%]" />
                <Pocket className="bottom-[-7%] right-[-7%]" />

                {showTarget && (
                  <div
                    className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
                    style={{
                      left: `${targetX}%`,
                      top: `${targetY}%`,
                      borderColor: lineColor,
                    }}
                  />
                )}

                <div
                  className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-lg shadow-white/30"
                  style={{
                    left: `${strikerX}%`,
                    top: `${strikerY}%`,
                  }}
                />

                <div
                  className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/30 bg-black shadow-lg"
                  style={{
                    left: `${targetX}%`,
                    top: `${targetY}%`,
                  }}
                />

                <div
                  className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-300/60 bg-red-500 shadow-lg shadow-red-500/30"
                  style={{
                    left: `${(targetX + 7) % 90}%`,
                    top: `${(targetY + 10) % 85}%`,
                  }}
                />

                <TrajectoryLine
                  strikerX={strikerX}
                  strikerY={strikerY}
                  targetX={targetX}
                  targetY={targetY}
                  color={lineColor}
                />

                {showBounce && (
                  <BounceLine
                    targetX={targetX}
                    targetY={targetY}
                    color={lineColor}
                  />
                )}

                <div
                  className="absolute -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] text-white/80 backdrop-blur"
                  style={{
                    left: `${strikerX}%`,
                    top: `${Math.min(strikerY + 7, 92)}%`,
                  }}
                >
                  STRIKER
                </div>

                <div
                  className="absolute -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] text-white/80 backdrop-blur"
                  style={{
                    left: `${targetX}%`,
                    top: `${Math.max(targetY - 10, 4)}%`,
                  }}
                >
                  TARGET
                </div>

              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">

            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Controls
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              Shot Configuration
            </h2>

            <div className="mt-6 space-y-5">

              <Control
                label="Striker X"
                value={strikerX}
                onChange={setStrikerX}
              />

              <Control
                label="Striker Y"
                value={strikerY}
                onChange={setStrikerY}
              />

              <Control
                label="Target X"
                value={targetX}
                onChange={setTargetX}
              />

              <Control
                label="Target Y"
                value={targetY}
                onChange={setTargetY}
              />

            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Calculated Angle
                </span>

                <span className="text-sm font-bold text-cyan-300">
                  {angle}°
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
                    aria-label={`Set trajectory color ${color}`}
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
              className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Reset Board
            </button>

            <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
              <p className="text-xs font-semibold text-amber-300">
                Development Mode
              </p>

              <p className="mt-2 text-[11px] leading-5 text-slate-500">
                Position controls and trajectory visualization are currently
                running as an interface prototype.
              </p>
            </div>

          </aside>
        </section>
      </div>
    </main>
  );
}

function Control({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {label}
        </span>

        <span className="text-xs font-semibold text-cyan-300">
          {value}%
        </span>
      </div>

      <input
        type="range"
        min="5"
        max="95"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-cyan-400"
      />
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
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
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

function Pocket({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-12 w-12 rounded-full bg-[#17110d] shadow-[inset_0_0_14px_rgba(0,0,0,0.9)] ${className}`}
    />
  );
}

function TrajectoryLine({
  strikerX,
  strikerY,
  targetX,
  targetY,
  color,
}: {
  strikerX: number;
  strikerY: number;
  targetX: number;
  targetY: number;
  color: string;
}) {
  const dx = targetX - strikerX;
  const dy = targetY - strikerY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="absolute h-[3px] origin-left"
      style={{
        left: `${strikerX}%`,
        top: `${strikerY}%`,
        width: `${length}%`,
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function BounceLine({
  targetX,
  targetY,
  color,
}: {
  targetX: number;
  targetY: number;
  color: string;
}) {
  return (
    <div
      className="absolute h-[2px] origin-left"
      style={{
        left: `${targetX}%`,
        top: `${targetY}%`,
        width: "28%",
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
        transform: "rotate(-42deg)",
      }}
    />
  );
}
