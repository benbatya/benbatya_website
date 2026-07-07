import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
      <p className="font-display text-6xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Back home
      </Link>
    </div>
  );
}
