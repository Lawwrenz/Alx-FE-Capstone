import axios from "axios";

export const API_BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json?q=${query}`);
    return response.data.docs; // This returns an array of books
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// New funstion for book details
export const getBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error("API Error (Book Details):", error);
    throw new Error("Failed to fetch book details");
  }
};

// This is optional: Add this function for better cover images
export const getBookCover = (coverId, size = "M") => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
