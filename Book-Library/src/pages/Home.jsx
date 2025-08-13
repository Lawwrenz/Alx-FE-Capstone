import { useState } from "react";
import SearchBar from "../components/search/SearchBar.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import useBooksApi from "../hooks/useBooksApi.js";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { books, loading, error } = useBooksApi(searchQuery);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lawrence Book Library</h1>
      <SearchBar onSearch={setSearchQuery} />

      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      {books.length === 0 && !loading && (
        <p>No books found....Please Try another search..</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.key} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{book.title}</h3>
            <p>{book.author_name?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}