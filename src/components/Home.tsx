import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookType from "../../types/book.type";
import BookShelves from "./BookShelves";
import * as BooksAPI from "../APIs/BooksAPI";
import Header from "./header";

const Home = (): JSX.Element => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const createMapOfBooks = (books: BookType[]) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
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
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          <BookShelves books={books} updateBookShelf={updateBookShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link className="close-search" to="/search">
          Close
        </Link>
      </div>
    </div>
  );
};

export default Home;
