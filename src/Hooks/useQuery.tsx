import { useState, useEffect } from "react";
import * as BooksAPI from "../APIs/BooksAPI";
import { useDebounce } from "use-debounce";

const useQuery = (searchQuery: string) => {
  const [searchBookQuery, setSearchBookQuery] = useState([]);
  const [valueSearch] = useDebounce(searchQuery, 500);

  useEffect(() => {
    let isActive = true;
    if (valueSearch) {
      BooksAPI.search(valueSearch).then((data) => {
        if (data.error) {
          setSearchBookQuery([]);
        } else {
          if (isActive) {
            setSearchBookQuery(data);
          }
        }
      });
    }
    return () => {
      isActive = false;
      setSearchBookQuery([]);
    };
  }, [valueSearch]);
  return [searchBookQuery, setSearchBookQuery];
};

export default useQuery;
