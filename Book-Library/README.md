## 📚 Book Library - React Application
A modern, responsive book library web application built with React and Tailwind CSS that allows users to search for books, view detailed information, and browse by categories using the Open Library API.

### ✨ Features
🔍 Search & Discovery
Advanced Book Search: Search by title, author, or keywords

Real-time Debouncing: Reduces API calls while typing

Category Browser: Browse books by 12+ categories (Fiction, Science, History, Fantasy, etc.)

Smart Filters: Sort by relevance, newest, oldest, or title A-Z

### 📖 Book Management
Detailed Book Views: Comprehensive book information including:

High-resolution cover images

Author information

Publication details

Book descriptions

Subject categories

ISBN and page counts

Responsive Design: Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
Dark/Light Mode: Toggle between themes with persistent preferences

Loading Skeletons: Smooth loading animations

Error Handling: Graceful error states with retry functionality

Interactive UI: Hover effects and smooth transitions

### 🔧 Technical Features
React Router: Single-page application navigation

Custom Hooks: Modular API integration and state management

Local Storage: Persists user preferences and reading lists

Performance Optimized: Debounced search, lazy loading ready

### 🛠️ Technology Stack
Frontend Framework: React 18

Build Tool: Vite

Styling: Tailwind CSS

Routing: React Router DOM

HTTP Client: Axios

Icons: React Icons

API: Open Library API

### 📦 Installation
Clone the repository

bash
git clone <repository-url>
cd book-library
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Build for production

bash
npm run build
### 🚀 Usage
Basic Search
Enter search terms in the search bar

View results in a responsive grid layout

Click any book to view detailed information

Category Browsing
Use the category browser to explore by genre

Click any category to view relevant books

Use "Back to all books" to return to general search

Dark Mode
Click the moon/sun icon in the header

Preferences are saved automatically

### 🏗️ Project Structure
text
src/
├── components/
│   ├── book/
│   │   └── BookCard.jsx          # Book preview cards
│   ├── search/
│   │   ├── SearchBar.jsx         # Search input component
│   │   └── SearchFilters.jsx     # Filter controls
│   ├── ui/
│   │   ├── BookSkeleton.jsx      # Loading placeholders
│   │   ├── ErrorMessage.jsx      # Error display component
│   │   └── ThemeToggle.jsx       # Dark mode toggle
│   └── CategoryBrowser.jsx       # Category selection
├── hooks/
│   ├── useBooksApi.js           # Book data fetching hook
│   ├── useDebounce.js           # Search debouncing hook
│   └── useReadingList.js        # Reading list management
├── pages/
│   ├── Home.jsx                 # Main search page
│   ├── BookDetails.jsx          # Detailed book view
│   └── NotFound.jsx             # 404 error page
├── utils/
│   └── api.js                   # API configuration and methods
└── styles/
    └── index.css                # Tailwind CSS imports
🌐 API Integration
This project uses the Open Library API for:

Search: https://openlibrary.org/search.json?q={query}

Book Details: https://openlibrary.org/works/{id}.json

Cover Images: https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg

### 🎨 Customization
Styling
The application uses Tailwind CSS. Modify colors, spacing, and components in:

tailwind.config.js - Theme configuration

src/index.css - Custom styles and Tailwind directives

Adding New Features
New Pages: Add to src/pages/ and update router in App.jsx

New Components: Add to appropriate src/components/ subdirectory

New Hooks: Add to src/hooks/ for reusable logic

### 📱 Responsive Design
The application is fully responsive with breakpoints:

Mobile: < 640px (2 columns)

Tablet: 640px - 1024px (3-4 columns)

Desktop: > 1024px (5 columns)

### 🔮 Future Enhancements
User authentication system

Reading list with progress tracking

Book reviews and ratings

Social sharing features

Advanced search filters (year range, language)

Book recommendations

Offline functionality with service workers

Book previews/excerpts

### 🐛 Troubleshooting
Common Issues
API Rate Limiting: Open Library has usage limits

CORS Errors: Ensure proper API endpoint configuration

Missing Book Data: Some books may have incomplete information

Development Tips
Use browser DevTools to monitor network requests

Check console for API error messages

Test with various search terms to ensure robustness

### 📄 License
This project is open source and available under the MIT License.

### 🙏 Acknowledgments
Alxafrica for the organised and structured beginner friendly course for frontend web development

Open Library for providing free book data

Tailwind CSS for styling utilities

React team for the fantastic framework

### 📞 Support
For support or questions about this project:

Create an issue on GitHub

Check the React and Tailwind CSS documentation

Happy Reading 📖✨