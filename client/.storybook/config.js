import { configure } from "@storybook/vue";

import Vue from "vue";

// Import Vue plugins
import Vuex from "vuex";

// Import your global components.

// Install Vue plugins.
Vue.use(Vuex);

// Register global components.

function loadStories() {
  const req = require.context("./../stories", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
