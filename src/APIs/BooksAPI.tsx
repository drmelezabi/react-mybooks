import BookType from "../../types/book.type";
import Headers from "../../types/headers.type";
import { ErrorHandling } from "../Errors";
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
      ErrorHandling(error.response?.status as number);
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

export const update = (book: BookType, shelf: string) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query: string, maxResults: number) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);

export const searchx = async (query: string, maxResults: number) => {
  try {
    const { data } = await axios.post(
      `${api}/search`,
      { query, maxResults },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );
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
