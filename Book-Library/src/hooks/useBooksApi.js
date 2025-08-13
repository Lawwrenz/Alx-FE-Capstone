import { useState, useEffect } from "react";
import { searchBooks } from "../utils/api";

export const useBooksApi = (query) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    searchBooks(query)
      .then((data) => {
        setBooks(data);
        setError(null);
      })
      .catch((err) => {
        setError(
          err.message.includes("Network Error")
            ? "Network error. Check your connection."
            : "Failed to fetch books."
        );
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { books, loading, error };
};
