<template>
  <v-snackbar v-model="snackbar">
    ' text '
    <v-btn color="pink" flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data() {
    return {
      snackbar: false
    };
  },
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    snackProps: {
      type: Object,
      default: () => {}
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped></style>
