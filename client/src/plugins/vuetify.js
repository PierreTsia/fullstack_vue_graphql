import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
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
