<template>
  <v-container
    class="signup"
    grid-list-md
    text-xs-center
  >
    <v-layout
      row
      wrap
      class="mt-5"
    >
      <v-flex
        xs12
        offset-md3
        md6
        class="signup__form"
      >
        <transition name="bounce">
          <template v-if="signupError">
            <form-alert
              class="signup__form__alert"
              :message="signupError.message"
            />
          </template>
        </transition>
        <v-card color="white">
          <v-icon
            color="primary"
            class="mt-2"
            large
          >
            account_box
          </v-icon>
          <div class="title primary--text font-weight-light">
            Start here and sign-up
          </div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="ma-4 pa-2"
            @submit.prevent="signup"
          >
            <v-text-field
              v-model="username"
              name="username"
              :rules="[rules.required, rules.min, rules.noEmpty]"
              placeholder=""
              label="Username"
              required
              :append-icon="'person'"
            />
            <v-text-field
              v-model="email"
              name="username"
              :rules="[rules.required, rules.email]"
              placeholder=""
              label="Email"
              required
              :append-icon="'email'"
            />
            <v-text-field
              v-model="password"
              name="password"
              :rules="[rules.required, rules.noEmpty]"
              placeholder=""
              label="Password"
              required
              :append-icon="showpassword ? 'visibility' : 'visibility_off'"
              :type="showpassword ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="showpassword = !showpassword"
            />
            <v-text-field
              v-model="password2"
              name="password"
              :rules="[rules.required, rules.matchPassword]"
              placeholder=""
              label="Confirm password"
              required
              :append-icon="showpassword2 ? 'visibility' : 'visibility_off'"
              :type="showpassword2 ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="showpassword2 = !showpassword2"
            />
            <v-btn
              type="submit"
              color="primary"
              large
              block
              class="mt-5"
              :loading="userIsLoading"
              :disabled="!valid"
            >
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      email: "",
      account: "",
      valid: false,
      showpassword: false,
      showpassword2: false,

      rules: {
        required: value => !!value || "Field required",
        min: value => value.trim().length >= 4 || "Minimum 4 characters",
        noEmpty: value => !this.isWhiteSpace(value) || "No Whitespaces",
        email: value =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "E-mail must be valid",
        matchPassword: value =>
          value === this.password || "Passwords do not match"
      }
    };
  },
  methods: {
    ...mapActions(["signupUser"]),
    isWhiteSpace(str) {
      const pattern = /\s/g;
      return str.match(pattern);
    },
    signup() {
      const payload = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      this.signupUser(payload);
    }
  },
  watch: {
    isAuth: {
      immediate: true,
      handler(isAuth) {
        console.log(isAuth);
        if (isAuth) {
          this.$router.push("/");
        }
      }
    }
  },
  computed: {
    ...mapGetters(["signupError", "isAuth", "userIsLoading"])
  }
};
</script>

<style scoped></style>
