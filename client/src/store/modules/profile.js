import { defaultClient as apolloClient } from "../../main";
import { ADD_PROFILE, SIGNIN_USER } from "../../../queries";
import * as types from "../mutation-types";
import { consoleError } from "vuetify/lib/util/console";

export const state = {
  isLoading: false,
  error: null
};
const getters = {};
const actions = {
  createProfile({ commit }, payload) {
    console.log(payload);
    apolloClient
      .mutate({
        mutation: ADD_PROFILE,
        variables: { profile: { ...payload } }
      })
      .then(({ data }) => {
        console.log(data.addProfile);
        commit(types.CREATE_PROFILE_SUCESS, { profile: data.addProfile });
      })
      .catch(e => console.warn(e));
  }
};

export const mutations = {};
export default {
  state,
  getters,
  actions,
  mutations
};
