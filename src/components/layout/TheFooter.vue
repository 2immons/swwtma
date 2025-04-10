<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { eventBus } from "@/event_bus/eventBus";
const isFooterVisible = ref(true);
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

onMounted(() => {
  eventBus.on("toggleFooterVisibility", (visible) => {
    isFooterVisible.value = visible;
  });
});

onUnmounted(() => {
  eventBus.off("toggleFooterVisibility");
});
// 2
</script>

<template>
  <footer v-if="isFooterVisible">
    <div class="container">
      <nav class="footer-content">
        <router-link
          to="/home"
          :class="{
            'ac-nav-item': $route.path === '/home',
            'nav-item': $route.path !== '/home',
          }"
        >
          <img
            v-if="$route.path !== '/home'"
            src="../../assets/svg/footer/home.svg"
            alt=""
          />
          <div v-if="$route.path === '/home'" class="active-nav-item">
            <img src="../../assets/svg/footer/home.svg" alt="" />
            <p>{{ t("home") }}</p>
          </div>
        </router-link>

        <router-link
          to="/tasks"
          :class="{
            'ac-nav-item': $route.path === '/tasks',
            'nav-item': $route.path !== '/tasks',
          }"
        >
          <img
            v-if="$route.path !== '/tasks'"
            src="../../assets/svg/footer/tasks.svg"
            alt=""
          />
          <div v-if="$route.path === '/tasks'" class="active-nav-item">
            <img src="../../assets/svg/footer/tasks.svg" alt="" />
            <p>{{ t("tasks") }}</p>
          </div>
        </router-link>

        <router-link
          to="/mining"
          :class="{
            'ac-nav-item': $route.path === '/mining',
            'nav-item': $route.path !== '/mining',
          }"
        >
          <img
            v-if="$route.path !== '/mining'"
            src="../../assets/svg/footer/mining.svg"
            alt=""
          />
          <div v-if="$route.path === '/mining'" class="active-nav-item">
            <img src="../../assets/svg/footer/mining.svg" alt="" />
            <p>{{ t("mining") }}</p>
          </div>
        </router-link>

        <router-link
          to="/karma"
          :class="{
            'ac-nav-item': $route.path === '/karma',
            'nav-item': $route.path !== '/karma',
          }"
        >
          <img
            v-if="$route.path !== '/karma'"
            src="../../assets/svg/footer/karma.svg"
            alt=""
          />
          <div v-if="$route.path === '/karma'" class="active-nav-item">
            <img src="../../assets/svg/footer/karma.svg" alt="" />
            <p>{{ t("karma") }}</p>
          </div>
        </router-link>

        <router-link
          to="/friends"
          :class="{
            'ac-nav-item': $route.path === '/friends',
            'nav-item': $route.path !== '/friends',
          }"
        >
          <img
            v-if="$route.path !== '/friends'"
            src="../../assets/svg/footer/frens.svg"
            alt=""
          />
          <div v-if="$route.path === '/friends'" class="active-nav-item">
            <img src="../../assets/svg/footer/frens.svg" alt="" />
            <p>{{ t("frens") }}</p>
          </div>
        </router-link>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

footer
  font-family: "Manrope", sans-serif
  bottom: 40px
  position: fixed
  z-index: 100
  height: 76px
  width: 100%
  text-align: center
  display: flex
  flex-direction: column
  justify-content: start
  align-items: center
  color: vars.$c-light-text

hr
  position: absolute
  top: -2px
  width: 100%
  border: 1px solid vars.$c-separator

.footer-content
  display: flex
  justify-content: space-between
  width: 100%
  height: 76px
  align-items: center
  background: vars.$c-footer
  border: 1px solid vars.$c-border-color
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
    color: vars.$c-light-text

.nav-item:first-child
  margin-left: 4%

.nav-item:last-child
  margin-right: 4%

.ac-nav-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 3px

.active-nav-item
  border-radius: 70px
  border: 0.4px solid #00000066
  display: flex
  justify-content: center
  align-items: center
  gap: 6px
  overflow: hidden
  padding: 20px 30px
  height: 64px
  background: vars.$c-footer-active-element

  p
    color: vars.$c-light-text
    font-size: 14px
    white-space: nowrap
    line-height: 19px
    font-weight: bold

  img
    width: 24px
    height: 24px
    color: vars.$c-light-text
</style>
