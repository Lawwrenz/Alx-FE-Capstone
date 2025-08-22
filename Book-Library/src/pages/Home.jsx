import { useState } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import BookSkeleton from "../components/ui/BookSkeleton"; // Add this import
import { useBooksApi } from "../hooks/useBooksApi";
import BookCard from "../components/book/BookCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { books, loading, error } = useBooksApi(searchQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lawrence Book Library</h1>
      <SearchBar onSearch={setSearchQuery} />

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State - Skeleton Cards */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Loaded State - No Books Found */}
      {!loading && books.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No books found. Please try another search...
        </p>
      )}

      {/* Loaded State - Books Found */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}