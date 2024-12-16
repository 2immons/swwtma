<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { eventBus } from "@/event_bus/eventBus";
import { telegramStore } from "@/store/telegram";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const isHeaderBackBtnVisible = ref(false);
const isSettingsButtonDisabled = ref(false);

onUnmounted(() => {
  eventBus.off("toggleHeaderBackBtnVisibility");
  eventBus.off("toggleSettingsButton");
});

let userData = reactive({});

const telegramStoreInstance = telegramStore();

onMounted(() => {
  eventBus.on("toggleHeaderBackBtnVisibility", (visible) => {
    isHeaderBackBtnVisible.value = visible;
  });
  eventBus.on("disableSettingButton", (visible) => {
    isSettingsButtonDisabled.value = visible;
  });

  const data = telegramStoreInstance.ensureUserData();
  userData.username = data.username;
  userData.firstName = data.firstName;
  userData.lastName = data.lastName;
  userData.language = data.language;
  locale.value = userData.language;
});

const pressBackBtn = () => {
  eventBus.emit("headerBackBtnPressed");
};
</script>

<template>
  <header>
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
            <img src="#" alt="" />
            <p>{{ userData.firstName }}</p>
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
@import "../../styles/variables"
header
  margin-top: calc(var(--tg-safe-area-inset-top) + var(--tg-content-safe-area-inset-top))
  display: flex
  flex-direction: column
  align-items: center
  color: $c-light-text
  z-index: 10

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
  border: 1px solid $c-border-color
  display: flex
  justify-content: center
  align-items: center
  background: $c-dark-element

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
    background: $c-dark-element
    border-radius: 50px
    gap: 7px
    padding: 4px 16px 4px 4px
    border: 1px solid $c-border-color
    backdrop-filter: blur(2px)
    width: fit-content
    max-width: 100%

    img
      height: 28px
      width: 28px
      border-radius: 50px
      background: $c-light-element
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
  background: $c-dark-element
  border: 1px solid $c-border-color
  backdrop-filter: blur(2px)
  border-radius: 50px
</style>
