import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Posts from "./components/Posts/Posts";
import AddPost from "./components/Posts/AddPost";
import Profile from "./components/Auth/Profile";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import AuthGuard from "./AuthGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/posts",
      name: "posts",
      component: Posts
    },
    {
      path: "/post/add",
      name: "addPost",
      component: AddPost,
      beforeEnter: AuthGuard
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ]
});
