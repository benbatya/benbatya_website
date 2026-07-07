import {Link} from 'react-router-dom';
import {ArrowRight, Download, GraduationCap} from 'lucide-react';
import {profile, roles, skills, education} from '../data/resume';

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 font-mono">
          Experience
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          20+ years of building demanding software
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          A seasoned senior software engineer specialized in the architecture and optimization of
          high-performance systems — from XR runtimes and medical visualization to additive
          manufacturing and game tooling.
        </p>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
        >
          <Download size={16} /> Download résumé (PDF)
        </a>
      </header>

      {/* Timeline */}
      <div className="mt-14">
        <ol className="relative border-l border-slate-200">
          {roles.map((role) => (
            <li key={`${role.company}-${role.start}`} className="mb-10 ml-6 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-600 shadow" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h2 className="font-display text-xl font-semibold text-slate-900">
                  {role.company}
                </h2>
                <span className="text-sm text-slate-400 font-mono">
                  {role.start} — {role.end}
                </span>
              </div>
              <p className="mt-0.5 text-sm font-semibold text-indigo-600">{role.title}</p>
              <p className="mt-2 text-slate-600">{role.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {role.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              {role.company === 'Meta Platforms' && (
                <Link
                  to="/xr-simulator"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Read the XR Simulator case study <ArrowRight size={14} />
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Education */}
      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm">
            <GraduationCap size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Education
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">
              {education.school}
            </h3>
            <p className="text-sm text-slate-600">{education.degree}</p>
            <p className="text-sm text-slate-400 font-mono">{education.period}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Technical skills</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
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
    </div>
  );
}
