<template>
  <section class="logo">
    <div class="container">
      <button class="logo-wrapper">
        <div class="background"></div>
        <div class="circle"></div>
        <img src="../assets/svg/earth.svg" alt="">
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
</script>

<style scoped lang="sass">
.logo
  display: flex
  justify-content: center
  align-items: center
  flex-grow: 1
  width: 100%
  cursor: pointer

.logo-wrapper
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  position: relative

  img
    z-index: 10

.background
  position: absolute
  top: 50%
  transform: translate(-50%, -50%)
  left: 50%
  width: 100%
  height: 130%
  background-image: url('../assets/svg/bg-vectors--big.svg')
  background-size: cover
  z-index: 1
  mask-image: radial-gradient(circle 50px at center, #00ED69 20%, transparent 350%)
  mask-position: center center

.circle
  position: absolute
  top: 52%
  left: 50%
  width: 310px
  aspect-ratio: 1
  border-radius: 50%
  background: radial-gradient(circle, #00ED6969 25%, rgba(21, 23, 21, 0) 62%)

  transform: translate(-50%, -50%)
  z-index: 1

</style>
