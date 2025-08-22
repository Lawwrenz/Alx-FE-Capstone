export default function BookSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg aspect-[2/3] mb-2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}