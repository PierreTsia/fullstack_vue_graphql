<template>
  <v-layout row wrap class="mt-5">
    <v-flex xs12 offset-md1 md10 class="addPost__form">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="handleAddPost"
        class="ma-4 pa-2"
      >
        <v-text-field
          v-model="title"
          name="title"
          :rules="[rules.required, rules.min]"
          placeholder=""
          label="Title"
          required
        ></v-text-field>
        <v-layout row wrap>
          <v-flex xs5>
            <v-text-field
              v-model="imageUrl"
              name="imageUrl"
              :rules="[rules.required, rules.min]"
              placeholder=""
              label="Url"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs5 offset-xs2>
            <v-select
              :items="options"
              label="Categories"
              :rules="[rules.categories]"
              multiple
              @change="newGategories => (categories = newGategories)"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-textarea
          name="description"
          v-model="description"
          :rules="[rules.required, rules.description]"
          label="Description"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
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
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      description: "",
      imageUrl: "",
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
  computed: {
    ...mapGetters(["me"])
  },
  methods: {
    ...mapActions(["addPost"]),
    handleAddPost() {
      if (this.$refs.form.validate()) {
        const payload = {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          categories: [...this.categories],
          creatorId: this.me._id
        };
        this.addPost(payload)
        this.$router.push('/')
      }
    }
  }
};
</script>

<style scoped></style>
