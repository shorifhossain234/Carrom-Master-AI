"use client";

import { useState } from "react";

const colors = [
  { name: "Cyan", value: "#22d3ee" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#facc15" },
  { name: "Pink", value: "#ec4899" },
];

export default function AnalysisPage() {
  const [lineColor, setLineColor] = useState("#22d3ee");
  const [showBounce, setShowBounce] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

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
          </div>

          <a
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Back to Home
          </a>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl backdrop-blur-xl md:p-6">

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  Analysis Board
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Configure the board and preview trajectory guides.
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                Ready
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[680px] rounded-[2rem] border-[10px] border-[#7a4a25] bg-[#d7a66a] p-[7%] shadow-2xl">

              <div className="relative h-full w-full border-[3px] border-[#4b2b18] bg-[#c99254]">

                <div className="absolute left-1/2 top-0 h-full w-px bg-[#5a351d]/20" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-[#5a351d]/20" />

                <Pocket className="left-[-6%] top-[-6%]" />
                <Pocket className="right-[-6%] top-[-6%]" />
                <Pocket className="bottom-[-6%] left-[-6%]" />
                <Pocket className="bottom-[-6%] right-[-6%]" />

                <div
                  className="absolute left-[25%] top-[57%] h-7 w-7 rounded-full border-2 border-white/80 bg-white shadow-lg"
                  title="Striker"
                />

                <div
                  className="absolute left-[58%] top-[37%] h-7 w-7 rounded-full border-2 border-black/30 bg-black shadow-lg"
                  title="Target coin"
                />

                <div
                  className="absolute left-[50%] top-[48%] h-7 w-7 rounded-full border-2 border-red-500/70 bg-red-500 shadow-lg"
                  title="Coin"
                />

                {showTarget && (
                  <div
                    className="absolute left-[58%] top-[37%] h-14 w-14 -translate-x-[13%] -translate-y-[13%] rounded-full border-2 border-dashed opacity-80"
                    style={{ borderColor: lineColor }}
                  />
                )}

                <div
                  className="absolute left-[27%] top-[59%] h-[2px] w-[35%] origin-left"
                  style={{
                    backgroundColor: lineColor,
                    boxShadow: `0 0 10px ${lineColor}`,
                    transform: "rotate(-31deg)",
                  }}
                />

                {showBounce && (
                  <div
                    className="absolute left-[58%] top-[37%] h-[2px] w-[31%] origin-left"
                    style={{
                      backgroundColor: lineColor,
                      boxShadow: `0 0 10px ${lineColor}`,
                      transform: "rotate(-43deg)",
                    }}
                  />
                )}

                <div
                  className="absolute left-[20%] bottom-[8%] rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[9px] text-white/80 backdrop-blur"
                >
                  STRIKER
                </div>

                <div
                  className="absolute right-[16%] top-[25%] rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[9px] text-white/80 backdrop-blur"
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
              Guide Settings
            </h2>

            <div className="mt-6">
              <p className="mb-3 text-xs text-slate-400">
                Trajectory Color
              </p>

              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setLineColor(color.value)}
                    className="h-10 rounded-xl border border-white/10 transition hover:scale-105"
                    style={{
                      backgroundColor: color.value,
                      boxShadow:
                        lineColor === color.value
                          ? `0 0 15px ${color.value}`
                          : "none",
                    }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mt-7 space-y-3">

              <button
                onClick={() => setShowBounce(!showBounce)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                Bounce Path
                <span className={showBounce ? "text-cyan-300" : "text-slate-600"}>
                  {showBounce ? "ON" : "OFF"}
                </span>
              </button>

              <button
                onClick={() => setShowTarget(!showTarget)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                Target Highlight
                <span className={showTarget ? "text-cyan-300" : "text-slate-600"}>
                  {showTarget ? "ON" : "OFF"}
                </span>
              </button>

            </div>

            <div className="mt-7 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
              <p className="text-xs font-semibold text-cyan-300">
                Analysis Status
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Board preview is ready. Advanced position detection and
                trajectory calculation will be added in later stages.
              </p>
            </div>

          </aside>
        </section>

      </div>
    </main>
  );
}

function Pocket({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-12 w-12 rounded-full bg-[#17110d] shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] ${className}`}
    />
  );
}
