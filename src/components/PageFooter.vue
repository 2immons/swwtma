<script setup lang="ts">
</script>

<template>
  <footer>
    <div class="container">
      <nav class="footer-content">
        <router-link to="/" class="nav-item">
          <img
            v-if="$route.path !== '/'"
            src="../assets/svg/footer/home.svg"
            alt=""
          />
          <div v-if="$route.path === '/'" class="active-nav-item">
            <img src="../assets/svg/footer/home.svg" alt="" />
            <p>{{ t("home") }}</p>
          </div>
        </router-link>
        <router-link to="/karma" class="nav-item">
          <img
            v-if="$route.path !== '/karma'"
            src="../assets/svg/footer/balance.svg"
            alt=""
          />
          <div v-if="$route.path === '/karma'" class="active-nav-item">
            <img src="../assets/svg/footer/balance.svg" alt="" />
            <p>{{ t("karma") }}</p>
          </div>
        </router-link>
        <router-link to="/tasks" class="nav-item">
          <img
            v-if="$route.path !== '/tasks'"
            src="../assets/svg/footer/tasks.svg"
            alt=""
          />
          <div v-if="$route.path === '/tasks'" class="active-nav-item">
            <img src="../assets/svg/footer/tasks.svg" alt="" />
            <p>{{ t("tasks") }}</p>
          </div>
        </router-link>
        <router-link to="/mining" class="nav-item">
          <img
            v-if="$route.path !== '/mining'"
            src="../assets/svg/footer/frens.svg"
            alt=""
          />
          <div v-if="$route.path === '/mining'" class="active-nav-item">
            <img src="../assets/svg/footer/frens.svg" alt="" />
            <p>{{ t("mining") }}</p>
          </div>
        </router-link>
        <router-link to="/friends" class="nav-item">
          <img
              v-if="$route.path !== '/friends'"
              src="../assets/svg/footer/frens.svg"
              alt=""
          />
          <div v-if="$route.path === '/friends'" class="active-nav-item">
            <img src="../assets/svg/footer/frens.svg" alt="" />
            <p>{{ t("frens") }}</p>
          </div>
        </router-link>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
footer
  font-family: "Poppins", sans-serif
  bottom: 43.5px
  position: sticky
  height: 76px
  width: 100%
  text-align: center
  display: flex
  flex-direction: column
  justify-content: start
  align-items: center
  color: $c-light-text
hr
  position: absolute
  top: -2px
  width: 100%
  border: 1px solid $c-separator
.footer-content
  display: flex
  justify-content: space-between
  width: 100%
  height: 76px
  align-items: center
  background: $c-dark-element
  border: 0.4px solid $c-dark-element
  border-image-source: linear-gradient(0deg, rgba(34, 240, 125, 0.2), rgba(34, 240, 125, 0.2)), linear-gradient(86.36deg, rgba(255, 255, 255, 0) 49.24%, rgba(255, 255, 255, 0.2) 99.34%), linear-gradient(266.98deg, rgba(255, 255, 255, 0) 39.05%, rgba(255, 255, 255, 0.3) 119.18%)
  border-radius: 83px
  padding: 6px
  backdrop-filter: blur(7px)
.nav-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 3px
  img
    width: 24px
    height: 24px
    color: $c-light-text
.active-nav-item
  border-radius: 70px
  display: flex
  justify-content: center
  align-items: center
  gap: 6px
  overflow: hidden
  padding: 20px 30px
  height: 64px
  background: $c-footer-active-element
  p
    color: $c-light-text
    font-size: 14px
    white-space: nowrap
    line-height: 19px
    font-weight: 700
</style>
