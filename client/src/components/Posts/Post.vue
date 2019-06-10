<template>
  <v-container v-if="currentPost" class="mt-3" flexbox center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{ currentPost.title }}</h1>
            <v-spacer />
            <v-btn v-if="me" large icon @click="handleLikePost(currentPost)">
              <v-icon
                large
                :color="userHasLikedPost(currentPost) ? 'error' : 'grey'"
              >
                favorite
              </v-icon>
            </v-btn>
            <h3 class="ml-3 mr-3 font-weight-thin">
              {{ currentPost.likes.length }} LIKES
            </h3>
            <v-icon
              large
              class="ml-3"
              color="primary"
              @click="goToPreviousPage"
            >
              arrow_back
            </v-icon>
          </v-card-title>
          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img
              id="post__image"
              slot="activator"
              :src="currentPost.imageUrl"
              @click="toggleDialog"
            />
          </v-tooltip>
          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="currentPost.imageUrl" height="80vh" />
            </v-card>
          </v-dialog>
          <v-card-text>
            <span
              v-for="(category, index) in currentPost.categories"
              :key="index"
            >
              <v-chip class="mb-3" color="error" text-color="white">{{
                category
              }}</v-chip>
            </span>
            <h3>
              {{ currentPost.description }}
            </h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <div class="mt-3">
      <v-layout v-if="isAuth" class="mb-3">
        <v-flex xs12>
          <v-form ref="form" v-model="isFormValid" lazy-validation>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  v-model="messageBody"
                  clearable
                  prepend-icon="email"
                  :rules="messageRules"
                  :append-outer-icon="messageBody && 'send'"
                  label="Add message"
                  type="text"
                  required
                  @click:append-outer="handlePostMessage"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout v-if="currentPost && currentPost.messages" row wrap>
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader>
              Messages ({{ currentPost.messages.length }})
            </v-subheader>
            <template v-if="currentPost.messages.length">
              <template v-for="message in currentPost.messages">
                <v-divider :key="message._id" />
                <v-list-tile :key="message.title" avatar inset>
                  <v-list-tile-avatar>
                    <img :src="message.messageUser.avatar" alt="" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ message.messageBody }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ message.messageUser.username }}
                      <span class="grey--text text--lighten-1 hidden-xs-only"
                        >{{ message.messageDate }}
                      </span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="hidden-xs-only">
                    <v-icon color="grey">
                      chat_bubble
                    </v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      dialog: false,
      messageBody: "",
      isFormValid: true,
      messageRules: [
        message => !!message || "message is required",
        message => (message && message.length < 100) || "100 characters max"
      ]
    };
  },
  watch: {
    currentPost: {
      immediate: true,
      deep: true,
      handler(post) {}
    }
  },
  mounted() {
    const postId = this.$route.params.postId;
    this.getPostById(postId);
  },
  computed: {
    ...mapGetters(["isAuth", "currentPost", "currentPostMessages", "me"])
  },
  methods: {
    ...mapActions(["getPostById", "addPostMessage", "likePost", "unlikePost"]),
    goToPreviousPage() {
      this.$router.go(-1);
    },
    userHasLikedPost(post) {
      return post.likes.includes(this.me._id);
    },
    toggleDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
      }
    },
    handleLikePost(post) {
      if (!this.userHasLikedPost(post)) {
        this.likePost({ postId: this.currentPost._id, userId: this.me._id });
      } else {
        this.unlikePost({ postId: this.currentPost._id, userId: this.me._id });
      }
    },
    handlePostMessage() {
      if (this.$refs.form.validate()) {
        const newMessage = {
          messageBody: this.messageBody,
          messageUserId: this.me._id,
          postId: this.currentPost._id
        };
        this.addPostMessage(newMessage);
        this.$refs.form.reset();
      }
    }
  }
};
</script>

<style lang="stylus">
#post__image
    height 400px !important
</style>
