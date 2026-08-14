"use client";

import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState("Analysis");

  const menuItems = [
    { name: "Analysis", icon: "◈" },
    { name: "Practice", icon: "◉" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <main className="min-h-screen bg-[#050812] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6 md:px-8">

        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold shadow-lg shadow-cyan-500/20">
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

        <section className="grid flex-1 gap-6 py-8 lg:grid-cols-[240px_1fr]">

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
            <p className="px-3 pb-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Control Center
            </p>

            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    active === item.name
                      ? "bg-blue-500/15 text-cyan-300 ring-1 ring-cyan-400/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-4">
              <p className="text-xs font-semibold text-white">
                Analysis Engine
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Board analysis and trajectory visualization system.
              </p>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready
              </div>
            </div>
          </aside>

          <div className="flex flex-col gap-6">

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.025] to-cyan-400/5 p-6 md:p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />

              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Smart Trajectory System
                </div>

                <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                  Analyze every shot
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    with precision.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                  Set up your board, define the striker and target positions,
                  then visualize possible shot paths and bounce trajectories.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActive("Analysis")}
                    className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold shadow-xl shadow-blue-500/20 transition hover:scale-[1.02]"
                  >
                    Start Analysis
                  </button>

                  <button
                    onClick={() => setActive("Practice")}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    Practice Mode
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 text-cyan-300">◈</div>
                <p className="text-sm font-semibold">Board Setup</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Configure board and pocket positions.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 text-blue-400">⌁</div>
                <p className="text-sm font-semibold">Trajectory</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Visualize direct and reflected paths.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 text-emerald-400">✓</div>
                <p className="text-sm font-semibold">Precision</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Fine-tune your analysis controls.
                </p>
              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Current Mode</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {active} workspace selected
                  </p>
                </div>

                <div className="rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs text-blue-300">
                  {active}
                </div>
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
