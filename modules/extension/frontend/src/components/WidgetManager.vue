<template>

<component
    v-bind:is="widget"
    class="tab"
  ></component>
</template>

<script>
import Launcher from "./widgets/Launcher";
import Vue from "vue";

export default {
  data() {
    return {
      widget: null
    };
  },
  components: {
    Launcher
  },
  created() {
    Launcher.load().then(([name, component]) => {
      Vue.customElement(name, component, { shadow: true });

      this.widget = name;
    });
  }
};
</script>

<style scoped>
</style>
