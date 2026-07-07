import {useState} from 'react';
import {Link, NavLink, Outlet, useLocation} from 'react-router-dom';
import {Github, Linkedin, Mail, Menu, X} from 'lucide-react';
import {profile} from '../data/resume';

const navLinks = [
  {to: '/', label: 'Home', end: true},
  {to: '/experience', label: 'Experience', end: false},
  {to: '/case-studies', label: 'Case Studies', end: false},
  {to: '/xr-simulator', label: 'XR Simulator', end: false},
  {to: '/contact', label: 'Contact', end: false},
];

function NavItems({onNavigate}: {onNavigate?: () => void}) {
  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={onNavigate}
          className={({isActive}) =>
            [
              'text-sm font-medium transition-colors',
              isActive ? 'text-accent-400' : 'text-accent-600 hover:text-accent-400',
            ].join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0b0d]/80 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-400 text-sm text-[#0a0b0d]">
                BB
              </span>
              <span className="hidden sm:inline">{profile.name}</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <NavItems />
              <Link
                to="/contact"
                className="rounded-lg bg-accent-400 px-4 py-2 text-sm font-semibold text-[#0a0b0d] shadow-sm transition-colors hover:bg-accent-300"
              >
                Get in touch
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden text-slate-300"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0a0b0d] px-4 py-4">
            <div className="flex flex-col gap-4">
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <main key={location.pathname} className="flex-1 animate-fade-in">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="font-display font-bold text-white">{profile.name}</p>
              <p className="text-sm text-slate-500">{profile.title}</p>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-accent-600 transition-colors hover:text-accent-400"
              >
                <Mail size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-accent-600 transition-colors hover:text-accent-400"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-accent-600 transition-colors hover:text-accent-400"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-600 sm:text-left">
            © {year} {profile.name}. Built with React &amp; Vite.
          </p>
        </div>
      </footer>
    </div>
  );
}
