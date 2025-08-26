import axios from "axios";

export const API_BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query, filters = {}) => {
  try {
    let url = `${API_BASE_URL}/search.json?q=${query}`;

    // Add language filter if specified
    if (filters.language && filters.language !== "all") {
      url += `&language=${filters.language}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error("API Error (Book Details):", error);
    throw new Error("Failed to fetch book details");
  }
};

export const getBookCover = (coverId, size = "M") => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
