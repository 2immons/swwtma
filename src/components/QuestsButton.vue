<script setup lang="ts"></script>

<template>
  <div class="quests-btn-wrapper">
    <router-link to="/quests" class="quests-btn">{{ t("tasks") }}</router-link>
  </div>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.quests-btn-wrapper
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 60px
  margin: 20px 0
.quests-btn
  display: flex
  justify-content: center
  align-items: center
  width: fit-content
  padding: 0 30px
  height: 100%
  background: $c-element-bg
  border-radius: 25px
  font-size: 23px
  font-weight: 700
  color: $c-main-text
  box-shadow: $c-light-element-shadow
</style>
