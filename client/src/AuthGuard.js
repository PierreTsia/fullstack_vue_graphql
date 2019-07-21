import store from "./store/index";

export default (to, from, next) => {
  console.log(store.getters.isAuth);
  if (!store.getters.isAuth) {
    next({ path: "/signin" });
  } else {
    next();
  }
};
