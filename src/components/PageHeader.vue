<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { telegramMixin } from "@/mixins/telegramMixin";
import { profileStore } from "@/store/user-profile";
import { eventBus } from "@/event_bus/eventBus";
const isHeaderBackBtnVisible = ref(false);
const isSettingsButtonDisabled = ref(false);

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

const { t, locale } = useI18n();

const username = ref("Loading...");
const firstName = ref("Loading...");
const lastName = ref("Loading...");

const profileStoreInstance = profileStore();

onMounted(async () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();

    const queryForValidation =
      telegramMixin.methods.generateQueryForValidation();

    window.Telegram.WebApp.expand();

    const user = window.Telegram.WebApp.initDataUnsafe?.user;

    if (user) {
      // Получаем данные пользователя
      username.value = user.username || "No username";
      firstName.value = user.first_name || "Unknown";
      lastName.value = user.last_name || "Unknown";
      locale.value = user.language_code || "en";
    }

    // await profileStoreInstance.getUserProfile(queryForValidation);
  } else {
    console.error("Telegram WebApp API не доступен.");
  }
});

const turnOffStatictics = () => {
  eventBus.emit("toggleWorldStatictics", false)
}
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <button class="back-btn" v-if="isHeaderBackBtnVisible" @click="turnOffStatictics">
          <img src=../assets/svg/header/back-btn.svg alt="">
        </button>
        <div class="user">
          <div class="user-wrapper">
            <img src="#" alt="" />
            <p>{{ firstName }}</p>
          </div>
        </div>
        <router-link to="/settings" class="settings-wrapper" v-if="!isSettingsButtonDisabled">
          <img src="../assets/svg/header/settings.svg" alt="Настройки" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
header
  margin-top: 29px
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

    img
      height: 28px
      width: 28px
      border-radius: 50px
      background: $c-light-element
    p
    font-size: 18px

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
