import { Link } from "react-router-dom";
import { useState } from "react";

export default function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      to={`/book/${book.key.replace("/works/", "")}`}
      className="group block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
        {/* Cover Image */}
        <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center">
          {book.cover_i && !imageError ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="object-cover w-full h-full"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-gray-400 text-sm p-4 text-center">
              No cover available
            </div>
          )}
        </div>
        
        {/* Book Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-1">
            {book.author_name?.join(", ") || "Unknown Author"}
          </p>
        </div>
      </div>
    </Link>
  );
}