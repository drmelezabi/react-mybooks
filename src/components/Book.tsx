import React from "react";
import BookType from "../../types/book.type";

const stylize = (url: string) => {
  return {
    width: 128,
    height: 193,
    backgroundImage: url ? `url(${url})` : "none",
  };
};

const BookElement = ({
  book,
  changeBookShelf,
}: {
  book: BookType;
  changeBookShelf: Function;
}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={stylize(book.imageLinks?.thumbnail as string)}
        ></div>
        <div className="book-shelf-changer">
          <select
            aria-label="State"
            defaultValue={book.shelf ? book.shelf : "none"}
            onChange={e => changeBookShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.publisher}</div>
    </div>
  );
};

export default BookElement;
