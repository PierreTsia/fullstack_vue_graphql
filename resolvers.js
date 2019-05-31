const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = Post.find({})
        .sort({ createdDate: "desc" })
        .populate({
          path: "createdBy",
          model: "User"
        });
      return posts;
    },
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Post"
      });

      return user;
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, description, categories, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        description,
        categories,
        createdBy: creatorId
      }).save();
      return newPost;
    },

    signupUser: async (_, { username, email, password }, { User }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const user = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log(isValidPassword);
      if (!isValidPassword) {
        throw new Error("password is incorrect");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    }
  }
};
