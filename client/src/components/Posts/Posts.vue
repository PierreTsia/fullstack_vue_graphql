<template>
  <div class="posts">
    <div class="postsGrid">
      <v-card
        v-for="(item, index) in posts"
        :id="index"
        :key="item._id"
        hover
        class="postCard"
        height="400"
      >
        <v-img
          lazy
          class="postImage"
          :src="item.imageUrl"
          aspect-ratio="2.75"
          :style="{
            height: isMorePostInfosShown(item._id) ? '80px' : 'auto'
          }"
          @click="handlePostClick(item)"
        />
        <v-card-title
          class="postTitle"
          primary-title
        >
          <h3
            :class="[
              'font-weight-bold',
              'headline',
              'mb-0',
              isMorePostInfosShown(item._id) ? '--isLarge' : '--isSmall'
            ]"
          >
            {{ item.title }}
          </h3>
          <div
            :class="[
              'description',
              isMorePostInfosShown(item._id) ? '--isLarge' : '--isSmall'
            ]"
          >
            {{ item.description }}
          </div>
          <div class="cardContent font-weight-regular secondary--text mt-2">
            <span class="postTitle__infos">{{ item.likes.length }} likes</span>
            <span
              class="postTitle__infos"
            >{{ item.messages.length }} comments</span>
            <div class="postShowMoreInfos">
              <v-btn
                flat
                icon
                @click="showMorePostInfos(item._id)"
              >
                <v-icon
                  v-if="isMorePostInfosShown(item._id)"
                  class=""
                >
                  expand_more
                </v-icon>
                <v-icon
                  v-else
                  class=""
                >
                  expand_less
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-layout
          v-if="isMorePostInfosShown(item._id)"
          row
          align-end
          justify-start
          class="pl-4 pb-4"
        >
          <v-avatar
            :size="36"
            color="grey lighten-4"
            class="mr-4"
          >
            <img
              :src="item.createdBy.avatar"
              alt="avatar"
            >
          </v-avatar>
          <span class="subheading pb-1">{{ item.createdBy.username }}</span>
        </v-layout>
      </v-card>
    </div>
    <div class="showMore">
      <v-btn
        fab
        large
        color="primary"
        @click="showMorePosts"
      >
        <v-icon dark>
          add
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      showMoreEnabled: false,
      showMoreInfoPostIds: []
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
    ...mapActions(["getPosts", "infiniteScrollPosts"]),
    handlePostClick(item) {
      this.$router.push(`post/${item._id}`);
    },

    showMorePostInfos(postId) {
      this.showMoreInfoPostIds = this.showMoreInfoPostIds.includes(postId)
        ? this.showMoreInfoPostIds.filter(id => id !== postId)
        : [...this.showMoreInfoPostIds, postId];
    },

    showMorePosts() {
      this.pageNum += 1;
      this.infiniteScrollPosts({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    },
    isMorePostInfosShown(postId) {
      return this.showMoreInfoPostIds.includes(postId);
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
