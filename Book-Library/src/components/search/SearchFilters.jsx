import { useState } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import BookSkeleton from "../components/ui/BookSkeleton";
import { useBooksApi } from "../hooks/useBooksApi";
import BookCard from "../components/book/BookCard";
import { useDebounce } from "../hooks/useDebounce"; // Add this import

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay
  const { books, loading, error } = useBooksApi(debouncedSearchQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lawrence Book Library</h1>
      <SearchBar onSearch={setSearchQuery} />

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {books.length === 0 && searchQuery ? (
            <p className="text-gray-500 text-center py-8">
              No books found for "{searchQuery}". Try another search...
            </p>
          ) : books.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Search for books above to get started...
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books.map((book) => (
                <BookCard key={book.key} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}