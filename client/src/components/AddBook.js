import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");

  const { error, loading, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  if (error) {
    console.log(error);
    return <div>Error Occured</div>;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      return alert("Book Name is required");
    }
    if (!genre) {
      return alert("Genre is required.");
    }
    if (!author) {
      return alert("Please select a author");
    }

    addBook({
      variables: { name, genre, author },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  };

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    }
    const { authors } = data;

    return authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  return (
    <form id="add-book" onSubmit={handleFormSubmit}>
      <div className="field">
        <label htmlFor="book-name">Book Name</label>
        <input
          value={name}
          type="text"
          id="book-name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre</label>
        <input
          value={genre}
          type="text"
          id="genre"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="author">Author</label>
        <select
          value={author}
          id="author"
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button type="submit">+</button>
    </form>
  );
};

export default AddBook;
