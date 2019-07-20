import { defaultClient as apolloClient } from "../../main";
import { GET_TAGS } from "../../../queries";
import router from "../../router";
import * as types from "../mutation-types";
import _ from "lodash";

export const state = {
  allTags: []
};
const getters = {
  tags: state => state.allTags
};
const actions = {
  getTags: ({ commit }) => {
    apolloClient
      .query({
        query: GET_TAGS
      })
      .then(({ data }) => {
        commit(types.SET_ALL_TAGS, data.getTags);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
export const mutations = {
  [types.SET_ALL_TAGS]: (state, payload) => (state.allTags = payload)
};
export default {
  state,
  getters,
  actions,
  mutations
};
