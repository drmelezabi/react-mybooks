import Book from "./Book";
import BookType from "../../types/book.type";

const BookList = ({
  books,
  title,
  updateBookShelf,
}: {
  books: BookType[];
  title: string;
  updateBookShelf: Function;
}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book book={book} changeBookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookList;
