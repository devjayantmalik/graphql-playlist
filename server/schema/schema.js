const graphql = require("graphql");
const Book = require("../modals/Book");
const Author = require("../modals/Author");

const BookType = new graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    genre: { type: graphql.GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        return Author.findById(parent.authorId);

        // return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    age: { type: graphql.GraphQLInt },
    books: {
      type: graphql.GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent._id });
        // return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: graphql.GraphQLID },
      },
      resolve(parent, args) {
        return Book.findOne({ _id: args.id });
        // return books.find((book) => book.id.toString() === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: graphql.GraphQLID },
      },
      resolve(parent, args) {
        return Author.findOne({ _id: args.id });
        // return authors.find((author) => author.id.toString() === args.id);
      },
    },
    books: {
      type: graphql.GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});

        // return books;
      },
    },
    authors: {
      type: graphql.GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
        // return authors;
      },
    },
  },
});

const Mutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      async resolve(parent, args) {
        author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        genre: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        authorId: { type: graphql.GraphQLNonNull(graphql.GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  }),
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
