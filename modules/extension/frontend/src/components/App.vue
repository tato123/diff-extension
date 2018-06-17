<template>
    <widget-manager></widget-manager>
</template>

<script>
import WidgetManager from "./WidgetManager";

export default {
  created() {
    this.$store.dispatch("getToken");
  },
  components: {
    WidgetManager
  }
};
</script>

<style scoped>
</style>
