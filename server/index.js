const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());

const db_url = "mongodb://172.17.0.2/ninja";
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Database connected.....");
  })
  .catch((err) => {
    console.log("Database connection failed...");
    console.error(err);
    process.exit(1);
  });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = 4500;
app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});
