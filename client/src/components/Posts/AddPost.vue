<template>
  <v-layout row wrap class="mt-5">
    <v-flex xs12 offset-md1 md10 class="addPost__form">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="ma-4 pa-2"
        @submit.prevent="handleAddPost"
      >
        <v-text-field
          v-model="title"
          name="title"
          :rules="[rules.required, rules.min]"
          placeholder=""
          label="Title"
          required
        />
        <v-layout row wrap>
          <v-flex xs12>
            <UploadImage
              upload-preset="defaultPreset"
              cloud-name="dd9kfvzbg"
              asset-type="post image"
              @uploaded="handleInputChange"
              @error="handleError"
            >
              <template v-if="isUploaded">
                <div slot="imgPreview">
                  <!-- Uploaded image -->
                  <v-img
                    v-if="isUploaded"
                    contain
                    :src="imgSrc"
                    :max-width="300"
                  />
                </div>
              </template>
            </UploadImage>
          </v-flex>
          <v-flex xs12>
            <Combobox :existing-tags="tags" @onTagsChanged="handleTagsUpdate" />
          </v-flex>
        </v-layout>

        <v-textarea
          v-model="description"
          name="description"
          :rules="[rules.required, rules.description]"
          label="Description"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        />
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="subheading mb-3">
              Content
            </h3>
            <RichTextEditor @onContentChanged="handleContentChanged" />
          </v-flex>
        </v-layout>
        <v-layout row justify-end>
          <v-btn
            type="submit"
            color="primary"
            round
            class="pl-5 pr-5 mt-5"
            :disabled="!valid"
          >
            Submit
          </v-btn>
        </v-layout>
        <v-layout v-if="imageUrl.length" row wrap justify-start align-center>
          <v-img :max-height="300" contain :src="imageUrl" />
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UploadImage from "@/components/utils/UploadImage";
import Combobox from "@/components/utils/Combobox";
import RichTextEditor from "@/components/utils/RichTextEditor";
export default {
  name: "AddPost",
  components: {
    UploadImage,
    Combobox,
    RichTextEditor
  },
  data() {
    return {
      title: "",
      description: "",
      imageUrl: "",
      uploadedImage: null,
      categories: [],
      content: "",
      options: [],
      valid: false,
      items: [],
      inputValue: "",
      rules: {
        required: value => !!value || "Field required",
        min: value => value.trim().length >= 4 || "Minimum 4 characters",
        categories: value =>
          value.length >= 1 || "At least one category is required",
        description: value =>
          (value.trim().length >= 4 && value.trim().length <= 250) ||
          "Description must be between 4 and 250 characters"
      }
    };
  },
  computed: {
    ...mapGetters(["me", "searchResults", "tags"]),
    isUploaded() {
      return !!this.uploadedImage && this.uploadedImage.url;
    },
    imgSrc() {
      return this.uploadedImage.url || "";
    }
  },
  methods: {
    ...mapActions(["addPost", "getTags"]),
    handleInputChange(uploaded) {
      this.uploadedImage = uploaded;
    },
    handleError(e) {
      console.error(e);
    },

    handleContentChanged(content) {
      this.content = content;
    },

    async handleTagsUpdate(tags) {
      this.categories = tags.map(tag => {
        return tag._id ? tag : { label: tag, color: "primary" };
      });
    },
    async handleAddPost() {
      if (this.$refs.form.validate() && this.imgSrc.length) {
        const post = {
          title: this.title,
          description: this.description,
          content: this.content,
          imageUrl: this.imgSrc,
          categories: this.categories.filter(c => c._id).map(c => c._id),
          newTagsLabels: this.categories.filter(c => !c._id).map(c => c.label),
          creatorId: this.me._id
        };
        await this.addPost(post);
        this.$router.push("/posts");
      }
    }
  },
  async mounted() {
    await this.getTags();
  }
};
</script>

<style lang="stylus">
.uploadPreview
  .v-image
    margin 0 auto
  .v-btn
    display block
    margin 10px auto
  .imgLoader
    display block
    margin 10px auto
</style>
