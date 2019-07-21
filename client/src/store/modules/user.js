import { defaultClient as apolloClient } from "../../main";
import { GET_CURRENT_USER, SIGNIN_USER, SIGNUP_USER, } from "../../../queries";
import router from "../../router";
import * as types from "../mutation-types";

export const state = {
  isLoading: false,
  currentUser: null,
  error: null,
  authError: null,
  signupError: null
};
const getters = {
  userIsLoading: state => state.isLoading,
  me: state => state.currentUser,
  isAuth: state => !!state.currentUser,
  loginError: state => state.error,
  authError: state => state.authError,
  signupError: state => state.signupError
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
      })
      .finally(() => commit(types.SET_USER_LOADING, false));
  },
  loginUser: ({ commit, dispatch }, payload) => {
    commit(types.SET_USER_LOADING, true);
    commit(types.SET_LOGIN_ERROR, null);

    localStorage.setItem("token", "");

    apolloClient
      .mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
      .then(({ data }) => {
        const { token } = data.signinUser;
        localStorage.setItem("token", token);
        commit(types.SET_LOGIN_SUCCESS);

        router.go();
      })
      .catch(e => {
        console.log(e);
        commit(types.SET_LOGIN_ERROR, e);
      })
      .finally(() => commit(types.SET_USER_LOADING, false));
  },
  async logout({ commit }) {
    localStorage.setItem("token", "");
    commit(types.SET_CURRENT_USER, null);
    await apolloClient.resetStore();
    router.push("/");
    commit(types.SET_LOG_OUT_SUCCESS);
  },

  signupUser({ commit }, payload) {
    commit(types.SET_USER_LOADING, true);
    commit(types.SET_SIGNUP_ERROR, null);
    apolloClient
      .mutate({ mutation: SIGNUP_USER, variables: payload })
      .then(({ data }) => {
        const { token } = data.signupUser;
        localStorage.setItem("token", token);
        commit(types.SET_SIGNUP_SUCCESS);
        router.go();
      })
      .catch(e => {
        commit(types.SET_SIGNUP_ERROR, e);
      })
      .finally(() => commit(types.SET_USER_LOADING, false));
  }
};
export const mutations = {
  [types.SET_USER_LOADING]: (state, payload) => (state.isLoading = payload),
  [types.SET_CURRENT_USER]: (state, payload) => (state.currentUser = payload),
  [types.SET_LOGIN_ERROR]: (state, payload) => (state.error = payload),
  [types.SET_LOGIN_SUCCESS]: state => (state.error = null),
  [types.SET_SIGNUP_SUCCESS]: state => (state.signupError = null),
  [types.SET_AUTH_ERROR]: (state, payload) => (state.authError = payload),
  [types.SET_SIGNUP_ERROR]: (state, payload) => (state.signupError = payload)
};
export default {
  state,
  getters,
  actions,
  mutations
};
