import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <div>Error Occured</div>;
  }

  const { books } = data;

  return (
    <div>
      <ul id="book-list">
        {books.map((book) => (
          <li onClick={() => setSelectedBookId(book.id)} key={book.id}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails id={selectedBookId} />
    </div>
  );
}

export default BookList;
