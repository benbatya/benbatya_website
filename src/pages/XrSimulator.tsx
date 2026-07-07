import {Link} from 'react-router-dom';
import {ArrowRight, Clock, Layers, Users, Monitor} from 'lucide-react';

const stats = [
  {icon: Clock, value: 'Up to 50%', label: 'Reduction in iteration time for headset projects'},
  {icon: Layers, value: '4 APIs', label: 'Unified rendering: Metal, Vulkan, DX11 & DX12'},
  {icon: Users, value: '8+', label: 'Junior engineers mentored on the team'},
];

const highlights = [
  {
    title: 'A headset on your desktop',
    body: 'XrSim emulates Meta headset behavior on a developer workstation, so XR apps can be run, inspected, and debugged without repeatedly donning and doffing hardware. That single change removes the biggest source of friction in the XR inner loop.',
  },
  {
    title: 'One app, four graphics backends',
    body: 'I architected an integrated rendering layer that presents a consistent surface across Metal, Vulkan, DirectX 11, and DirectX 12. Developers on macOS and Windows get the same simulator experience regardless of the graphics API their engine targets.',
  },
  {
    title: 'Built for the inner loop',
    body: 'The simulator is optimized for fast startup and tight edit-run-inspect cycles. Shaving minutes off every iteration compounds across a team into a dramatically faster path from idea to working XR experience.',
  },
];

export default function XrSimulator() {
  return (
    <article>
      {/* Hero */}
      <header className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
            Case study · Meta Platforms · 2021–2026
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Meta XR Simulator
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            I led development of XrSim, the tool that lets developers run and debug extended-reality
            apps directly on a desktop — no headset required — cutting XR iteration time by up to half.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['C++', 'OpenXR', 'Vulkan', 'Metal', 'DirectX 11/12'].map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                <stat.icon size={22} />
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-6">
          <div className="hidden sm:grid h-11 w-11 place-items-center rounded-xl bg-accent-400 text-[#0a0b0d]">
            <Monitor size={22} />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white">The problem</h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              XR development has a punishing inner loop. Every change means building, deploying to a
              headset, putting the device on, reproducing the scenario, then taking it back off to
              edit code. Multiplied across a day — and across a whole team — that overhead is where
              XR projects lose their momentum.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="font-display text-2xl font-bold text-white">What I built</h2>
        <div className="mt-8 space-y-8">
          {highlights.map((h, i) => (
            <div key={h.title} className="flex gap-5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-400 font-mono text-sm font-bold text-[#0a0b0d]">
                {i + 1}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="font-display text-2xl font-bold text-white">Impact</h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            By moving the XR inner loop onto the desktop and unifying rendering across every major
            graphics API, XrSim made XR development feel like ordinary app development. Iteration
            time for headset projects dropped by up to 50%, and I mentored a growing team of
            engineers through the design and code reviews that kept the simulator dependable as it
            scaled.
          </p>
        </div>
      </section>

      {/* Next */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <Link to="/experience" className="text-sm font-semibold text-slate-400 hover:text-white">
            ← Back to experience
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-2.5 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-accent-300"
          >
            Work with me <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </article>
  );
}
