<template>
  <PopupWindow />
  <router-view />
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "global" });
</script>

<style lang="sass">
@use "@/styles/variables" as vars
#ton-button
  display: none

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
  min-height: 100%
  overflow-x: hidden
  background-color: vars.$c-bg
  position: relative
  overscroll-behavior-y: contain

.no-scroll
  overflow: hidden
  touch-action: none

*
  // Отключение выделения текста
  user-select: none
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none

  // Отключение подсветки при тапе/клике
  -webkit-tap-highlight-color: transparent
  -webkit-touch-callout: none

  // Отключение синей подсветки при фокусе
  outline: none

  // Отключение перетаскивания изображений
  -webkit-user-drag: none
  -moz-user-drag: none
  user-drag: none

  // Отключение контекстного меню
  -webkit-touch-callout: none

  // Отключение масштабирования текста
  -webkit-text-size-adjust: none
  -moz-text-size-adjust: none
  -ms-text-size-adjust: none

  // Сглаживание шрифтов
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale


img
  user-drag: none
  -webkit-user-drag: none
  pointer-events: none

html::before
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  opacity: 0.8
  z-index: -1

.no-scroll
  overflow: hidden
  touch-action: none

*
  user-select: none
  -webkit-user-select: none
  -ms-user-select: none

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
  overscroll-behavior: contain

.no-scrollbar::-webkit-scrollbar
  display: none

body::-webkit-scrollbar
  display: none

textarea,
input.text,
input[type="text"],
input[type="button"],
input[type="submit"]
  -webkit-appearance: none
  border-radius: 0

input
  font-family: inherit


#app
  font-family: "Manrope", sans-serif
  line-height: 1.1
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: vars.$c-main-text
  display: flex
  flex-direction: column
  min-height: 100vh
  position: relative

h2
  font-size: 27px
  font-family: inherit

.container
  width: 92%
  height: inherit
  max-width: 414px
  display: inherit
  flex-direction: inherit
  justify-content: inherit
  align-items: inherit
  font-family: inherit

button
  background: transparent
  padding: 0
  border: none
  cursor: pointer !important
  -webkit-appearance: none
  color: vars.$c-main-text
  font-family: inherit
  font-size: inherit
a
  color: inherit
  text-decoration: none
  font-family: inherit
svg
  font-size: initial
</style>
