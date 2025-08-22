import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookDetails, getBookCover } from "../utils/api";
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
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Back Button */}
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <span className="mr-1">←</span> Back to search
      </Link>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Cover Image Section */}
          <div className="md:w-1/3 p-8 bg-gray-50 flex items-center justify-center">
            {book.covers?.[0] ? (
              <img
                src={getBookCover(book.covers[0], "L")}
                alt={book.title}
                className="w-full max-w-xs rounded-lg shadow-md"
              />
            ) : (
              <div className="text-gray-400 text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-4xl mb-2">📖</div>
                <p className="text-sm">No cover available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {book.title}
            </h1>

            {/* Authors */}
            {book.authors && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Authors</h2>
                <p className="text-xl text-gray-800">
                  {book.authors.map(author => author.name).join(", ")}
                </p>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {typeof book.description === "string" 
                    ? book.description 
                    : book.description.value}
                </p>
              </div>
            )}

            {/* Publication Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* First Published */}
              {book.first_publish_date && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">First Published</h3>
                  <p className="text-gray-600">{book.first_publish_date}</p>
                </div>
              )}

              {/* Subjects */}
              {book.subjects && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.slice(0, 6).map((subject, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages */}
              {book.number_of_pages && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Pages</h3>
                  <p className="text-gray-600">{book.number_of_pages}</p>
                </div>
              )}

              {/* ISBN (if available) */}
              {book.isbn && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">ISBN</h3>
                  <p className="text-gray-600">{book.isbn[0]}</p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            {(book.languages || book.publishers) && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Additional Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {book.publishers && (
                    <p><span className="font-medium">Publisher:</span> {book.publishers.join(", ")}</p>
                  )}
                  {book.languages && (
                    <p><span className="font-medium">Language:</span> {book.languages.map(lang => lang.key.replace("/languages/", "")).join(", ")}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}