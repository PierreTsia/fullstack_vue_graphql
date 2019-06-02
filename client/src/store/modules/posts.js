import { defaultClient as apolloClient } from "../../main";
import {
  ADD_POST,
  GET_POST_BY_ID,
  GET_POSTS,
  SIGNIN_USER,
  ADD_POST_MESSAGE
} from "../../../queries";
import * as types from "../mutation-types";
import router from "../../router";

export const state = {
  postsAreLoading: false,
  posts: [],
  currentPost: null,
  postError: null,
  postMessageError: null
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
    apolloClient
      .mutate({
        mutation: ADD_POST_MESSAGE,
        variables: payload
      })
      .then(({ data }) => {
        console.log(data);
        commit(types.SET_POST_MESSAGE_SUCCESS, data.addPostMessage);
      })
      .catch(e => commit(types.SET_POST_MESSAGE_ERROR, e))
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  addPost({ commit }, payload) {
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, { data: { addPost } }) => {
          const data = cache.readQuery({ query: GET_POSTS });
          data.getPosts.unshift(addPost);
          cache.writeQuery({ query: GET_POSTS, data });
        },
        optimisticResponse: {
          __typename: "Mutation",
          addPost: {
            __typename: "Post",
            _id: -1,
            ...payload
          }
        }
      })
      .then(({ data }) => {
        console.log(data);
        commit(types.ADD_POST_SUCCESS, data.addPost);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => commit(types.SET_POSTS_LOADING, false));
  },

  getPosts: ({ commit }) => {
    commit(types.SET_POSTS_LOADING, true);
    apolloClient
      .query({
        query: GET_POSTS
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
    console.log("action", postId);
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
  [types.SET_POST_ERROR]: (state, error) => (state.postError = error),
  [types.SET_POST_MESSAGE_ERROR]: (state, error) =>
    (state.postMessageError = error),
  [types.SET_POST_MESSAGE_SUCCESS]: (state, payload) => {
    state.postMessageError = null;
    state.currentPost.messages = [].concat(
      payload,
      ...state.currentPost.messages
    );
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
