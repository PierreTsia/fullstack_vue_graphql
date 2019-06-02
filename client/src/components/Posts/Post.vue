<template>
  <v-container v-if="currentPost" class="mt-3" flexbox center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{ currentPost.title }}</h1>
            <v-spacer></v-spacer>
            <v-btn large icon v-if="me">
              <v-icon large color="grey">favorite</v-icon>
            </v-btn>
            <h3 class="ml-3 mr-3 font-weight-thin">
              {{ currentPost.likes }} LIKES
            </h3>
            <v-icon @click="goToPreviousPage" large class="ml-3" color="primary"
              >arrow_back</v-icon
            >
          </v-card-title>
          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img
              @click="toggleDialog"
              id="post__image"
              slot="activator"
              :src="currentPost.imageUrl"
            ></v-img>
          </v-tooltip>
          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="currentPost.imageUrl" height="80vh"></v-img>
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
      <v-layout class="mb-3" v-if="isAuth">
        <v-flex xs12>
          <v-form
            v-model="isFormValid"
            ref="form"
            lazy-validation
          >
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  clearable
                  v-model="messageBody"
                  prepend-icon="email"
                  :rules="messageRules"
                  :append-outer-icon="messageBody && 'send'"
                  label="Add message"
                  type="text"
                  @click:append-outer="handlePostMessage"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="currentPost && currentPost.messages">
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader
              >Messages ({{ currentPost.messages.length }})</v-subheader
            >
            <template v-if="currentPost.messages.length">
              <template v-for="message in currentPost.messages">
                <v-divider :key="message._id"></v-divider>
                <v-list-tile avatar inset :key="message.title">
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
                    <v-icon color="grey">chat_bubble</v-icon>
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
  mounted() {
    const postId = this.$route.params.postId;
    this.getPostById(postId);
  },
  watch: {
    currentPost: {
      immediate: true,
      deep: true,
      handler(post) {
      }
    }
  },
  data() {
    return {
      dialog: false,
      messageBody: "",
      isFormValid: true,
      messageRules: [
        message => !!message || "message is required",
        message => message && message.length < 100 || "100 characters max"
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuth", "currentPost", "currentPostMessages", "me"])
  },
  methods: {
    ...mapActions(["getPostById", "addPostMessage"]),
    goToPreviousPage() {
      this.$router.go(-1);
    },
    toggleDialog() {
      if (window.innerWidth > 500) {
        this.dialog = !this.dialog;
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
        this.$refs.form.reset()
      }
    }
  }
};
</script>

<style lang="stylus">
#post__image
    height 400px !important
</style>
