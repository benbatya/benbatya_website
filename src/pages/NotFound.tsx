import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
      <p className="font-display text-6xl font-bold text-accent-400">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-[#0a0b0d] transition-colors hover:bg-accent-300"
      >
        Back home
      </Link>
    </div>
  );
}
