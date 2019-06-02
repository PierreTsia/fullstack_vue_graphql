import { defaultClient as apolloClient } from "../../main";
import {
  ADD_POST,
  GET_POST_BY_ID,
  GET_POSTS,
  SIGNIN_USER,
  INFINITE_SCROLL_POSTS,
  ADD_POST_MESSAGE
} from "../../../queries";
import * as types from "../mutation-types";
import router from "../../router";

export const state = {
  postsAreLoading: false,
  posts: [],
  currentPost: null,
  postError: null,
  postMessageError: null,
  hasMore: false
};
const getters = {
  postsAreLoading: state => state.postsAreLoading,
  posts: state => state.posts,
  currentPost: state => state.currentPost,
  currentPostMessages: state =>
    state.currentPost ? state.currentPost.messages : []
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
        console.log("data", data);
        const { addPostMessage } = data;
        console.log("addpostyMess", addPostMessage);
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

  addPost({ commit }, payload) {
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .mutate({
        mutation: ADD_POST,
        variables: payload
      })
      .then(({ data }) => {
        commit(types.ADD_POST_SUCCESS, data.addPost);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  infiniteScrollPosts({ commit }, payload) {
    apolloClient
      .query({
        query: INFINITE_SCROLL_POSTS,
        variables: payload
      })
      .then(({ data }) => {
        console.log(data);
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
  }
};
export const mutations = {
  [types.SET_POSTS]: (state, payload) => (state.posts = payload),
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
    console.log("args", message, postId);

    state.currentPost.messages = [].concat(
      message,
      ...state.currentPost.messages
    );
    const postToUpdate = state.posts.find(p => p._id === postId);
    postToUpdate.messages = [message, ...postToUpdate.messages];
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
