<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { questsStore } from "@/store/quests";
const questsStoreInstance = questsStore();
</script>

<template>
  <div class="stats-wrapper">
    <div class="earned-coins-box">
      <img src="../../assets/svg/bg-vectors.svg" alt="" class="bg-image">
      <div class="bg-ellepsis"></div>
      <p>You Earned:</p>
      <div class="coins">
        <p>+ 6399 <img src="../../assets/svg/stats/green-coin.svg" alt="" /></p>
        <button>Claim</button>
      </div>
    </div>
    <div class="help">
      <p class="info">?</p>
      <p>
        Lorem ipsum dolor sit amet consectetur. Aliquam laoreet non pulvinar
        arcu pharetra cursus gravida nulla
      </p>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.stats-wrapper
  width: 100%
  display: flex
  flex-direction: column
  margin-top: 26px
  color: white
  gap: 20px

.earned-coins-box
  position: relative
  background: #FFFFFF0D
  height: 120px
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

  .bg-image
    position: absolute
    right: 0
    top: 0
    width: 100%
    height: 100%
    opacity: 20%

  .bg-ellepsis
    position: absolute
    height: 140px
    width: 140px
    top: -70px
    right: -30px
    border-radius: 50%
    background: white
    overflow: hidden
    opacity: 40%
    filter: blur(80px)

  p
    font-size: 10px
    opacity: 50%

  .coins
    display: flex
    width: 100%
    align-items: center
    flex-direction: row
    justify-content: space-between

    p
      font-size: 27px
      opacity: 100%

    button
      height: 30px
      width: 112px
      border-radius: 50px
      color: $c-main-text
      background: white
      border: 1px solid $c-border-color
      font-weight: 700

.help
  display: flex
  align-items: center
  gap: 12px
  padding: 0 12px
  p
    opacity: 50%
    text-align: left
    font-size: 9px

  .info
    width: 20px
    height: 20px
    display: flex
    justify-content: center
    align-items: center
    border: 1px solid $c-border-color
    padding: 6px
    border-radius: 50px
    font-size: 10px
</style>
