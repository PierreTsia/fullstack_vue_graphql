<template>
  <v-snackbar v-model="snackbar">
    ' text '
    <v-btn
      color="pink"
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
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
  data() {
    return {
      snackbar: false
    };
  },
  computed: {},
  watch: {}
};
</script>

<style scoped></style>
