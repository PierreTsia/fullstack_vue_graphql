import * as types from "../mutation-types";

export const state = {
  isLoading: false,
  isSnackShown: false,
  snackProps: {}
};
const getters = {
  isAppLoading: state => state.isLoading,
  isSnackShown: state => state.isSnackShown,
  snackProps: state => state.snackProps
};
export const actions = {};
export const mutations = {
  [types.ADD_POST_SUCCESS]: (state, payload) => {
    const { title } = payload;

    state.snackProps = {
      success: true,
      message: `${title} added successfully`
    };
    state.isSnackShown = true;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
