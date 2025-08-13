export const API_BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json?q=${query}`);
    return response.data.docs; // This retuns an array of books
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
