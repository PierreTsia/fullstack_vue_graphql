import Vue from "vue";
import Vuex from "vuex";
import { defaultClient as apolloClient } from "./main";
import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from "../queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    postsLoading: false,
    userLoading: false,
    currentUser: null
  },
  getters: {
    posts: state => state.posts,
    isLoading: state => state.postsLoading,
    me: state => state.currentUser
  },
  mutations: {
    setPosts: (state, payload) => (state.posts = payload),
    setPostsLoading: (state, payload) => (state.postsLoading = payload),
    setUserLoading: (state, payload) => (state.userLoading = payload),
    setCurrentUser: (state, payload) => (state.currentUser = payload)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit("setUserLoading", true);
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          commit("setCurrentUser", data.getCurrentUser);
          commt("setUserLoading", false);
        })
        .catch(e => {
          console.log(e);
          commit("setUserLoading", false);
        });
    },
    loginUser: ({ commit }, payload) => {
      commit("setUserLoading", true);
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          console.log(data);
          const { token } = data.signinUser;
          console.log(token);
          localStorage.setItem("token", token);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPosts: ({ commit }) => {
      commit("setPostsLoading", true);
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit("setPostsLoading", false);
          commit("setPosts", data.getPosts);
        })
        .catch(e => {
          // eslint-disable-next-line
          console.error(e);
          commit("setPostsLoading", false);
        });
    }
  }
});
