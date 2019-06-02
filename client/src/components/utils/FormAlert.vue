<template>
  <v-alert
    class="alert"
    type="error"
    color="error"
    icon="warning"
    :value="true"
    dismissible
  >
    <h3>{{ message }}</h3>
  </v-alert>
</template>

<script>
export default {
  name: "FormAlert",
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="stylus"></style>
