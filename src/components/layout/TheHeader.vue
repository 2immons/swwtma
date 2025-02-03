<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { eventBus } from "@/event_bus/eventBus";
import { telegramStore } from "@/store/telegram";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const isHeaderBackBtnVisible = ref(false);
const isSettingsButtonDisabled = ref(false);

const userData = computed(() => telegramStore().userData);

const headerMarginClass = ref("");
const isFullScreen = computed(
  () => telegramStore().telegramWebApp.isFullscreen
);
watch(
  isFullScreen,
  (newValue) => {
    headerMarginClass.value = newValue
      ? "header-margin-calc"
      : "header-margin-default";
  },
  { immediate: true }
);

onMounted(() => {
  eventBus.on("toggleHeaderBackBtnVisibility", (visible) => {
    isHeaderBackBtnVisible.value = visible;
  });
  eventBus.on("disableSettingButton", (visible) => {
    isSettingsButtonDisabled.value = visible;
  });
});

onUnmounted(() => {
  eventBus.off("toggleHeaderBackBtnVisibility");
  eventBus.off("toggleSettingsButton");
});

const pressBackBtn = () => {
  eventBus.emit("headerBackBtnPressed");
};
</script>

<template>
  <header :class="headerMarginClass">
    <div class="container">
      <div class="header-content">
        <button
          class="back-btn"
          v-if="isHeaderBackBtnVisible"
          @click="pressBackBtn"
        >
          <img src=../../assets/svg/header/back-btn.svg alt="">
        </button>
        <div class="user">
          <div class="user-wrapper">
            <img :src="userData.avatar" alt="Avatar" />
            <p>{{ userData.username }}</p>
          </div>
        </div>
        <router-link
          to="/settings"
          class="settings-wrapper"
          v-if="!isSettingsButtonDisabled"
        >
          <img src="../../assets/svg/header/settings.svg" alt="Настройки" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

header
  display: flex
  flex-direction: column
  align-items: center
  color: vars.$c-light-text
  z-index: 10

.header-margin-calc
  margin-top: calc(var(--tg-safe-area-inset-top) + var(--tg-content-safe-area-inset-top))

.header-margin-default
  margin-top: 29px

.header-content
  position: relative
  width: 100%
  display: flex
  align-items: center
  align-self: end
  height: 36px

.back-btn
  border-radius: 50px
  margin-right: 4px
  height: 100%
  aspect-ratio: 1
  border: 1px solid vars.$c-border-color
  display: flex
  justify-content: center
  align-items: center
  background: vars.$c-dark-element

  img
    height: 16px

.user
  flex-grow: 1
  position: relative
  width: calc(100% - 36px)
  padding-right: 10px

  .user-wrapper
    display: flex
    align-items: center
    height: 100%
    background: vars.$c-dark-element
    border-radius: 50px
    gap: 7px
    padding: 4px 16px 4px 4px
    border: 1px solid vars.$c-border-color
    backdrop-filter: blur(2px)
    width: fit-content
    max-width: 100%

    img
      height: 28px
      width: 28px
      border-radius: 50px
      background: vars.$c-light-element

    p
      font-size: 18px
      text-overflow: ellipsis
      text-wrap: nowrap
      overflow: hidden
      text-align: left

.settings-wrapper
  display: flex
  justify-content: center
  align-items: center
  width: 36px
  height: 36px
  background: vars.$c-dark-element
  border: 1px solid vars.$c-border-color
  backdrop-filter: blur(2px)
  border-radius: 50px
</style>
