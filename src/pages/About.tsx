import {Link} from 'react-router-dom';
import {ArrowRight, MessageSquare, Compass, Handshake} from 'lucide-react';
import {profile} from '../data/resume';

// How Ben works — the human, approachable side of the practice. Speaks to
// founders and stakeholders who need to trust the person, not just the résumé.
const principles = [
  {
    icon: MessageSquare,
    title: 'I speak plain language',
    body: 'Deep technical work only helps if everyone can follow the plan. I translate the hard parts into clear tradeoffs so founders, PMs, and non-engineers can make good calls with me.',
  },
  {
    icon: Compass,
    title: 'I care about the outcome, not the hours',
    body: 'I take on problems I can genuinely move the needle on, scope them honestly, and tell you when something is — or isn\'t — worth building.',
  },
  {
    icon: Handshake,
    title: 'I\'m an easy partner',
    body: 'Low ego, high ownership. I fit into your team\'s rhythm, leave the codebase better than I found it, and make the people around me more effective.',
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      {/* Intro */}
      <section className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hi, I&rsquo;m Ben.
          </h1>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-400">
            <p>
              For more than twenty years I&rsquo;ve been drawn to the hardest corner of software
              &mdash; the places where performance, hardware, and real human experience collide.
              I&rsquo;ve built XR developer tools at Meta, visualization for a surgical robot,
              control software for a wearable medical device, and tooling for <em>Star Wars</em>{' '}
              games. The common thread is a love of problems most people consider too gnarly to touch.
            </p>
            <p>
              What I love most is delivering something a client finds genuinely satisfying. I&rsquo;m
              at my proudest when someone takes one of my tools and creates something with it that I
              never could have imagined &mdash; and I&rsquo;m thrilled every time collaboration gets
              easier and the hard, tangled problems become simpler and more understandable.
            </p>
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
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="mt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
            How I work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Serious about the work, easy to work with
          </h2>
          <p className="mt-4 text-slate-400">
            The tech is demanding; working with me shouldn&rsquo;t be. Here&rsquo;s what you can
            count on.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent-500/40 hover:bg-white/[0.05]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-400">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Beyond the code */}
      <section className="mt-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 font-mono">
            Off the clock
          </p>
          <div className="mt-4 space-y-5 text-lg leading-relaxed text-slate-400">
            <p>
              I live in Sausalito, just across the bridge from the city. Most of my favorite hours
              are the unplugged ones &mdash; time in the parks with my wife and daughter, biking
              over the Golden Gate Bridge and around the bay, and improv contact dancing.
            </p>
            <p>
              I play a lot of Scrabble, and I genuinely enjoy tinkering with my solar roof and
              keeping the plumbing in good working order. When I&rsquo;m reading, it&rsquo;s usually
              a sci-fi novel or a history book about the evolution of technology and the making of
              Silicon Valley.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Let&rsquo;s build something together
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          If you&rsquo;ve got a hard problem &mdash; or just want to talk one through &mdash;
          I&rsquo;d love to hear about it.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-6 py-3 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-accent-300"
        >
          Start a conversation <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
