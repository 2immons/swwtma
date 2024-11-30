<script setup lang="ts">
import { defineProps } from "vue";
import { questsStore } from "@/store/quests";
const questsStoreInstance = questsStore();

// const props = defineProps<{
//   quest: {
//     title: "string";
//     description: "string";
//   };
// }>();
</script>

<template>
  <div class="promo-task-wrapper">
    <div class="promo-task-box">
      <img src="../../assets/svg/bg-vectores--promo-task.svg" alt="" class="bg-image">
      <div class="bg-ellepsis"></div>
      <p class="title">Recycle</p>
      <p class="name">Recycle 5 battaries.</p>
      <div class="footer">
        <button>Continue</button>
        <div class="benefits">
          <p>+ 699 <img src="../../assets/svg/stats/green-coin--small.svg" alt=""></p>
        </div>
        <div class="loader-wrapper">
          <div class="loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.promo-task-wrapper
  width: 100%
  display: flex
  flex-direction: column
  margin-top: 26px
  color: white
  gap: 20px

.promo-task-box
  position: relative
  background: #FFFFFF0D
  width: 100%
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  padding: 22px
  border: 1px solid $c-border-color
  opacity: 100%
  border-radius: 20px
  overflow: hidden
  gap: 40px

  .bg-image
    position: absolute
    right: 0
    top: 0
    width: 100%
    height: 100%
    opacity: 0.2

  .bg-ellepsis
    position: absolute
    height: 140px
    width: 140px
    top: -70px
    right: -30px
    border-radius: 50%
    background: white
    overflow: hidden
    opacity: 0.4
    will-change: filter
    filter: blur(80px)
    -webkit-filter: blur(80px)

  .title
    font-size: 10px
    opacity: 50%
  .name
    font-size: 27px
    font-weight: 600

.footer
  display: flex
  gap: 6px
  height: 30px
  align-items: center

  button
    background: white
    padding: 4px 15px
    border: 0.4px solid #22F07D33
    border-radius: 50px
    font-size: 12px
    font-weight: 700
    height: 100%
    color: $c-main-text

  .benefits
    border: 1px solid $c-border-color
    backdrop-filter: blur(2px)
    background: $c-dark-element
    height: 100%
    border-radius: 50px
    padding: 4px 15px
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    font-weight: 500
  .loader-wrapper
    height: 100%
    padding: 6px
    background: $c-dark-element
    border: 1px solid $c-border-color
    border-radius: 50px
    margin-left: 50px
    .loader
      height: 100%
      border: 3px solid #FFFFFF52
      border-top: 3px solid #FFFFFFDE
      border-radius: 50%
      aspect-ratio: 1
      animation: spin 1s linear infinite

      @keyframes spin
        from
          transform: rotate(0deg)
        to
          transform: rotate(360deg)
</style>