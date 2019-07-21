<template>
  <div class="posts">
    <div class="postsGrid">
      <PostCardItem
        v-for="post in posts"
        :key="post._id"
        :item="post"
        @onDeleteClick="handleDeletePost"
      />
    </div>
    <div class="showMore">
      <v-btn fab large color="primary" @click="showMorePosts">
        <v-icon dark>
          add
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostCardItem from "@/components/Posts/PostCardItem";

export default {
  name: "Posts",
  components: {
    PostCardItem
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      showMoreEnabled: false
    };
  },
  watch: {},
  mounted() {
    if (!this.posts.length) {
      this.getPosts({ limit: this.pageSize });
    }
  },
  computed: {
    ...mapGetters(["posts"])
  },
  methods: {
    ...mapActions(["getPosts", "infiniteScrollPosts", "deletePost"]),

    async handleDeletePost(postId) {
      console.log(postId);
      await this.deletePost(postId);
    },

    showMorePosts() {
      this.pageNum += 1;
      this.infiniteScrollPosts({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    }
  }
};
</script>

<style lang="stylus">
.posts
  min-height calc(100vh - 64px)
  width 100%
  .postsGrid
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 25px;
    grid-auto-rows: minmax(180px, auto);
    grid-auto-flow: dense;
    padding: 10px;
    .postCard
      display flex
      flex-direction column

      .postImage
        flex-grow 1
       .postTitle
          display flex
          flex-direction column
          justify-content center
          align-items flex-start
          h3
            display: block
            overflow hidden
            text-overflow ellipsis
            max-width: 100%
            white-space nowrap
            &.--isLarge
              max-height 80px
              overflow hidden
              text-overflow ellipsis
            &.--isSmall
              max-height 80px

          .description
            overflow hidden
            text-overflow ellipsis
            max-width: 100%
            &.--isLarge
              white-space wrap
              max-height 150px
            &.--isSmall
              max-height 60px
              white-space nowrap


      .cardContent
            display flex
            justify-content flex-start
            align-items center
            width 100%
          .postShowMoreInfos
             margin-left auto
          .postTitle__infos
            padding 0 0 0 10px
            &:first-child
              border-right 1px solid lightgrey
              padding 0 10px 0 0


  .showMore
    position fixed
    left 50px
    bottom 100px
</style>
