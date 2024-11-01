<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<style lang="sass">
@import "src/styles/variables"
@font-face
  font-family: 'Manrope'
  src: url('./assets/fonts/Manrope-Regular.ttf') format('truetype')
  font-weight: normal
  font-style: normal

*
  margin: 0
  padding: 0
  box-sizing: border-box

html, body
  height: 100%
  overflow-x: hidden
  background-color: $c-bg
  position: relative

html::before
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-image: url("./assets/images/bg.png")
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  opacity: 0.8
  z-index: -1

.no-scrollbar
  -ms-overflow-style: none
  scrollbar-width: none

.no-scrollbar::-webkit-scrollbar
  display: none

#app
  font-family: "Manrope", sans-serif
  line-height: 1.1
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: $c-main-text
  display: flex
  flex-direction: column
  min-height: 100vh

h2
  font-size: 27px

.container
  width: 92%
  height: inherit
  max-width: 414px
  display: inherit
  justify-content: inherit
  align-items: inherit

button
  background: transparent
  padding: 0
  border: none
  cursor: pointer

a
  color: inherit
  text-decoration: none
svg
  font-size: initial
</style>
