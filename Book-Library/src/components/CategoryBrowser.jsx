import { useState } from "react";

const categories = [
  { id: "fiction", name: "Fiction", emoji: "📚", query: "subject:fiction" },
  { id: "science", name: "Science", emoji: "🔬", query: "subject:science" },
  { id: "history", name: "History", emoji: "🏛️", query: "subject:history" },
  { id: "fantasy", name: "Fantasy", emoji: "🐉", query: "subject:fantasy" },
  { id: "mystery", name: "Mystery", emoji: "🕵️", query: "subject:mystery" },
  { id: "romance", name: "Romance", emoji: "💖", query: "subject:romance" },
  { id: "biography", name: "Biography", emoji: "👤", query: "subject:biography" },
  { id: "technology", name: "Technology", emoji: "💻", query: "subject:technology" },
  { id: "philosophy", name: "Philosophy", emoji: "🧠", query: "subject:philosophy" },
  { id: "art", name: "Art", emoji: "🎨", query: "subject:art" },
  { id: "travel", name: "Travel", emoji: "✈️", query: "subject:travel" },
  { id: "cooking", name: "Cooking", emoji: "🍳", query: "subject:cooking" }
];

export default function CategoryBrowser({ onCategorySelect, currentQuery }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.id);
    onCategorySelect(category.query);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        📚 Browse by Category
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`p-10 rounded-lg transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category.id
                ? "bg-teal-500 text-white shadow-lg ring-2 ring-teal-300"
                : "bg-white dark:bg-green-900 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg"
            }`}
            title={`Browse ${category.name} books`}
          >
            <div className="text-2xl mb-1">{category.emoji}</div>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Show selected category info */}
      {selectedCategory && (
        <div className="mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <p className="text-sm text-teal-700 dark:text-teal-300">
            Browsing <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong> books
            {currentQuery && currentQuery !== categories.find(c => c.id === selectedCategory)?.query && (
              <span className="ml-2 text-orange-600 dark:text-orange-400">
                (Search results may vary)
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}