import { defaultClient as apolloClient } from "../../main";
import { GET_POSTS } from "../../../queries";
import * as types from "../mutation-types";

export const state = {
  postsAreLoading: false,
  posts: []
};
const getters = {
  postsAreLoading: state => state.postsAreLoading,
  posts: state => state.posts
};
const actions = {
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
