<<<<<<< HEAD
// ♻️ Reusable status/priority badge
const colors = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-emerald-100 text-emerald-700',
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-600'
};

export const Badge = ({ label }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors[label] || 'bg-gray-100 text-gray-600'}`}>
    {label}
  </span>
=======
// ♻️ Reusable status/priority badge
const colors = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-emerald-100 text-emerald-700',
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-600'
};

export const Badge = ({ label }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors[label] || 'bg-gray-100 text-gray-600'}`}>
    {label}
  </span>
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
);