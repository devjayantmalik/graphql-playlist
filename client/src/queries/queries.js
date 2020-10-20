import { gql } from "@apollo/client";

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $author: ID!) {
    addBook(name: $name, genre: $genre, authorId: $author) {
      id
      name
      genre
    }
  }
`;

export const getBookQuery = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;
