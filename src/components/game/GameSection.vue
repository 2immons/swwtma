<script setup lang="ts"></script>

<template>
  <div class="game-bg">
    <h3>Coming soon!</h3>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.game-bg
  width: 100%
  display: flex
  flex-grow: 1
  background: white
  height: 100%
  align-items: center
  justify-content: center
  position: relative
  border-radius: 20px

button
  position: absolute
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
</style>
