<template>
  <v-card flat class="white--text" color="secondary darken-4">
    <v-layout row wrap>
      <v-flex md5 xs12 class="my-auto profileTop__avatar">
        <v-tooltip class="tooltip" v-model="show" bottom>
          <template v-slot:activator="{ on }">
            <v-avatar size="80" v-on="on">
              <img v-if="me.avatar" :src="me.avatar" alt="avatar" />
              <span v-else>{{ me.username.slice(0, 1).toUpperCase() }}</span>
            </v-avatar>
          </template>
          <span>Click to change your avatar</span>
        </v-tooltip>
      </v-flex>
      <v-flex xs12 md7 class="profileTop__profile">
        <v-card-title primary-title>
          <h1 class="headline">
            {{ me.username }}
          </h1>
        </v-card-title>
        <v-card-text>
          <h2 class="subheading">
            Joined
            {{ $date.distanceInWords(new Date(), me.joinDate) }}
            ago
          </h2>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfileTopBar",
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["me"])
  }
};
</script>

<style scoped></style>
