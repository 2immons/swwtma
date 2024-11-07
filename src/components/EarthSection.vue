<template>
  <section class="logo">
    <div class="container">
      <div class="logo-wrapper" @click="openWorldPopulationStats">
        <div class="background">
          <img src="../assets/svg/bg-earth-vectors.svg" alt="">
        </div>
        <div class="circle"></div>
        <img class="earth" src="../assets/svg/earth.svg" alt="">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { eventBus } from "@/event_bus/eventBus";

const openWorldPopulationStats = () => {
  eventBus.emit("toggleWorldStatictics", true)
}

</script>

<style scoped lang="sass">
.logo
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  cursor: pointer

.logo-wrapper
  width: 100%
  height: 336px
  display: flex
  justify-content: center
  position: relative
  align-items: center

  .background
    position: absolute
    z-index: 10
    top: 0
    left: 50%
    transform: translateX(-50%)
    height: 100%
    width: 320px

    img
      height: 100%
      width: 100%
      object-fit: cover
      object-position: center -208px

  .earth
    width: 320px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 10

  .circle
    position: absolute
    top: 50%
    left: 50%
    width: 160px
    aspect-ratio: 1
    border-radius: 50%
    opacity: 80%
    background: #22F07D
    filter: blur(74px)

    transform: translate(-50%, -50%)
    z-index: 10

</style>
