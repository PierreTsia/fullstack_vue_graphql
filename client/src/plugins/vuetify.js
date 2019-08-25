import Vue from "vue";
import Vuetify from "vuetify/lib";
import {
  VTextField,
  VTooltip,
  VToolbar,
  VTabItem,
  VTab,
  VTabs,
  VCard,
  VIcon,
  VBtn,
  VBtnToggle
} from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import styles
import "tiptap-vuetify/dist/main.css";

Vue.use(Vuetify, {
  components: {
    VTextField,
    VTooltip,
    VToolbar,
    VCard,
    VTab,
    VTabItem,
    VTabs,
    VIcon,
    VBtn,
    VBtnToggle
  },
  iconfont: "md",
  theme: {
    primary: "#1d3557",
    secondary: "#457b9d",
    accent: "#a8dadc",
    warning: "#FFE66D",
    error: "#e63946",
    info: "#f1faee",
    success: "#4E937A"
  }
});

Vue.use(TiptapVuetifyPlugin, {
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "md"
});
