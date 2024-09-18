<script setup lang="ts"></script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="username-wrapper">@username</div>
        <div class="settings-wrapper">Settings</div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
header
  display: flex
  justify-content: center
  height: 50px
  background: gray
.header-content
  width: 100%
  display: grid
  grid-template-columns: 3fr 1fr
  align-items: center
</style>
