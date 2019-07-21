const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { partition } = require("lodash");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    /*
|--------------------------------------------------------------------------
|                      QUERIES POSTS
|--------------------------------------------------------------------------
*/
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
    getPostById: async (_, { postId }, { currentUser, Post, Tag }) => {
      const post = await Post.findById(postId).populate([
        {
          path: "createdBy",
          model: "User"
        },
        {
          path: "categories",
          model: "Tag"
        },
        { path: "messages.messageUser", model: "User" }
      ]);
      return post;
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
    },
    searchPosts: async (_, { searchTerm }, { Post }) => {
      if (searchTerm) {
        const searchResults = await Post.find(
          // Perform text search for search value of 'searchTerm'
          { $text: { $search: searchTerm } },
          // Assign 'searchTerm' a text score to provide best match
          { score: { $meta: "textScore" } }
          // Sort results according to that textScore (as well as by likes in descending order)
        )
          .sort({
            score: { $meta: "textScore" },
            likes: "desc"
          })
          .limit(5);
        return searchResults;
      }
    },

    getFavoritePosts: async (_, { userId }, { Post }) => {
      const posts = await Post.find({ likes: userId }).populate([
        { path: "createdBy", model: "User" },
        { path: "categories", model: "Tag" }
      ]);
      return posts;
    },

    /*
|--------------------------------------------------------------------------
|                    QUERIES   USER
|--------------------------------------------------------------------------
*/
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
    /*
|--------------------------------------------------------------------------
|                     QUERIES  TAGS
|--------------------------------------------------------------------------
*/
    getTags: async (_, args, { Tag }) => {
      const tags = await Tag.find({});
      return tags;
    }
  },

  /*
|--------------------------------------------------------------------------
|                     MUTATION   POSTS
|--------------------------------------------------------------------------
*/
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, description, categories, newTagsLabels, creatorId },
      { Post, Tag }
    ) => {
      const tags = categories;
      for (const tag of newTagsLabels) {
        const newTag = await new Tag({ label: tag, color: "primary" }).save();
        tags.push(newTag._id);
      }
      const newPost = await new Post({
        title,
        imageUrl,
        description,
        categories: tags,
        createdBy: creatorId
      }).save();
      return newPost;
    },
    deletePost: async (_, { postId }, { Post, User, currentUser }) => {
      if (!currentUser) {
        throw new Error("Unauthorized: No user found ");
      }
      const user = await User.findOne({
        username: currentUser.username
      });
      console.log("user", user);
      const post = await Post.findById(postId);
      console.log("post", post);
      if (!post) {
        throw new Error("No post found");
      }
      if (!post.createdBy.equals(user._id)) {
        console.log("post createdBy", post.createdBy);
        console.log("userId", user._id);
        throw new Error("Unauthorized : must be creator to delete post");
      }

      const deletedPost = await Post.deleteOne({ _id: postId });
      console.log(deletedPost);
      if (deletedPost.deletedCount === 1) {
        return postId;
      } else {
        throw new Error("Failed");
      }
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
      const userIds = post.likes;
      return { postId: post._id, userIds };
    },

    /*
|--------------------------------------------------------------------------
|                    MUTATIONS   USERS
|--------------------------------------------------------------------------
*/
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
    },

    /*
|--------------------------------------------------------------------------
|                  MUTATION TAGS
|--------------------------------------------------------------------------
*/

    addNewTag: async (_, { label, color }, { Tag, User, currentUser }) => {
      if (!currentUser) {
        return new Error(
          "Unauthorized : must be signed in to register a new tag"
        );
      }

      const newTag = await new Tag({
        label,
        color
      }).save();
      return newTag;
    }
  }
};
