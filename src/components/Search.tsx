import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BookType from "../../types/book.type";
import Book from "./Book";
import * as BooksAPI from "../APIs/BooksAPI";
import useQuery from "../Hooks/useQuery";

const Search = (): JSX.Element => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [query, setQuery] = useState("");
  const [mergedBooks, setMergedBooks] = useState<BookType[]>([]);
  const [mapOfIdToBooks] = useState(new Map());
  const [searchBooks] = useQuery(query);

  useEffect(() => {
    const bookList = searchBooks as BookType[];
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
          {mergedBooks.map((book: BookType) => (
            <li key={book.id}>
              <Book book={book} changeBookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
