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
          <v-flex xs5 class="uploadPreview">
            <UploadImage
              @uploaded="handleInputChange"
              @error="handleError"
              upload-preset="defaultPreset"
              cloud-name="dd9kfvzbg"
            >
              <template v-if="isUploaded">
                <div slot="imgPreview">
                  <!-- Uploaded image -->
                  <v-img
                    v-if="isUploaded"
                    :max-height="150"
                    contain
                    :src="imgSrc"
                  />
                </div>
              </template>
            </UploadImage>
          </v-flex>
          <v-flex xs5 offset-xs2>
            <v-select
              :items="options"
              label="Categories"
              :rules="[rules.categories]"
              multiple
              @change="newGategories => (categories = newGategories)"
            />
          </v-flex>
        </v-layout>

        <v-textarea
          v-model="description"
          name="description"
          :rules="[rules.required, rules.description]"
          label="Description"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        />
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
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      description: "",
      imageUrl: "",
      uploadedImage: null,
      categories: [],
      options: ["tech", "news", "art", "game"],
      valid: false,
      items: [],
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
  components: {
    UploadImage
  },
  computed: {
    ...mapGetters(["me"]),
    isUploaded() {
      return !!this.uploadedImage && this.uploadedImage.url;
    },
    imgSrc() {
      return this.uploadedImage.url || "";
    }
  },
  methods: {
    ...mapActions(["addPost"]),
    handleInputChange(uploaded) {
      console.log("uploaded", uploaded);
      this.uploadedImage = uploaded;
    },
    handleError(e) {
      console.error(e);
    },
    handleAddPost() {
      if (this.$refs.form.validate() && this.imgSrc.length) {
        const payload = {
          title: this.title,
          description: this.description,
          imageUrl: this.imgSrc,
          categories: [...this.categories],
          creatorId: this.me._id
        };
        this.addPost(payload);
        this.$router.push("/posts");
      }
    }
  }
};
</script>

<style lang="stylus">
.uploadPreview
  display flex
</style>
