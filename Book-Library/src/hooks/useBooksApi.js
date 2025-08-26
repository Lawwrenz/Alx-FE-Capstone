import { useState, useEffect } from "react";
import { searchBooks } from "../utils/api";

export const useBooksApi = (query, filters = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    searchBooks(query, filters)
      .then((data) => {
        let filteredBooks = data.docs || [];

        // Apply filters
        if (filters.sort === "newest") {
          filteredBooks = filteredBooks.sort(
            (a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0)
          );
        } else if (filters.sort === "oldest") {
          filteredBooks = filteredBooks.sort(
            (a, b) =>
              (a.first_publish_year || 9999) - (b.first_publish_year || 9999)
          );
        } else if (filters.sort === "title") {
          filteredBooks = filteredBooks.sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
          );
        }

        if (filters.language && filters.language !== "all") {
          filteredBooks = filteredBooks.filter((book) =>
            book.language?.includes(filters.language)
          );
        }

        setBooks(filteredBooks);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to fetch books. Please try again.");
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, [query, filters]);

  return { books, loading, error };
};
