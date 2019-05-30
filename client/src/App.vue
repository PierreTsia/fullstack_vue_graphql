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
          <h1 class="white--text title pl-3">VueShare</h1>
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
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App Title -->
      <v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
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
    </v-toolbar>

    <!-- App Content -->
    <main class="pt-2 mt-5 fill-height info">
      <v-container>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      horizontalNavItems: [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ],
      sideNavItems: [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ]
    };
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
</style>
