<template>
  <router-view />
</template>

<style lang="sass">
@import "src/styles/variables"
@font-face
  font-family: 'Poppins'
  src: url('./assets/fonts/Poppins-Regular.ttf') format('truetype')
  font-weight: normal
  font-style: normal

*
  margin: 0
  padding: 0
  box-sizing: border-box

html, body
  height: 100%
  overflow-x: hidden
  background: $c-bg

#app
  font-family: "Roboto Light", sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: $c-main-text
  display: flex
  flex-direction: column
  min-height: 100vh

h2
  font-size: 45px

.container
  width: 85%
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
