import type {LucideIcon} from 'lucide-react';
import {Map, Zap, Sparkles, Github, ExternalLink} from 'lucide-react';

interface CaseStudy {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  /** Lead paragraph. */
  summary: string;
  /** Optional deeper technical paragraph. */
  body?: string;
  highlights: string[];
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
  image?: string;
  imageAlt?: string;
  /** Optional second image, shown after the technical body paragraph. */
  bodyImage?: string;
  bodyImageAlt?: string;
}

const caseStudies: CaseStudy[] = [
  {
    icon: Map,
    eyebrow: 'Graphics · GPU Compute',
    title: 'Rendering OpenStreetMap on the GPU',
    summary:
      'A C++/OpenGL renderer that loads large OpenStreetMap extracts and draws them efficiently by pushing geometry generation onto the GPU. A compute shader extrudes road "ways" into triangulated meshes in parallel, so even large maps render smoothly without a CPU bottleneck.',
    highlights: [
      'Compute shader extrudes OSM ways into triangle meshes directly on the GPU.',
      'Two-stage parsing with libosmium: scan ways first, then load only the nodes they reference — keeping memory low for large extracts.',
      'Clean separation between OSM parsing, GPU compute kernels, and the render pipeline.',
    ],
    tech: ['C++', 'OpenGL', 'GLSL Compute', 'libosmium', 'CMake'],
    repoUrl: 'https://github.com/benbatya/osm_opengl_rendering_example',
    image: '/case-studies/osm-rendering.png',
    imageAlt: 'OpenStreetMap road network rendered by the OpenGL compute-shader pipeline.',
  },
  {
    icon: Zap,
    eyebrow: 'Embedded · Energy Monitoring',
    title: 'Solar Time-of-Use Metering',
    summary:
      'A home energy-monitoring app that logs and displays Time-of-Use statistics for a solar (PV) home. It runs continuously on a Raspberry Pi, polling a Shelly 3EM energy meter over the local network to gather power-usage data for tracking and billing.',
    highlights: [
      'Polls a Shelly 3EM three-phase meter over the LAN for live power readings.',
      'Runs headless on a Raspberry Pi, with start/stop/deploy scripts for continuous operation.',
      'Aggregates consumption into time-of-use buckets for cost tracking and billing.',
    ],
    tech: ['Python', 'TypeScript', 'Raspberry Pi', 'Shelly 3EM'],
    repoUrl: 'https://github.com/benbatya/solar_time_of_use',
  },
  {
    icon: Sparkles,
    eyebrow: 'Rust · WebAssembly · WebGL',
    title: 'Deep-Zoom Fractal Explorer',
    summary:
      'An interactive Julia-set explorer that stays razor-sharp at extreme zoom depths — far beyond where ordinary double-precision math falls apart. The heavy math runs in Rust compiled to WebAssembly, while rendering happens per-pixel on the GPU through WebGL2.',
    body:
      'Precision is the whole game. The view center is stored in arbitrary-precision floats (dashu-float’s DBig), and the working precision scales automatically with zoom depth — roughly 20 digits at the default view, growing past 100 digits at a scale of 1e-100, with extra guard bits to absorb rounding. Each frame, Rust computes a single high-precision "reference orbit" from the center. The GPU then renders every pixel using perturbation theory: rather than iterating each pixel at full precision, the fragment shader tracks only a tiny f32 delta relative to the reference orbit, advancing it with the recurrence deltaᵢ₊₁ = 2·Zᵢ·deltaᵢ + deltaᵢ². Because every visible pixel sits close to the reference, that delta stays comfortably within f32 range no matter how deep you zoom. The orbit is shared with the GPU zero-copy through WASM linear memory, and zoom is cursor-anchored with all coordinate math done in DBig, so sub-pixel accuracy holds at any depth.',
    highlights: [
      'Arbitrary-precision (DBig) center coordinates; working precision scales with zoom depth.',
      'One high-precision reference orbit per frame, computed in Rust/WASM.',
      'GPU perturbation rendering keeps per-pixel iteration in cheap f32 deltas.',
      'Zero-copy orbit sharing via WASM linear memory; cursor-anchored zoom.',
    ],
    tech: ['Rust', 'WebAssembly', 'WebGL2', 'dashu-float'],
    repoUrl: 'https://github.com/benbatya/fractal_vis',
    demoUrl: 'https://benbatya.github.io/fractal_vis/',
    image: '/case-studies/fractal-explorer.jpg',
    imageAlt: 'Deep-zoom Julia set rendered by the explorer, showing smooth-colored fractal detail.',
    bodyImage: '/case-studies/fractal-deep-zoom.png',
    bodyImageAlt: 'A deep zoom into the Julia set, staying sharp at high magnification thanks to arbitrary-precision math.',
  },
];

export default function CaseStudies() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
          Case studies
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Selected engineering deep-dives
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-400">
          A few projects that show how I approach hard performance and precision problems — from
          GPU-driven rendering to arbitrary-precision math in Rust.
        </p>
      </header>

      <div className="mt-12 space-y-8">
        {caseStudies.map((study) => (
          <article
            key={study.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="hidden sm:grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                <study.icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
                  {study.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">{study.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-400">{study.summary}</p>
                {study.image && (
                  <img
                    src={study.image}
                    alt={study.imageAlt}
                    loading="lazy"
                    className="mt-5 w-full rounded-xl border border-white/10 bg-white/5"
                  />
                )}
                {study.body && (
                  <p className="mt-4 leading-relaxed text-slate-400">{study.body}</p>
                )}
                {study.bodyImage && (
                  <img
                    src={study.bodyImage}
                    alt={study.bodyImageAlt}
                    loading="lazy"
                    className="mt-5 w-full rounded-xl border border-white/10 bg-white/5"
                  />
                )}

                <ul className="mt-4 space-y-1.5">
                  {study.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {study.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={study.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-400"
                  >
                    <Github size={16} /> View code
                  </a>
                  {study.demoUrl && (
                    <a
                      href={study.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-400"
                    >
                      <ExternalLink size={15} /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
