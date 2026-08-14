"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050812] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 md:px-8">

        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold shadow-lg shadow-cyan-500/20">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Carrom Master AI
              </h1>
              <p className="text-xs text-slate-400">
                Professional Carrom Analysis
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-300 md:flex">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/70" />
            System Ready
          </div>
        </header>

        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr]">

          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Smart Trajectory System
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Analyze every shot
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                with precision.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
              Configure your Carrom board, identify the striker and target,
              and visualize possible direct and bounce trajectories through
              a professional analysis interface.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/analysis"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold shadow-xl shadow-blue-500/20 transition hover:scale-[1.02]"
              >
                Start Analysis
              </Link>

              <Link
                href="/analysis"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Practice Mode
              </Link>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <Feature
                title="Board Setup"
                text="Configure board and pocket positions."
                icon="◈"
              />

              <Feature
                title="Trajectory"
                text="Visualize direct and reflected paths."
                icon="⌁"
              />

              <Feature
                title="Precision"
                text="Fine-tune analysis controls."
                icon="✓"
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl">

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Board Preview</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Analysis ready
                  </p>
                </div>

                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] text-emerald-400">
                  READY
                </div>
              </div>

              <div className="relative aspect-square rounded-[1.5rem] border-[8px] border-[#70421f] bg-[#d5a263] p-[7%] shadow-2xl">

                <div className="relative h-full w-full border-[3px] border-[#4b2b18] bg-[#c99254]">

                  <Pocket className="left-[-7%] top-[-7%]" />
                  <Pocket className="right-[-7%] top-[-7%]" />
                  <Pocket className="bottom-[-7%] left-[-7%]" />
                  <Pocket className="bottom-[-7%] right-[-7%]" />

                  <div
                    className="absolute left-[24%] top-[58%] h-7 w-7 rounded-full border-2 border-white bg-white shadow-lg"
                    title="Striker"
                  />

                  <div
                    className="absolute left-[58%] top-[37%] h-7 w-7 rounded-full border-2 border-black/30 bg-black shadow-lg"
                    title="Target"
                  />

                  <div
                    className="absolute left-[48%] top-[49%] h-7 w-7 rounded-full border-2 border-red-500/50 bg-red-500 shadow-lg"
                    title="Coin"
                  />

                  <div
                    className="absolute left-[27%] top-[59%] h-[2px] w-[38%] origin-left bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                    style={{ transform: "rotate(-31deg)" }}
                  />

                  <div
                    className="absolute left-[58%] top-[37%] h-[2px] w-[30%] origin-left bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                    style={{ transform: "rotate(-43deg)" }}
                  />

                  <div className="absolute bottom-[8%] left-[12%] rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[9px] text-white/80">
                    STRIKER
                  </div>

                  <div className="absolute right-[10%] top-[24%] rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[9px] text-white/80">
                    TARGET
                  </div>

                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3">
                <span className="text-xs text-slate-400">
                  Trajectory Engine
                </span>

                <span className="text-xs font-semibold text-cyan-300">
                  Online
                </span>
              </div>

            </div>
          </div>

        </section>

        <footer className="border-t border-white/10 pt-5 text-center text-[10px] text-slate-600">
          Carrom Master AI • Professional Analysis Interface
        </footer>

      </div>
    </main>
  );
}

function Feature({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-3 text-cyan-300">{icon}</div>

      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function Pocket({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-11 w-11 rounded-full bg-[#17110d] shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] ${className}`}
    />
  );
}
