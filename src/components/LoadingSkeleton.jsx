export const LoadingSkeleton = () => {
  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg">
      <div className="aspect-[2/3] w-full animate-shimmer"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-800 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export const LoadingGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  );
};
