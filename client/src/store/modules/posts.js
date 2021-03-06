import { defaultClient as apolloClient } from "../../main";
import {
  ADD_POST,
  GET_POST_BY_ID,
  GET_POSTS,
  DELETE_POST,
  GET_FAVORITE_POSTS,
  INFINITE_SCROLL_POSTS,
  ADD_POST_MESSAGE,
  LIKE_POST,
  UNLIKE_POST,
  SEARCH_POSTS
} from "../../../queries";
import * as types from "../mutation-types";
import router from "../../router";

export const state = {
  postsAreLoading: false,
  posts: [],
  currentPost: null,
  postError: null,
  postMessageError: null,
  hasMore: false,
  searchResults: [],
  favoritePosts: []
};
const getters = {
  postsAreLoading: state => state.postsAreLoading,
  posts: state => state.posts,
  currentPost: state => state.currentPost,
  currentPostMessages: state =>
    state.currentPost ? state.currentPost.messages : [],
  searchResults: state => state.searchResults,
  favoritePosts: state => ({
    count: state.favoritePosts.length,
    posts: state.favoritePosts
  })
};
const actions = {
  addPostMessage({ commit }, payload) {
    commit(types.SET_POSTS_LOADING, true);
    const { postId } = payload;
    apolloClient
      .mutate({
        mutation: ADD_POST_MESSAGE,
        variables: payload
      })
      .then(({ data }) => {
        const { addPostMessage } = data;
        commit(types.SET_POST_MESSAGE_SUCCESS, {
          postId,
          message: addPostMessage
        });
      })
      .catch(e => {
        console.log(e);
        commit(types.SET_POST_MESSAGE_ERROR, e);
      })
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  addPost({ commit }, post) {
    commit(types.SET_POSTS_LOADING, true);
    console.log({ post });
    apolloClient
      .mutate({
        mutation: ADD_POST,
        variables: { post }
      })
      .then(({ data }) => {
        commit(types.ADD_POST_SUCCESS, data.addPost);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  deletePost({ commit }, postId) {
    console.log("deletePostACtion", postId);
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .mutate({
        mutation: DELETE_POST,
        variables: { postId }
      })
      .then(({ data }) => {
        commit(types.DELETE_POST_SUCCESS, data.deletePost);
      })
      .catch(e => console.log(e))
      .finally(() => {
        commit(types.SET_POSTS_LOADING, false);
      });
  },

  likePost({ commit }, payload) {
    apolloClient
      .mutate({ mutation: LIKE_POST, variables: payload })
      .then(({ data }) => {
        const { userIds, postId } = data.likePost;
        commit(types.LIKE_POST_SUCCESS, { userIds, postId });
      })
      .catch(e => console.log(e));
  },

  unlikePost({ commit }, payload) {
    apolloClient
      .mutate({ mutation: UNLIKE_POST, variables: payload })
      .then(({ data }) => {
        const { userIds, postId } = data.unlikePost;
        commit(types.LIKE_POST_SUCCESS, { userIds, postId });
      })
      .catch(e => console.log(e));
  },

  infiniteScrollPosts({ commit }, payload) {
    apolloClient
      .query({
        query: INFINITE_SCROLL_POSTS,
        variables: payload
      })
      .then(({ data }) => {
        const { hasMore, posts } = data.infiniteScrollPosts;
        commit(types.SET_MERGE_POSTS, { hasMore, posts });
      })
      .catch(e => console.log(e))
      .finally();
  },

  getPosts: ({ commit }, payload) => {
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .query({
        query: GET_POSTS,
        variables: payload
      })
      .then(({ data }) => {
        commit(types.SET_POSTS_LOADING, false);
        commit(types.SET_POSTS, data.getPosts);
      })
      .catch(e => {
        // eslint-disable-next-line
        console.error(e);
        commit(types.SET_POSTS_LOADING, false);
      });
  },

  getPostById({ commit }, postId) {
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .query({
        query: GET_POST_BY_ID,
        variables: { postId }
      })
      .then(({ data }) => {
        commit(types.SET_CURRENT_POST_SUCCESS, data.getPostById);
      })
      .catch(e => {
        console.log(e);
        commit(types.SET_POST_ERROR, e);
      })
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  searchPosts({ commit }, payload) {
    apolloClient
      .query({ query: SEARCH_POSTS, variables: payload })
      .then(({ data }) => {
        if (data.searchPosts) {
          commit(types.SEARCH_POSTS_SUCCESS, data.searchPosts);
        }
      })
      .catch(e => console.log(e));
  },
  getFavoritePosts({ commit }, userId) {
    apolloClient
      .query({
        query: GET_FAVORITE_POSTS,
        variables: { userId }
      })
      .then(({ data }) => {
        commit(types.SET_FAVORITE_POSTS_SUCCESS, data.getFavoritePosts);
      })
      .catch(e => console.log(e))
      .finally();
  },
  clearSearchResults({ commit }) {
    commit(types.SEARCH_POSTS_SUCCESS, []);
  }
};
export const mutations = {
  [types.SET_POSTS]: (state, payload) => (state.posts = payload),
  [types.SET_LOG_OUT_SUCCESS]: state => (state.posts = []),
  [types.SET_POSTS_LOADING]: (state, payload) =>
    (state.postsAreLoading = payload),
  [types.SET_CURRENT_POST_SUCCESS]: (state, payload) =>
    (state.currentPost = payload),
  [types.ADD_POST_SUCCESS]: (state, payload) =>
    (state.posts = [payload, ...state.posts]),
  [types.SET_POST_ERROR]: (state, error) => (state.postError = error),
  [types.SET_POST_MESSAGE_ERROR]: (state, error) =>
    (state.postMessageError = error),
  [types.SET_MERGE_POSTS]: (state, { hasMore, posts }) => {
    state.hasMore = hasMore;
    state.posts = [...state.posts, ...posts];
  },
  [types.SET_POST_MESSAGE_SUCCESS]: (state, payload) => {
    state.postMessageError = null;
    const { postId, message } = payload;
    state.currentPost.messages = [].concat(
      message,
      ...state.currentPost.messages
    );
    const postToUpdate = state.posts.find(p => p._id === postId);
    postToUpdate.messages = [message, ...postToUpdate.messages];
  },
  [types.LIKE_POST_SUCCESS]: (state, { postId, userIds }) => {
    const postToUpdate = state.posts.find(p => p._id === postId);
    postToUpdate.likes = userIds;
    if (state.currentPost._id === postId) {
      state.currentPost.likes = userIds;
    }
  },
  [types.SEARCH_POSTS_SUCCESS]: (state, payload) =>
    (state.searchResults = payload),
  [types.DELETE_POST_SUCCESS]: (state, postId) => {
    state.posts = state.posts.filter(p => p._id !== postId);
  },
  [types.SET_FAVORITE_POSTS_SUCCESS]: (state, posts) =>
    (state.favoritePosts = posts)
};
export default {
  state,
  getters,
  actions,
  mutations
};
