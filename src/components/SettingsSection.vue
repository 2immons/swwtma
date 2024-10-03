<script setup lang="ts">
import SliderButton from "@/components/ui/SliderButton.vue";
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const isStockExchangeMenuVisible = ref(false);
const isConfirmModalVisible = ref(false);

const { t, locale } = useI18n();

const toggleConfirmModal = () => {
  isConfirmModalVisible.value = !isConfirmModalVisible.value;
  accountArrow.value = isConfirmModalVisible.value
    ? "arrow-icon--open"
    : "arrow-icon";
};

const toggleStockExchangeMenu = () => {
  isStockExchangeMenuVisible.value = !isStockExchangeMenuVisible.value;
  stockExchangeArrow.value = isStockExchangeMenuVisible.value
    ? "arrow-icon--open"
    : "arrow-icon";
};

const checkAndClose = (
  isVisible: Ref<boolean>,
  elementClass: string,
  wrapperClass: string,
  arrowRef: Ref<string>,
  event: Event
) => {
  const element = document.querySelector(`.${elementClass}`);
  const wrapper = document.querySelector(`.${wrapperClass}`);

  const target = event.target as Node | null;

  if (
    isVisible.value &&
    element instanceof Node &&
    wrapper instanceof Node &&
    target &&
    !element.contains(target) &&
    !wrapper.contains(target)
  ) {
    isVisible.value = false;
    arrowRef.value = "arrow-icon";
  }
};

const handleClickOutside = (event: Event) => {
  checkAndClose(
    isConfirmModalVisible,
    "confirm-modal",
    "account-wrapper",
    accountArrow,
    event
  );
  checkAndClose(
    isStockExchangeMenuVisible,
    "stock-exchange-menu",
    "stock-exchange-wrapper",
    stockExchangeArrow,
    event
  );
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const stockExchange = ref("Bybit");

const setStock = (stock: string) => {
  stockExchange.value = stock;
};

const accountArrow = ref("arrow-icon");
const stockExchangeArrow = ref("arrow-icon");

onMounted(async () => {
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
  <section class="settings">
    <div class="container">
      <div class="settings-content">
        <h2>Settings</h2>
        <div class="settings-list">
          <button class="language-wrapper" @click="toggleLanguageSettings">
            <img src="../assets/svg/header/lang.svg" alt="Language" />
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
          <div
            class="settings-wrapper stock-exchange-wrapper"
            @click="toggleStockExchangeMenu"
          >
            <h3>{{ t("change-stock") }}</h3>
            <p>{{ stockExchange }}</p>
            <img
              :class="stockExchangeArrow"
              src="../assets/svg/nav/arrow-right.svg"
              alt=""
            />
            <div class="stock-exchange-menu" v-if="isStockExchangeMenuVisible">
              <button @click="setStock('Bybit')" class="language-btn">
                <img src="../assets/svg/flags/eng.svg" alt="English language" />
                Bybit
              </button>
              <button @click="setStock('Test')" class="language-btn">
                <img src="../assets/svg/flags/rus.svg" alt="Russian language" />
                Test
              </button>
            </div>
          </div>
          <div class="settings-wrapper referal-wrapper">
            <h3>{{ t("become-referal") }}</h3>
            <p></p>
          </div>
          <div
            class="settings-wrapper account-wrapper"
            @click="toggleConfirmModal"
          >
            <h3>{{ t("delete-account") }}</h3>
            <img
              :class="accountArrow"
              src="../assets/svg/nav/arrow-right.svg"
              alt=""
            />
            <div class="confirm-modal" v-if="isConfirmModalVisible">
              <h3>{{ t("is-sure") }}</h3>
              <div class="confirm-modal__buttons">
                <button class="confirm-btn" @click="deleteAccount">
                  {{ t("yes") }}
                </button>
                <button class="deny-btn" @click="toggleConfirmModal">
                  {{ t("no") }}
                </button>
              </div>
            </div>
          </div>
          <div class="sliders">
            <div class="slider-setting">
              <h3>{{ t("vibration") }}</h3>
              <SliderButton />
            </div>
            <div class="slider-setting">
              <h3>{{ t("coin-animation") }}</h3>
              <SliderButton />
            </div>
          </div>
        </div>
        <p class="politic">Политика конфедициальности</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.settings
  display: flex
  justify-content: center
  margin: 20px 0
.settings-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex
h2
  color: $c-light-text

.settings-list
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 8px

.settings-wrapper
  background: $c-dark-element
  box-shadow: $c-element-shadow
  border-radius: 12px
  display: flex
  flex-direction: column
  height: 60px
  align-items: start
  justify-content: center
  padding: 0 15px
  position: relative

  img
    position: absolute
    right: 15px

.stock-exchange-wrapper, .account-wrapper
  position: relative

.confirm-modal
  width: 100%
  background: $c-light-element
  position: absolute
  z-index: 2
  top: 63px
  left: 0
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px
  gap: 10px
  border-radius: 10px

  h3
    width: 100%
    text-align: center
  .confirm-modal__buttons
    display: flex
    width: 100%
    justify-content: space-around

    button
      background: $c-light-element
      color: $c-main-text
      font-size: 18px
      border-radius: 12px
      border: 1px solid $c-main-text
      padding: 5px 10px
      box-shadow: $c-element-shadow

.stock-exchange-menu
  height: 100px
  width: 100%
  background: $c-light-element
  position: absolute
  z-index: 2
  top: 63px
  left: 0
  display: flex
  flex-direction: column
  align-items: start
  padding: 10px
  gap: 10px
  border-radius: 10px

  button
    display: flex
    align-items: center
    gap: 10px
    font-size: 20px
    color: $c-main-text

.sliders
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 10px
  color: $c-light-text

.slider-setting
  display: flex
  justify-content: space-between
  padding: 0 0 0 15px
  align-items: center


.politic
  margin-top: 30px
  color: $c-light-text

.arrow-icon
  transform: rotateZ(0deg)
  transition: 0.3s ease

.arrow-icon--open
  transform: rotateZ(90deg)
  transition: 0.3s ease

.language-wrapper
  display: flex
  justify-content: center
  align-items: center
  border-radius: 10px
  width: 40px
  height: 40px
  background: $c-dark-element
  box-shadow: $c-element-shadow

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
  z-index: 2

  .language-btn
    display: flex
    align-items: center
    gap: 10px
    font-size: 20px
    color: $c-main-text
</style>
