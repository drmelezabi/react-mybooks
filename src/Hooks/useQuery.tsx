import { useState, useEffect } from "react";
import * as BooksAPI from "../APIs/BooksAPI";
import { useDebounce } from "use-debounce";
import BookType from "../../types/book.type";

const useQuery = (
  searchQuery: string
): (BookType[] | React.Dispatch<React.SetStateAction<BookType[]>>)[] => {
  const [searchBookQuery, setSearchBookQuery] = useState<BookType[]>([]);
  const [valueSearch] = useDebounce(searchQuery, 500);

  useEffect(() => {
    let isActive = true;
    if (valueSearch) {
      const search = async () => {
        const searchResult = await BooksAPI.search(valueSearch);
        if (searchResult.error) {
          setSearchBookQuery([]);
        } else {
          if (isActive) {
            setSearchBookQuery(searchResult);
          }
        }
      };
      search();
    }
    return () => {
      isActive = false;
      setSearchBookQuery([]);
    };
  }, [valueSearch]);
  return [searchBookQuery, setSearchBookQuery];
};

export default useQuery;
