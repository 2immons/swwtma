<script setup lang="ts">
import { ref } from "vue";

const sliderClass = ref("left");
const sliderStatus = ref(false);
const moveSlider = () => {
  if (sliderClass.value === "left") {
    sliderClass.value = "right";
    sliderStatus.value = true;
  } else {
    sliderClass.value = "left";
    sliderStatus.value = false;
  }
};
</script>

<template>
  <div class="slider-wrapper" @click="moveSlider">
    <button :class="sliderClass"></button>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.slider-wrapper
  position: relative
  width: 80px
  height: 35px
  border-radius: 21px
  background: $c-element-bg
  box-shadow: $c-element-shadow

  .left, .right
    position: absolute
    height: 25px
    border-radius: 21px
    background: $c-main-text
    width: 25px
    top: 50%
    transform: translateY(-50%)
    left: 7px
    transition: ease 0.2s
  .right
    left: 48px
    transition: ease 0.2s
</style>
