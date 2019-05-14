import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary:"#26A69A",
    secondary:"#80CBC4",
    accent:'#EF5350',
    warning:'#D50000',
    error:'#FFC107',
    info:'#2979FF',
    success:'#1B5E20'
  }
})
