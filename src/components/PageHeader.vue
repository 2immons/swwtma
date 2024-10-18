<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const username = ref("Loading...");
const firstName = ref("Loading...");
const lastName = ref("Loading...");

const validateData = async (webData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/validate",
      webData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Запрос валидации:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Валидация не пройдена:", error.response.data);
    } else {
      console.error("Ошибка запроса:", error.message);
    }
  }
};

onMounted(async () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();

    const user = window.Telegram.WebApp.initDataUnsafe?.user;

    if (user) {
      username.value = user.username || "No username";
      firstName.value = user.first_name || "Unknown";
      lastName.value = user.last_name || "Unknown";

      const tgInitData = window.Telegram.WebApp.initData;

      const params = new URLSearchParams(tgInitData);

      const authDate = params.get("auth_date");
      const hash = params.get("hash");

      params.delete("hash");

      const dataCheckString = Array.from(params.entries())
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");

      const validationData = {
        web_app_data: {
          data_check_string: dataCheckString,
          auth_date: authDate,
          hash: hash,
        },
      };
      await validateData(validationData);
    }
  } else {
    console.error("Telegram WebApp API не доступен.");
  }
  document.addEventListener("click", handleClickOutsideLanguageSettings);
});
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="user-wrapper">
          <img src="#" alt="" />
          <p>{{ firstName }}</p>
        </div>
        <router-link to="/settings" class="settings-wrapper">
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
  color: $c-light-element

.header-content
  position: relative
  width: 100%
  display: flex
  align-items: center
  align-self: end
  justify-content: space-between

.user-wrapper
  display: flex
  align-items: center
  height: 36px
  background: $c-dark-element
  border-radius: 50px
  gap: 7px
  padding: 4px 16px 4px 4px
  border: 0.4px solid $c-dark-element
  border-image-source: linear-gradient(0deg, rgba(34, 240, 125, 0.2), rgba(34, 240, 125, 0.2)), linear-gradient(74.2deg, rgba(255, 255, 255, 0) 83.38%, rgba(255, 255, 255, 0.5) 116.14%)
  backdrop-filter: blur(2px)

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
  border: 0.4px solid $c-dark-element
  border-image-source: linear-gradient(0deg, rgba(34, 240, 125, 0.2), rgba(34, 240, 125, 0.2)), linear-gradient(74.2deg, rgba(255, 255, 255, 0) 83.38%, rgba(255, 255, 255, 0.5) 116.14%)
  backdrop-filter: blur(2px)
  border-radius: 50px
</style>
