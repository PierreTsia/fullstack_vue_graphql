const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getPosts: async (_, { limit }, { Post }) => {
      const posts = Post.find({})
        .limit(limit)
        .sort({ createdDate: "desc" })
        .populate([
          {
            path: "createdBy",
            model: "User"
          },
          { path: "messages.messageUser", model: "User" }
        ]);
      return posts;
    },
    getPostById: async (_, { postId }, { currentUser, Post }) => {
      const post = await Post.findById(postId).populate([
        {
          path: "createdBy",
          model: "User"
        },
        { path: "messages.messageUser", model: "User" }
      ]);
      return post;
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
    },
    infiniteScrollPosts: async (_, { pageNum, pageSize }, { Post }) => {
      let posts;
      if (pageNum === 1) {
        posts = await Post.find({})
          .sort({ createdDate: "desc" })
          .populate([
            { path: "createdBy", model: "User" },
            { path: "messages.messageUser", model: "User" }
          ])
          .limit(pageSize);
      } else {
        const skips = pageSize * (pageNum - 1);
        posts = await Post.find({})
          .sort({ createdDate: "desc" })
          .skip(skips)
          .populate({ path: "createdBy", model: "User" })
          .limit(pageSize);
      }

      const totalDocs = await Post.countDocuments();
      const hasMore = totalDocs > pageSize * pageNum;
      return { posts, hasMore };
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

    addPostMessage: async (
      _,
      { postId, messageBody, messageUserId },
      { Post }
    ) => {
      const newMessage = { messageBody, messageUser: messageUserId };
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: { messages: { $each: [newMessage], $position: 0 } }
        },
        { new: true }
      ).populate({ path: "messages.messageUser", model: "User" });

      return post.messages[0];
    },

    likePost: async (_, { postId, userId }, { Post }) => {
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likes: [userId] } },
        { new: true }
      );

      const userIds = post.likes;
      return { postId: post._id, userIds };
    },

    unlikePost: async (_, { postId, userId }, { Post }) => {
      const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true }
      );

      console.log(post);

      const userIds = post.likes;
      return { postId: post._id, userIds };
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
      if (!isValidPassword) {
        throw new Error("password is incorrect");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    }
  }
};
