import { defaultClient as apolloClient } from "../../main";
import { GET_CURRENT_USER, SIGNIN_USER } from "../../../queries";
import router from "../../router";
import * as types from "../mutation-types";

export const state = {
  isLoading: false,
  currentUser: null
};
const getters = {
  userIsLoading: state => state.isLoading,
  me: state => state.currentUser
};
const actions = {
  getCurrentUser: ({ commit }) => {
    commit(types.SET_USER_LOADING, true);
    apolloClient
      .query({
        query: GET_CURRENT_USER
      })
      .then(({ data }) => {
        commit(types.SET_CURRENT_USER, data.getCurrentUser);
        commit(types.SET_USER_LOADING, false);
      })
      .catch(e => {
        console.log(e);
        commit(types.SET_USER_LOADING, false);
      });
  },
  loginUser: ({ commit }, payload) => {
    commit(types.SET_USER_LOADING, true);
    apolloClient
      .mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
      .then(({ data }) => {
        const { token } = data.signinUser;
        localStorage.setItem("token", token);
        router.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  }
};
export const mutations = {
  [types.SET_USER_LOADING]: (state, payload) => (state.isLoading = payload),
  [types.SET_CURRENT_USER]: (state, payload) => (state.currentUser = payload)
};
export default {
  state,
  getters,
  actions,
  mutations
};
