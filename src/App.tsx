import "./App.css";
import { useState, useEffect } from "react";
import BookType from "../types/book.type";
import Header from "./components/header";
import BookList from "./components/BookList";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as BooksAPI from "./APIs/BooksAPI";

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
  // const [searchBooks, setSearchBooks] = useQuery(query);
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

  // useEffect(() => {
  //   const combined = searchBooks.map((book) => {
  //     if (mapOfIdToBooks.has(book.id)) {
  //       return mapOfIdToBooks.get(book.id);
  //     } else {
  //       return book;
  //     }
  //   });
  //   setMergedBooks(combined);
  // }, [searchBooks]);

  // const createMapOfBooks = (books) => {
  //   const map = new Map();
  //   books.map((book) => map.set(book.id, book));
  //   return map;
  // };

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
        <Switch>
          {/* SEARCH */}
          <Route path="/search">
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                  {mergedBooks.map((b) => (
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
              {console.log("SEARCH", searchBooks)}

              <Header />
              <div className="list-books-content">
                <BookList books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
