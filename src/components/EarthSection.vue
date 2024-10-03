<template>
  <section class="logo">
    <div class="container">
      <button class="logo-wrapper">
        <img src="../assets/images/save-world-web-logo.png" alt="Earth" />
        <img src="../assets/images/save-world-web-logo-2.png" alt="Earth" />
        <img src="../assets/images/save-world-web-logo-3.png" alt="Earth" />
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
  height: 230px
  cursor: pointer
  margin-bottom: 60px

.logo-wrapper
  position: relative
  width: 100%
  height: 100%
  // background: #00ED6969

  img
    margin: 0 auto
    position: absolute
    width: 596.14px
    height: 336.04px
    top: -68.98px
    left: 50%
    transform: translateX(-50%)
</style>
