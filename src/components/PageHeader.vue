<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const username = ref("Loading...");
const firstName = ref("Loading...");
const lastName = ref("Loading...");
const photoUrl = ref("");

const validateData = async (queryData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/validate",
      queryData
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

      console.log(firstName.value);
      console.log(photoUrl.value);

      const queryString = window.Telegram.WebApp.initData;
      const queryData = new URLSearchParams(queryString);

      await validateData(queryData);
    }
  } else {
    console.error("Telegram WebApp API не доступен.");
  }
  document.addEventListener("click", handleClickOutsideLanguageSettings);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideLanguageSettings);
});

const languageSettingsIsVisible = ref(false);

const toggleLanguageSettings = () => {
  languageSettingsIsVisible.value = !languageSettingsIsVisible.value;
};

const setLanguage = (language) => {
  locale.value = language;
  languageSettingsIsVisible.value = false;
};

const handleClickOutsideLanguageSettings = (event) => {
  const languageSettingsElement = document.querySelector(".language-settings");
  const languageWrapperElement = document.querySelector(".language-wrapper");

  if (
    languageSettingsIsVisible.value &&
    languageSettingsElement &&
    !languageSettingsElement.contains(event.target) &&
    !languageWrapperElement.contains(event.target)
  ) {
    languageSettingsIsVisible.value = false;
  }
};
</script>

<template>
  <header>
    <div class="container">
      <div class="header-content">
        <button class="language-wrapper" @click="toggleLanguageSettings">
          <img src="../assets/svg/lang.svg" alt="Language" />
        </button>
        <div class="language-settings" v-if="languageSettingsIsVisible">
          <button @click="setLanguage('en')" class="language-btn">
            <img src="../assets/svg/flags/eng.svg" alt="English language" />
            {{ t("english") }}
          </button>
          <button @click="setLanguage('ru')" class="language-btn">
            <img src="../assets/svg/flags/rus.svg" alt="Russian language" />
            {{ t("russian") }}
          </button>
        </div>
        <div class="user-wrapper">
          <p>{{ firstName }}</p>
        </div>
        <router-link to="/settings" class="settings-wrapper">
          <img src="../assets/svg/settings.svg" alt="Настройки" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
header
  top: 0
  display: flex
  flex-direction: column
  align-items: center
  height: 98px
  color: $c-light-text

.header-content
  position: relative
  width: 100%
  display: flex
  align-items: center
  align-self: end

.language-wrapper
  display: flex
  justify-content: center
  align-items: center
  border-radius: 10px
  width: 40px
  height: 40px
  background: $c-gradient
  box-shadow: $c-dark-element-shadow

.language-settings
  position: absolute
  background: $c-light-text
  height: fit-content
  width: 200px
  top: 47px
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px
  gap: 10px
  border-radius: 10px

  .language-btn
    display: flex
    align-items: center
    gap: 10px
    font-size: 20px
    color: $c-main-text

.user-wrapper
  display: flex
  align-items: center
  margin-left: 10px
  flex: 1

  img
    height: 40px
    width: 40px
  p
    font-size: 18px

.settings-wrapper
  display: flex
  justify-content: center
  align-items: center
  border-radius: 10px
  width: 40px
  height: 40px
  background: $c-gradient
  box-shadow: $c-dark-element-shadow
</style>
