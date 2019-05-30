<template>
  <v-container text-xs-center v-if="getPosts">
    <v-flex xs12>
      <v-carousel
         v-bind="{ 'cycle': true }"
         interval="3000">
         <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl" :value="post">
            <h1 class="carousel_title">{{ post.title }}</h1>
         </v-carousel-item>
      </v-carousel>
    </v-flex>

  </v-container>
</template>

<script>
  import { gql } from "apollo-boost";

  export default {
    name: "home",
    data(){
      return {
        posts: []
      }
    },
    apollo: {
      getPosts: {
        query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,
        result({ data, loading }) {
          if(!loading) {
            this.posts = data.getPosts
          }
        },
        error(err){
          console.error('[ERROR!!]', err)
          console.dir(err)
        }
      }
    },
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
