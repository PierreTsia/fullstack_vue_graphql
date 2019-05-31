require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Post = require("./models/Post");

const filePath = path.join(__dirname, "typeDefs.graphql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

const resolvers = require("./resolvers");
const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  })
  .catch(e => {
    console.log(e);
  });

const getUser = async token => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET);
      return user;
    } catch (e) {
      throw new AuthenticationError(
        "Your session has expired. Please sign in again."
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    currentUser: await getUser(req.headers.authorization),
    User,
    Post
  })
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});
