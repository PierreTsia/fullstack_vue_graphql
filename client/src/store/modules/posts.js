import { defaultClient as apolloClient } from "../../main";
import { ADD_POST, GET_POSTS, SIGNIN_USER } from "../../../queries";
import * as types from "../mutation-types";
import router from "../../router";

export const state = {
  postsAreLoading: false,
  posts: []
};
const getters = {
  postsAreLoading: state => state.postsAreLoading,
  posts: state => state.posts
};
const actions = {
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
  }
};
export const mutations = {
  [types.SET_POSTS]: (state, payload) => (state.posts = payload),
  [types.SET_POSTS_LOADING]: (state, payload) =>
    (state.postsAreLoading = payload)
};
export default {
  state,
  getters,
  actions,
  mutations
};
