<template>
  <v-container text-xs-center>
    <v-layout
      v-show="postsAreLoading"
      row
    >
      <v-container>
        <v-flex xs12>
          <v-progress-circular
            color="secondary"
            indeterminate
            :width="7"
            :size="70"
          />
        </v-flex>
      </v-container>
    </v-layout>
    <v-flex
      v-if="posts.length && !postsAreLoading"
      xs12
    >
      <v-carousel
        v-bind="{ cycle: true }"
        interval="3000"
      >
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
          :value="post"
        >
          <h1 class="carousel_title">
            {{ post.title }}
          </h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },

  methods: {
    ...mapActions(["getPosts"]),
    handleGetCarouselContent() {
      this.getPosts({ limit: 5 });
    }
  },
  computed: {
    ...mapGetters(["posts", "postsAreLoading"])
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
