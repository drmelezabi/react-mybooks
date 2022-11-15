import "./App.css";
import { useState, useEffect } from "react";
import Book from "./src/components/Book";
import BookType from "./types/book.type";
import Header from "./src/components/header";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import \* as BooksAPI from "./APIs/BooksAPI";
import Shelves from "./src/components/BookShelf";
import BookType from "./types/book.type";

function App() {
const createMapOfBooks = (books: BookType[]) => {
const map = new Map();
books.map((book) => map.set(book.id, book));
return map;
};

const [showSearchPage, setShowSearchpage] = useState(false);

const [books, setBooks] = useState<BookType[]>([]);
const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

const [query, setQuery] = useState("");
const [searchBooks, setSearchBooks] = useQuery(query);
const [mergedBooks, setMergedBooks] = useState([]);

useEffect(() => {
const booksArray = async () => {
const books: BookType[] | null = await BooksAPI.getAll();
if (books) {
setBooks(books);
setMapOfIdToBooks(createMapOfBooks(books));
} else {
setBooks([]);
}
};
booksArray();
}, []);

useEffect(() => {
const combined: (Map<string, string> | BookType)[] = searchBooks.map(
(book: BookType): Map<string, string> | BookType => {
if (mapOfIdToBooks.has(book.id)) {
return mapOfIdToBooks.get(book.id);
} else {
return book;
}
}
);
setMergedBooks(combined);
}, [searchBooks]);

const createMapOfBooks = (books) => {
const map = new Map();
books.map((book) => map.set(book.id, book));
return map;
};

const updateBookShelf = (book: BookType, whereTo: string) => {
const updatedBooks = books.map((bookItem) => {
if (bookItem.id === book.id) {
book.shelf = whereTo;
return book;
}
return bookItem;
});
if (!mapOfIdToBooks.has(book.id)) {
book.shelf = whereTo;
updatedBooks.push(book);
}
setBooks(updatedBooks);
BooksAPI.update(book, whereTo);
};

return (
<div className="app">
<Router>
<Routes>
{/_ SEARCH _/}
<Route path="/search">
<div className="search-books">
<div className="search-books-bar">
<Link to="/">
<button className="close-search">Close</button>
</Link>
<div className="search-books-input-wrapper">
<input
type="text"
placeholder="Search by title or author"
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
</div>
</div>
<div className="search-books-results">
<ol className="books-grid">
{mergedBooks.map((b: BookType) => (
<li key={b.id}>
<Book book={b} changeBookShelf={updateBookShelf} />
</li>
))}
</ol>
</div>
</div>
</Route>

          {/* MAIN PAGE */}
          <Route path="/">
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <BookShelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Routes>
      </Router>
    </div>

);
}

export default App;
