import {useState, type FormEvent} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {CheckCircle2, Github, Linkedin, Mail, Send, AlertCircle} from 'lucide-react';
import {profile} from '../data/resume';

// FormSubmit AJAX endpoint — no backend required. The first real submission
// triggers a one-time confirmation email that must be clicked to activate.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/benjaminbatya@gmail.com';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({name: '', email: '', company: '', message: ''});
  const [honeypot, setHoneypot] = useState('');

  const update = (field: keyof typeof form) => (e: {target: {value: string}}) =>
    setForm((f) => ({...f, [field]: e.target.value}));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return; // bot trap
    setStatus('submitting');
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          _subject: `New inquiry from ${form.name || 'benbatya.com'}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({name: '', email: '', company: '', message: ''});
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Intro */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 font-mono">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Let's talk
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Have a project in AI tooling, high-performance systems, or graphics/XR? Send a few
            details and I'll get back to you.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-slate-600 transition-colors hover:text-indigo-600"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100">
                <Mail size={18} />
              </span>
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-slate-600 transition-colors hover:text-indigo-600"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100">
                <Linkedin size={18} />
              </span>
              linkedin.com/in/benjaminbatya
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-slate-600 transition-colors hover:text-indigo-600"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100">
                <Github size={18} />
              </span>
              github.com/benbatya
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={30} />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-slate-900">
                  Message sent
                </h2>
                <p className="mt-2 max-w-xs text-sm text-slate-600">
                  Thanks for reaching out — I'll reply to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Honeypot: hidden from users, catches bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                    placeholder="jane@company.com"
                  />
                </Field>
                <Field label="Company (optional)" htmlFor="company">
                  <input
                    id="company"
                    value={form.company}
                    onChange={update('company')}
                    className={inputClass}
                    placeholder="Acme Inc."
                  />
                </Field>
                <Field label="Message" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell me about your project…"
                  />
                </Field>

                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-rose-600">
                    <AlertCircle size={16} /> Something went wrong. Please email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : (
                    <>
                      Send message <Send size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}
