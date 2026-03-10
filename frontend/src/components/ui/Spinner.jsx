// ♻️ Reusable full-page loading spinner
export const Spinner = ({ size = 'md' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 ${sizes[size]}`} />
    </div>
  );
};