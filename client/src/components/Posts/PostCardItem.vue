<template>
  <v-card :id="item._id" :key="item._id" hover class="postCard" height="400">
    <v-img
      lazy
      class="postImage"
      :src="item.imageUrl"
      aspect-ratio="2.75"
      :style="{
        height: showMoreInfo ? '80px' : 'auto'
      }"
      @click="handlePostClick(item)"
    />
    <v-card-title class="postTitle" primary-title>
      <h3
        :class="[
          'font-weight-bold',
          'headline',
          'mb-0',
          showMoreInfo ? '--isLarge' : '--isSmall'
        ]"
      >
        {{ item.title }}
      </h3>
      <div :class="['description', showMoreInfo ? '--isLarge' : '--isSmall']">
        {{ item.description }}
      </div>
      <div class="cardContent font-weight-regular secondary--text mt-2">
        <span class="postTitle__infos">{{ item.likes.length }} likes</span>
        <span class="postTitle__infos"
          >{{ item.messages.length }} comments</span
        >
        <div class="postShowMoreInfos">
          <v-btn
            v-if="userIsAuthor(item)"
            flat
            icon
            @click="$emit('onDeleteClick', item._id)"
            ><v-icon small>delete</v-icon></v-btn
          >
          <v-btn flat icon @click="showMoreInfo = !showMoreInfo">
            <v-icon v-if="showMoreInfo">
              expand_more
            </v-icon>
            <v-icon v-else>
              expand_less
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-title>
    <v-layout v-if="showMoreInfo" row align-end justify-start class="pl-4 pb-4">
      <v-avatar :size="36" color="grey lighten-4" class="mr-4">
        <img :src="item.createdBy.avatar" alt="avatar" />
      </v-avatar>
      <span class="subheading pb-1">{{ item.createdBy.username }}</span>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PostCardItem",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showMoreInfo: false
    };
  },
  computed: {
    ...mapGetters(["me"])
  },
  methods: {
    userIsAuthor(post) {
      return post.createdBy._id === this.me._id;
    },
    handlePostClick(item) {
      this.$router.push(`post/${item._id}`);
    }
  }
};
</script>

<style scoped></style>
