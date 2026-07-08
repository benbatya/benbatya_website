import {Link} from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Cpu,
  Download,
  Boxes,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import {profile, services, projects, skills} from '../data/resume';

const serviceIcons = [Brain, Cpu, Boxes];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" /> Available for consulting
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="whitespace-nowrap">Custom AI engineering,</span>
              <br />
              <span className="text-accent-400">built to empower you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-[#0a0b0d] shadow-sm transition-colors hover:bg-accent-300"
              >
                Start a conversation <ArrowRight size={16} />
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <Download size={16} /> Download résumé
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-accent-600 hover:text-accent-400">
                <Mail size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-accent-600 hover:text-accent-400">
                <Linkedin size={20} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-accent-600 hover:text-accent-400">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-500/25 to-emerald-500/10 blur-2xl" />
              <img
                src={profile.headshotUrl}
                alt={profile.name}
                className="relative aspect-square w-full rounded-3xl border border-white/10 bg-white/5 object-cover shadow-2xl"
                onError={(e) => {
                  // Graceful placeholder until a real headshot is supplied.
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
              What I do
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Consulting across the AI–systems boundary
            </h2>
            <p className="mt-4 text-slate-400">
              Two decades of shipping demanding software — brought to bear on your hardest engineering problems.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent-500/40 hover:bg-white/[0.05]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Projects
            </h2>
          </div>
          <Link
            to="/experience"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-400"
          >
            Full experience <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const card = (
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:bg-white/[0.05]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {project.name}
                  </h3>
                  <span className="whitespace-nowrap text-xs text-slate-500 font-mono">
                    {project.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent-400">{project.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.slug === 'xr-simulator' && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                    Read the case study <ArrowRight size={15} />
                  </span>
                )}
              </div>
            );
            return project.slug === 'xr-simulator' ? (
              <Link key={project.slug} to="/simulators" className="block">
                {card}
              </Link>
            ) : (
              <div key={project.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* Skills strip */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-2xl font-bold text-white">Technical toolkit</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                  {group.group}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-14 text-center sm:px-16">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Have a hard problem?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              I take on focused consulting engagements in AI tooling, systems, and graphics. Tell me what you're building.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-6 py-3 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-accent-300"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
