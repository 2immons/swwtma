<script setup lang="ts"></script>

<template>
  <section class="settings">
    <div class="container">
      <div class="settings-content">
        <h2>Settings</h2>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.settings
  display: flex
  justify-content: center
  margin: 20px 0
.settings-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex
h2
  color: $c-light-text
</style>
