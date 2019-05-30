import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
import { GET_POSTS } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  getters: {
    posts: state => state.posts,
    isLoading: state => state.loading
  },
  mutations: {
    setPosts: (state, payload) => (state.posts = payload),
    setLoading: (state, payload) => (state.loading = payload)
  },
  actions: {
    getPosts: ({ commit }) => {
      commit("setLoading", true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit("setLoading", false);
          commit("setPosts", data.getPosts);
        })
        .catch(e => {
          // eslint-disable-next-line
          console.error(e);
          commit("setLoading", false);
        });
    }
  }
});
