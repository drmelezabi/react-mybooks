import React from "react";
import BookType from "../../types/book.type";
import BookList from "./BookList";

const BookShelves = ({
  books,
  updateBookShelf,
}: {
  books: BookType[];
  updateBookShelf: Function;
}) => {
  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const whatToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <BookList
        title="Currently Reading"
        books={currentlyReading}
        updateBookShelf={updateBookShelf}
      />
      <BookList
        title="Want To Read"
        books={whatToRead}
        updateBookShelf={updateBookShelf}
      />
      <BookList title="Read" books={read} updateBookShelf={updateBookShelf} />
    </div>
  );
};

export default BookShelves;
