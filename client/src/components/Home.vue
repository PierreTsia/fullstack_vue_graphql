<template>
  <v-container text-xs-center>
    <v-layout row v-show="isLoading">
      <v-container fill-height>
        <v-flex xs12>
          <v-progress-circular
            color="secondary"
            indeterminate
            :width="7"
            :size="70"
          ></v-progress-circular>
        </v-flex>
      </v-container>
    </v-layout>
    <v-flex xs12 v-if="posts && !isLoading">
      <v-carousel v-bind="{ cycle: true }" interval="3000">
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
          :value="post"
        >
          <h1 class="carousel_title">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getPosts"]),
    handleGetCarouselContent() {
      this.getPosts();
    }
  },
  computed: {
    ...mapGetters(["posts", "isLoading"])
  },
  mounted() {
    this.handleGetCarouselContent();
  }
};
</script>
<style lang="stylus">
.carousel_title
  width 100%
  position absolute
  bottom 50px
  color white
  background-color rgba(0 0 0 0.5)
  border-radius 5px 5px 0 0
  padding 0.5em
</style>
