import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link 
      to={`/book/${book.key.replace("/works/", "")}`}
      className="group block"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        {/* Cover Image */}
        <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center">
          {book.cover_i ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="text-gray-400 text-sm">No cover</div>
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