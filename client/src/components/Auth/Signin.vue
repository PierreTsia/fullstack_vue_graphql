<template>
  <v-container
    class="signin"
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
        class="signin__form"
      >
        <transition name="bounce">
          <template v-if="loginError">
            <form-alert
              class="signin__form__alert"
              :message="loginError.message"
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
            Login
          </div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="ma-4 pa-2"
            @submit.prevent="login"
          >
            <v-text-field
              v-model="username"
              name="username"
              :rules="[rules.required, rules.min]"
              placeholder=""
              label="Username"
              required
              :append-icon="'person'"
            />
            <v-text-field
              v-model="password"
              name="password"
              :rules="[rules.required]"
              placeholder=""
              label="Password"
              required
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
              class="input-group--focused"
              @click:append="show = !show"
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
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
      account: "",
      valid: false,
      show: false,
      rules: {
        required: value => !!value || "Field required",
        min: value => value.trim().length >= 4 || "Minimum 4 characters"
        // noEmpty: value => !this.isWhiteSpace(value) || "No Whitespaces"
      }
    };
  },
  computed: {
    ...mapGetters(["isAuth", "loginError", "userIsLoading"])
  },
  watch: {
    isAuth: {
      immediate: true,
      handler(isAuth) {
        if (isAuth) {
          this.$router.push("/");
        }
      }
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      const user = { username: this.username, password: this.password };
      this.loginUser(user);
    },
    isWhiteSpace(str) {
      const pattern = /\s/g;
      return str.match(pattern);
    }
  }
};
</script>

<style lang="stylus">
.signin
  .signin__form
    position relative
    .signin__form__alert
      position absolute
      top -70px
      width calc(100% - 8px)


.bounce-enter-active
  animation: bounce-in .33s;

.bounce-leave-active
  animation: bounce-in .33s reverse;

@keyframes bounce-in
  0%
    transform: scale(0);

  50%
    transform: scale(1.1);

  100%
    transform: scale(1);
</style>
