<template>
  <v-app>
    <!-- Side Navbar -->
    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
      class="secondary"
    >
      <v-toolbar color="secondary" flat dark>
        <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
        <router-link
          to="/"
          span="tag"
          style="cursor: pointer; text-decoration: none;"
        >
          <h1 class="white--text title pl-3">
            <IconCloud class="icon icon-big icon-info" />
          </h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>

      <!--Side nav links-->
      <v-list dark>
        <v-list-tile
          riple
          v-for="(item, index) in sideNavItems"
          :key="index"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          class="logout"
          vriple
          dark
          v-if="isAuth"
          @click="handleSignoutUser"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- Signout Button -->
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App Title -->
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          <IconCloud class="icon icon-big icon-info" />
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <!-- Profile Button -->
      <v-btn flat to="/profile" v-if="isAuth" class="hidden-xs-only">
        <v-icon class="hidden-sm-only" left>account_box</v-icon>
        <v-badge right color="blue darken-2">
          <!-- <span slot="badge"></span> -->
          Profile
        </v-badge>
      </v-btn>

      <!-- Signout Button -->
      <v-btn
        flat
        v-if="isAuth"
        @click="handleSignoutUser"
        class="hidden-xs-only"
      >
        <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
        Signout
      </v-btn>
    </v-toolbar>

    <!-- App Content -->
    <main class="fill-height info">
      <v-container class="appContainer">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
      <template v-if="isSnackShown">
        <v-snackbar v-model="showSnack" color="black" bottom center>
          <h3 class="caption">{{snackProps.message}}</h3>
          <v-btn dark flat color="pink" @click="showSnack = !showSnack">close</v-btn>
        </v-snackbar>
      </template>

      <v-snackbar v-model="authSnackbar" color="success" bottom right>
        <h3 class="caption">👌You're now signed in as {{ userName }}</h3>
        <v-btn dark flat @click="authSnackbar = !authSnackbar">close</v-btn>
      </v-snackbar>

      <v-snackbar v-model="authErrorSnackbar" color="error" bottom right>
        <span v-if="authError" class="caption">🙈{{ authError.message }}</span>
        <v-btn dark flat @click="authErrorSnackbar = !authErrorSnackbar"
          >close</v-btn
        >
      </v-snackbar>
    </main>
  </v-app>
</template>

<script>
import SnackBar from "@/components/utils/SnackBar";
import { IconCloud } from "@/components/utils/icons";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      showSnack: true,
    };
  },
  components: {
    SnackBar,
    IconCloud
  },
  computed: {
    ...mapGetters(["snackProps", "isAuth", "me", "loginError", "authError", "isSnackShown"]),
    sideNavItems() {
      return this.isAuth
        ? [
            { icon: "account_box", title: "Profile", link: "/profile" },
            { icon: "chat", title: "Posts", link: "/posts" },
            { icon: "stars", title: "Create post", link: "/post/add" }
          ]
        : [
            { icon: "create", title: "Sign Up", link: "/signup" },
            { icon: "lock_open", title: "Sign In", link: "/signin" }
          ];
    },
    horizontalNavItems() {
      return this.isAuth
        ? [{ icon: "chat", title: "Posts", link: "/posts" }]
        : [
            { icon: "lock_open", title: "Sign In", link: "/signin" },
            { icon: "create", title: "Sign Up", link: "/signup" }
          ];
    },
    userName() {
      return (this.me && this.me.username) || "";
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleSignoutUser() {
      this.logout();
    }
  },
  watch: {
    me: {
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue === null && newValue) {
          this.authSnackbar = true;
        }
      }
    },
    authError: {
      immediate: true,
      handler(error) {
        if (error) {
          this.authErrorSnackbar = true;
        }
      }
    }
  }
};
</script>
<style lang="stylus">
.fade-enter-active,
.fade-leave-active
  transition-property all
  transition-duration 0.2s

.fade-enter-active
  transition-delay 0.2s

.fade-enter,
.fade-leave-active
  opacity 0
  transform translateX(-25px)

.v-list
    .logout
      cursor pointer
      &:hover
        background-color rgba(#b3d4fc, 0.1)

.info
  margin-top 64px
  .appContainer
    display flex
    align-items flex-start
    flex-direction row
</style>
