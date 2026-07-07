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
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 font-mono">
              Available for consulting
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              AI &amp; systems engineering,
              <span className="text-indigo-600"> shipped by hand.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Start a conversation <ArrowRight size={16} />
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                <Download size={16} /> Download résumé
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <a href={`mailto:${profile.email}`} aria-label="Email" className="text-slate-400 hover:text-indigo-600">
                <Mail size={20} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-indigo-600">
                <Linkedin size={20} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-indigo-600">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-200/60 to-teal-100/50 blur-2xl" />
              <img
                src={profile.headshotUrl}
                alt={profile.name}
                className="relative aspect-square w-full rounded-3xl border border-slate-200 bg-slate-100 object-cover shadow-xl"
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
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 font-mono">
              What I do
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Consulting across the AI–systems boundary
            </h2>
            <p className="mt-4 text-slate-600">
              Two decades of shipping demanding software — brought to bear on your hardest engineering problems.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 font-mono">
              Selected work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Projects
            </h2>
          </div>
          <Link
            to="/experience"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Full experience <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const card = (
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {project.name}
                  </h3>
                  <span className="whitespace-nowrap text-xs text-slate-400 font-mono">
                    {project.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-indigo-600">{project.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {project.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.slug === 'xr-simulator' && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    Read the case study <ArrowRight size={15} />
                  </span>
                )}
              </div>
            );
            return project.slug === 'xr-simulator' ? (
              <Link key={project.slug} to="/xr-simulator" className="block">
                {card}
              </Link>
            ) : (
              <div key={project.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      {/* Skills strip */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">Technical toolkit</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  {group.group}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
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
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center shadow-xl sm:px-16">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Have a hard problem?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              I take on focused consulting engagements in AI tooling, systems, and graphics. Tell me what you're building.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
