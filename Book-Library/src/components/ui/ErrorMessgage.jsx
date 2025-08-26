export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-red-400">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}