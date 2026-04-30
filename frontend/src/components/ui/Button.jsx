<<<<<<< HEAD
// ♻️ Reusable UI primitive — use everywhere instead of raw <button>
const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

export const Button = ({
  children, variant = 'primary', size = 'md',
  loading = false, className = '', ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
      transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400
      disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && (
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    )}
    {children}
  </button>
=======
// ♻️ Reusable UI primitive — use everywhere instead of raw <button>
const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

export const Button = ({
  children, variant = 'primary', size = 'md',
  loading = false, className = '', ...props
}) => (
  <button
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
      transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400
      disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && (
      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    )}
    {children}
  </button>
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
);