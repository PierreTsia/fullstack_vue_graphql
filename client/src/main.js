import "@babel/polyfill";
import Vue from "vue";
import DateService from "@/services/DateService";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as types from "./store/mutation-types";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import FormAlert from "@/components/utils/FormAlert";

Vue.component("form-alert", FormAlert);

Vue.use(VueApollo);
Vue.prototype.$date = new DateService(() => "en");

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // auth headers
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[NETWORK ERROR]", networkError);
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        if (err.name === "AuthenticationError") {
          store.commit(types.SET_AUTH_ERROR, err);
          store.dispatch("logout");
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  created() {
    this.$store.dispatch("getCurrentUser");
  },
  render: h => h(App)
}).$mount("#app");
