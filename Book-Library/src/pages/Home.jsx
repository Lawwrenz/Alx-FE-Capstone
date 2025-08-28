import { useState, useEffect } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import SearchFilters from "../components/search/SearchFilters";
import CategoryBrowser from "../components/CategoryBrowser"; // Add this import
import BookSkeleton from "../components/ui/BookSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useBooksApi } from "../hooks/useBooksApi";
import BookCard from "../components/book/BookCard";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { books, loading, error } = useBooksApi(debouncedSearchQuery, filters);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const handleRetry = () => {
    setFilters(prev => ({ ...prev, retry: Date.now() }));
  };

  const handleCategorySelect = (categoryQuery) => {
    setSearchQuery(categoryQuery);
    setFilters({}); // Reset filters when selecting a category
  };

  const clearCategorySearch = () => {
    setSearchQuery("");
    setFilters({});
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-teal-500 dark:text-teal-400 font-handwritten-display">
          Book Library
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-lg"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <SearchBar onSearch={setSearchQuery}/>
      
      {/* Category Browser - Show when no search or when viewing categories */}
      {(!searchQuery || searchQuery.startsWith("subject:")) && (
        <CategoryBrowser 
          onCategorySelect={handleCategorySelect} 
          currentQuery={searchQuery}
        />
      )}

      {/* Show filters only when we have results and no error */}
      {books.length > 0 && !error && <SearchFilters onFilterChange={setFilters} />}

      {/* Clear search button when viewing categories */}
      {searchQuery.startsWith("subject:") && books.length > 0 && (
        <div className="mb-4">
          <button
            onClick={clearCategorySearch}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← Back to all books
          </button>
        </div>
      )}

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
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No books found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No results found for {searchQuery.startsWith("subject:") ? "this category" : `"${searchQuery}"`}. 
                Try a different {searchQuery.startsWith("subject:") ? "category" : "search"}.
              </p>
              {searchQuery.startsWith("subject:") && (
                <button
                  onClick={clearCategorySearch}
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Browse All Categories
                </button>
              )}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Welcome to Book Library
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Search for books or browse by category to discover amazing reads!
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Found {books.length} book{books.length !== 1 ? 's' : ''}
                  {searchQuery.startsWith("subject:") && (
                    <span className="text-teal-600 dark:text-teal-400 ml-2">
                      in {categories.find(c => c.query === searchQuery)?.name || "this category"}
                    </span>
                  )}
                </p>
                {searchQuery.startsWith("subject:") && (
                  <button
                    onClick={clearCategorySearch}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    View all books
                  </button>
                )}
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

