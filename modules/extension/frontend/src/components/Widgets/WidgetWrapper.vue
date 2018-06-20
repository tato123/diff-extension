<template>
    <div style="border:1px solid black; padding: 20px;">      
      <label> my content</label>
      <slot></slot>    
    
    </div>
    
</template>

<script>
import Vue from "vue";
import wrap from "@vue/web-component-wrapper";

export default {};
</script>

<shadowStyle> 
  label {
    font-size: 30px;
  }
</shadowStyle>