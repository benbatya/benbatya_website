import {Link} from 'react-router-dom';
import {ArrowRight, Clock, Layers, Users, Monitor, ExternalLink, HandFist, Hammer} from 'lucide-react';

const stats = [
  {icon: Clock, value: 'Up to 50%', label: 'Reduction in iteration time for headset projects'},
  {icon: Layers, value: '4 APIs', label: 'Unified rendering: Metal, Vulkan, DX11 & DX12'},
  {icon: Users, value: '~9,000', label: 'Monthly active developers using the simulator'},
];

interface Highlight {
  title: string;
  body: string;
}

const highlights: Highlight[] = [
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
  {
    title: 'Meets developers in their engine',
    body: 'Beyond the core runtime, I built OpenXR integrations for Unity and Unreal and supported Godot and the Android Studio plugin, so teams could drive the simulator directly from the engine and tools they already worked in.',
  },
  {
    title: 'Faithful controller input forwarding',
    body: 'Input Forwarding let developers connect a physical pair of controllers and drive the simulated controllers directly, for fine-grained input testing. Wave a real controller and its simulated counterpart waves inside the scene — every degree of freedom for movement and rotation, along with button presses, was transmitted faithfully end to end.',
  },
  {
    title: 'Synthetic environments to test against',
    body: 'The Synthetic Environment Server let developers test their extended-reality apps across a variety of simulated rooms — serving passthrough, scene geometry, spatial anchors, and depth from a virtual space. Hero rooms like a living room, an office/bedroom, and a game room covered the everyday layouts developers designed for.',
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
            Meta Simulators
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            I led development of Meta's desktop simulators — the XR Simulator and the Spatial
            Simulator — a pair of tools designed to help developers iterate on and debug
            extended-reality apps directly on the desktop, no headset required.
          </p>
          <h2 className="mt-8 font-display text-xl font-semibold text-white">
            XR Simulator
          </h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-400">
            The Meta XR Simulator cut iteration time for headset projects by up to half and grew to
            nearly 9,000 monthly active developers, with OpenXR integrations that let teams build on
            it directly from the Unity, Unreal, and Godot game engines.
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
          <a
            href="https://developers.meta.com/horizon/documentation/unity/xrsim-intro/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-400"
          >
            Explore Meta XR Simulator <ExternalLink size={15} />
          </a>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-6">
            <div className="hidden sm:grid h-11 w-11 place-items-center rounded-xl bg-accent-400 text-[#0a0b0d]">
              <Monitor size={22} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">The problem</h2>
              <p className="mt-3 leading-relaxed text-slate-400">
                XR development has a punishing inner loop. Every change means building, deploying to
                a headset, putting the device on, reproducing the scenario, then taking it back off
                to edit code. Multiplied across a day — and across a whole team — that overhead is
                where XR projects lose their momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-6">
            <div className="hidden sm:grid h-11 w-11 place-items-center rounded-xl bg-accent-400 text-[#0a0b0d]">
              <HandFist size={22} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Impact</h2>
              <p className="mt-3 leading-relaxed text-slate-400">
                By moving the XR inner loop onto the desktop and unifying rendering across every
                major graphics API, XrSim made XR development feel like ordinary app development.
                Iteration time for headset projects dropped by up to 50% for a tool that reached
                nearly 9,000 monthly active developers, and I mentored 8+ engineers through the
                design and code reviews that kept the simulator dependable as it scaled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-400 text-[#0a0b0d]">
              <Hammer size={22} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">What I built</h2>
          </div>
          <ul className="mt-8 space-y-6">
            {highlights.map((h) => (
              <li key={h.title} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-white">{h.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-400">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Spatial Simulator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="font-display text-2xl font-bold text-white">Spatial Simulator</h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            Spatial apps are Android apps, and the Android application lifecycle is far too complex to
            emulate faithfully on a normal desktop OS. To be useful, the tool had to let developers
            iterate on their work as real Android applications — honoring lifecycle events rather than
            ignoring them — which meant it needed to be a full Android system image running inside a
            virtual-machine container.
          </p>
          <p className="mt-3 leading-relaxed text-slate-400">
            I led the Spatial Simulator to solve exactly that. Running the real Android system image
            in a QEMU virtual-machine container — at native speed — let developers push, run, and
            debug their apps on the Simulator straight from Android Studio, exactly as if they were
            deploying to a connected headset, but with no headset required. It brought the same
            desktop-first iteration loop to Spatial SDK and Platform SDK applications, at the API
            layer.
          </p>
          <p className="mt-3 leading-relaxed text-slate-400">
            It reused the tooling and concepts proven in the XR Simulator, extending that workflow up
            the stack to the full Spatial and Platform SDK surface. A highly stripped-down version —
            without Spatial SDK API support — was later released publicly as part of Meta's Horizon
            developer tooling.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Android system image', 'QEMU', 'Spatial SDK', 'Platform SDK'].map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href="https://developers.meta.com/horizon/documentation/android-apps/spatial-sim-overview/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-400"
          >
            Public Spatial Simulator overview <ExternalLink size={15} />
          </a>
        </div>
      </section>

      {/* Next */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <Link to="/experience" className="text-sm font-semibold text-accent-600 hover:text-accent-400">
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
