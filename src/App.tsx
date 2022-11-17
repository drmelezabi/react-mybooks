import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookType from "../types/book.type";
import BookShelves from "./components/BookShelves";
import * as BooksAPI from "./APIs/BooksAPI";
import Header from "./components/header";
import Book from "./components/Book";
import useQuery from "./Hooks/useQuery";

function App() {
  const [query, setQuery] = useState("");
  const [mergedBooks, setMergedBooks] = useState<BookType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
  const [searchBooks] = useQuery(query);

  useEffect(() => {
    const bookList = searchBooks as BookType[];
    // eslint-disable-next-line array-callback-return
    const combined = bookList.map((book: BookType) => {
      if (bookList) {
        if (mapOfIdToBooks.has(book.id)) {
          return mapOfIdToBooks.get(book.id);
        } else {
          return book;
        }
      }
    });
    setMergedBooks(combined);
  }, [mapOfIdToBooks, searchBooks]);

  const updateShelf = (book: BookType, whereTo: string) => {
    const updatedBooks = books.map(bookItem => {
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

  const createMapOfBooks = (books: BookType[]) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  };

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

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
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
                      onChange={e => setQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  {mergedBooks.length ? (
                    <ol className="books-grid">
                      {mergedBooks.map((book: BookType) => (
                        <li key={book.id}>
                          <Book book={book} changeBookShelf={updateShelf} />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div>
                      <h1>not found</h1>
                    </div>
                  )}
                </div>
              </div>
            }
          ></Route>
          <Route
            path="/"
            element={
              <div className="list-books">
                <Header />
                <div className="list-books-content">
                  <div>
                    <BookShelves books={books} updateBookShelf={updateShelf} />
                  </div>
                </div>
                <div className="open-search">
                  <Link className="close-search" to="/search">
                    Close
                  </Link>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
