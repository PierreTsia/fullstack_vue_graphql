<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="true"
    :left="false"
    :multi-line="false"
    :right="true"
    :timeout="6000"
    :top="false"
  >
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
  watch: {
    isShown: {
      immediate: true,
      handler(state) {
        console.log(state);
        this.snackbar = state;
      }
    }
  },
  computed: {
    bottom() {
      return this.snackProps.bottom || true;
    },
    top() {
      return this.snackProps.top || false;
    },
    left() {
      return this.snackProps.left || false;
    },
    right() {
      return this.snackProps.right || true;
    },
    multiline() {
      return this.snackProps.multiline || true;
    },
    timeout() {
      return this.snackProps.timeout || 6000;
    },
    text() {
      return this.snackProps.text || "";
    }
  }
};
</script>

<style scoped></style>
