<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-card color="white" class="ma-5 pa-1">
          <v-icon color="primary" class="mt-2" large>account_box</v-icon>
          <div class="title primary--text font-weight-light">Login</div>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="login"
            class="ma-4 pa-2"
          >
            <v-text-field
              v-model="username"
              name="username"
              :rules="[rules.required, rules.min]"
              placeholder=""
              label="Username"
              required
              :append-icon="'person'"
            ></v-text-field>
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
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              large
              block
              class="mt-5"
              :disabled="!valid"
            >
              Login</v-btn
            >
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
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
      }
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      const user = { username: this.username, password: this.password };
      console.log(user);
      this.loginUser(user);
    }
  }
};
</script>

<style scoped></style>
