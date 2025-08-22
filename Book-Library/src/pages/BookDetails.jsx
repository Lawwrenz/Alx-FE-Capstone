import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookDetails } from "../utils/api";
import Spinner from "../components/ui/Spinner";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDetails(id);
        setBook(data);
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline">← Back to search</Link>
      {/* Book details content here */}
    </div>
  );
}