<script setup lang="ts"></script>

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
        <router-link to="/balance" class="nav-item">
          <img
            v-if="$route.path !== '/balance'"
            src="../assets/svg/footer/balance.svg"
            alt=""
          />
          <div v-if="$route.path === '/balance'" class="active-nav-item">
            <img src="../assets/svg/footer/balance.svg" alt="" />
            <p>{{ t("balance") }}</p>
          </div>
        </router-link>
        <router-link to="/green-coin" class="nav-item">
          <img
            v-if="$route.path !== '/test'"
            src="../assets/svg/footer/test.svg"
            alt=""
          />
          <div v-if="$route.path === '/test'" class="active-nav-item">
            <img src="../assets/svg/footer/test.svg" alt="" />
            <p>{{ t("test") }}</p>
          </div>
        </router-link>
        <router-link to="/profile" class="nav-item">
          <img
            v-if="$route.path !== '/test'"
            src="../assets/svg/footer/profile.svg"
            alt=""
          />
          <div v-if="$route.path === '/test'" class="active-nav-item">
            <img src="../assets/svg/footer/profile.svg" alt="" />
            <p>{{ t("profile") }}</p>
          </div>
        </router-link>
        <router-link to="/settings" class="nav-item">
          <img
            v-if="$route.path !== '/settings'"
            src="../assets/svg/footer/test.svg"
            alt=""
          />
          <div v-if="$route.path === '/settings'" class="active-nav-item">
            <img src="../assets/svg/footer/test.svg" alt="" />
            <p>{{ t("settings") }}</p>
          </div>
        </router-link>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
footer
  bottom: 0
  height: 135px
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
  height: 74px
  align-items: center
  background: $c-element-bg
  border-radius: 75px
  padding: 12px
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
  border-radius: 44px
  display: flex
  justify-content: center
  align-items: center
  gap: 6px
  overflow: hidden
  padding: 15px
  height: 54px
  background: $c-element-bg
  p
    color: $c-main-text
    font-size: 13px
    white-space: nowrap
    line-height: 12px
    font-weight: 600
</style>
