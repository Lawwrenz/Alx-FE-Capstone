import { useState } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import SearchFilters from "../components/search/SearchFilters";
import BookSkeleton from "../components/ui/BookSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage"; // Add this import
import { useBooksApi } from "../hooks/useBooksApi";
import BookCard from "../components/book/BookCard";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { books, loading, error } = useBooksApi(debouncedSearchQuery, filters);

  const handleRetry = () => {
    // Force re-fetch by updating a state that triggers the useEffect
    setFilters(prev => ({ ...prev, retry: Date.now() }));
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Lawrence Book Library</h1>
      <SearchBar onSearch={setSearchQuery} />
      
      {/* Show filters only when we have results and no error */}
      {books.length > 0 && !error && <SearchFilters onFilterChange={setFilters} />}

      {/* Enhanced Error Handling */}
      {error && (
        <ErrorMessage 
          message={error}
          onRetry={handleRetry}
          className="mt-4"
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {[...Array(10)].map((_, i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Success States */}
      {!loading && !error && (
        <>
          {books.length === 0 && searchQuery ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No books found
              </h3>
              <p className="text-gray-500">
                No results found for "<span className="font-medium">{searchQuery}</span>". 
                Try different keywords or filters.
              </p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Welcome to Lawrence Book Library
              </h3>
              <p className="text-gray-500">
                Search for books above to discover amazing reads!
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  Found {books.length} book{books.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}