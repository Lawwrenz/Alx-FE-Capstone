import { useState } from "react";

export default function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    sort: "relevance",
    language: "all"
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Filter Results</h3>
      
      <div className="flex flex-wrap gap-4">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Sort by
          </label>
          <select 
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Language
          </label>
          <select 
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Languages</option>
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fre">French</option>
            <option value="ger">German</option>
            <option value="ita">Italian</option>
          </select>
        </div>
      </div>
    </div>
  );
}