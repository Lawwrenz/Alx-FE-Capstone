import { useState, useEffect } from "react";
import { searchBooks } from "../utils/api";

export const useBooksApi = (query, filters = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

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
      })
      .catch((err) => {
        let errorMessage = "Failed to fetch books. ";

        if (err.response?.status === 404) {
          errorMessage += "The search service is temporarily unavailable.";
        } else if (err.response?.status >= 500) {
          errorMessage += "Server error. Please try again later.";
        } else if (err.message.includes("Network Error")) {
          errorMessage +=
            "Network connection failed. Check your internet connection.";
        } else {
          errorMessage += "Please try again.";
        }

        setError(errorMessage);
        setBooks([]);
      })
      .finally(() => setLoading(false));
  }, [query, filters]);

  return { books, loading, error };
};
