<template>
    <df-widget>
            <div>hello world</div>
    </df-widget>
</template>

<script>
import Vue from "vue";
import wrap from "@vue/web-component-wrapper";
import WidgetWrapper from "./components/Widgets/WidgetWrapper.vue?shadow";

import "css-loader/lib/css-base";
import "vue-style-loader/lib/addStylesShadow";
import "vue-loader/lib/runtime/componentNormalizer";

const CustomElement = wrap(Vue, WidgetWrapper);
window.customElements.define("df-widget", CustomElement);

export default {};
</script>

<style scoped>
</style>
