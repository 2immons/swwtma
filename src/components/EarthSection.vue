<template>
  <section class="logo">
    <div class="container">
      <button class="logo-wrapper">
        <img src="../assets/images/save-world-web-logo.png" alt="Earth" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
</script>

<style scoped lang="sass">
.logo
  margin-top: 60px
  display: flex
  justify-content: center
  align-items: center
  height: 250px
  cursor: pointer
  margin-bottom: 60px

  img
    max-width: 100%
    max-height: 100%
    object-fit: contain
</style>
