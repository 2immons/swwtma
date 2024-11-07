<script setup lang="ts">
import { ref } from "vue";

const sliderWrapperClass = ref("slider-wrapper-left")
const sliderClass = ref("left");
const sliderStatus = ref(false);
const moveSlider = () => {
  if (sliderClass.value === "left") {
    sliderClass.value = "right";
    sliderWrapperClass.value = "slider-wrapper-right"
    sliderStatus.value = true;

  } else {
    sliderClass.value = "left";
    sliderWrapperClass.value = "slider-wrapper-left"
    sliderStatus.value = false;
  }
};
</script>

<template>
  <div :class="sliderWrapperClass" @click="moveSlider">
    <button :class="sliderClass"></button>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.slider-wrapper-left
  transition: ease 0.2s
  background: rgba(255, 255, 255, 0.03)

.slider-wrapper-right
  transition: ease 0.2s
  background: $c-light-element

.slider-wrapper-left, .slider-wrapper-right
  position: relative
  width: 80px
  height: 35px
  border-radius: 21px
  border: 1px solid $c-border-color
  transition: ease 0.2s

  .left, .right
    position: absolute
    height: 25px
    border-radius: 21px
    background: rgba(255, 255, 255, 0.4)
    width: 25px
    top: 50%
    transform: translateY(-50%)
    left: 7px
    transition: ease 0.2s
  .right
    left: 48px
    transition: ease 0.2s
    background: $c-main-text
</style>
