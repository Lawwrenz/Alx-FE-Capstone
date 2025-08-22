// Create src/components/ui/BookSkeleton.jsx
export default function BookSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg aspect-[2/3]"></div>
  );
}

// In Home.jsx, replace loading spinner:
{loading && (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {[...Array(10)].map((_, i) => (
      <BookSkeleton key={i} />
    ))}
  </div>
)}