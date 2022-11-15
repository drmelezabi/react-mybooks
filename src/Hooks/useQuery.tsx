import { useState, useEffect } from "react";
import * as BooksAPI from "../APIs/BooksAPI";
import { useDebounce } from "use-debounce";
import BookType from "../../types/book.type";

export default function useQuery(query: string) {
  const [searchBooks, setSearchBooks] = useState<BookType[]>([]);
  const [value] = useDebounce<string>(query, 500);

  useEffect(() => {
    const result = async () => {
      let isActive = true;
      if (value) {
        const results: BookType[] = await BooksAPI.searchx(query, 500);
        if (!value) {
          setSearchBooks([]);
        } else {
          if (isActive) {
            setSearchBooks(results);
          }
        }
      }
      return () => {
        isActive = false;
        setSearchBooks([]);
      };
    };
    result();
  }, [query, value]);

  return [searchBooks, setSearchBooks] as const;
}
