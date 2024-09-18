<script setup lang="ts"></script>

<template>
  <footer>
    <div class="container">
      <nav class="footer-content">
        <div class="btn-wrapper">
          <router-link to="/">Home</router-link>
        </div>
        <div class="btn-wrapper">
          <router-link to="/">Balance</router-link>
        </div>
        <div class="btn-wrapper">
          <router-link to="/">Green Coin</router-link>
        </div>
        <div class="btn-wrapper">
          <router-link to="/">Karma</router-link>
        </div>
        <div class="btn-wrapper">
          <router-link to="/">Info</router-link>
        </div>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="sass">
footer
  margin-top: 30px
  height: 50px
  width: 100%
  background-color: #ccc
  text-align: center
  display: flex
  justify-content: center
.footer-content
  display: flex
  justify-content: space-evenly
  width: 100%
  align-items: center
</style>
