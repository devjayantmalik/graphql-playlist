import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ id }) => {
  const { loading, data } = useQuery(getBookQuery, {
    variables: { id },
  });

  if (loading) {
    return (
      <div id="book-details">
        <h1>Book Details</h1>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div id="book-details">
        <h1>Book Details</h1>
        <p>Select a book to view its details</p>
      </div>
    );
  }
  const { book } = data;

  return (
    <div id="book-details">
      <h1>Book Details</h1>

      <h2>
        Book Name: <strong>{book.name}</strong>
      </h2>
      <p>
        Book Genre: <strong>{book.genre}</strong>
      </p>
      <p>
        Book Author Name: <strong>{book.author.name}</strong>
      </p>

      <p>
        All Books By <strong>{book.author.name}</strong>:
      </p>
      <ul className="other-books">
        {book.author.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;
