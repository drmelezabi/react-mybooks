import BookType from "../../types/book.type";
import Headers from "../../types/headers.type";
import axios from "axios";

const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers: Headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = async (bookId: string) => {
  try {
    const { data } = await axios.get(`${api}/books/${bookId}`, {
      headers,
    });
    const book: BookType = data.book;
    return book;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {};
    } else {
      console.log("something went wrong");
    }
  }
};

export const getAll = async (): Promise<BookType[] | null> => {
  try {
    const { data } = await axios.get(`${api}/books`, {
      headers,
    });
    const books: BookType[] = data.books;
    return books;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [];
    } else {
      return [];
    }
  }
};

export const update = async (book: BookType, shelf: string) => {
  const { data } = await axios.put(
    `${api}/books/${book.id}`,
    { shelf },
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    }
  );
  const books = data.books;
  return books;
};

export const search = async (query: string) => {
  const { data } = await axios.post(
    `${api}/search`,
    { query },
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    }
  );
  const books = data.books;
  return books;
};
