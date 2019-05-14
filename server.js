require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");


const User = require("./models/User");
const Post = require("./models/Post");

const filePath = path.join(__dirname, "typeDefs.graphql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const resolvers = require("./resolvers");
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch(e => {
    console.log(e);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});
