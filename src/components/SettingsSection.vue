<script setup lang="ts">
import SliderButton from "@/components/ui/SliderButton.vue";
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { eventBus } from "@/event_bus/eventBus";
import router from "@/router";

const isStockExchangeMenuVisible = ref(false);
const isConfirmModalVisible = ref(false);
const isLanguageSettingsVisible = ref(false);

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

const toggleLanguageSettings = () => {
  isLanguageSettingsVisible.value = !isLanguageSettingsVisible.value;
  languageArrow.value = languageArrow.value ? "arrow-icon--open" : "arrow-icon";
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
    "setting-dropdown--confirm",
    "account-wrapper",
    accountArrow,
    event
  );
  checkAndClose(
    isStockExchangeMenuVisible,
    "setting-dropdown--stock",
    "stock-exchange-wrapper",
    stockExchangeArrow,
    event
  );
  checkAndClose(
    isLanguageSettingsVisible,
    "setting-dropdown--language",
    "language-settings-wrapper",
    languageArrow,
    event
  );
};

onMounted(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", true)
  document.addEventListener("click", handleClickOutside);
  eventBus.emit("disableSettingButton", true);
  eventBus.on("headerBackBtnPressed", (visible) => {
    router.back();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  eventBus.emit("disableSettingButton", false);
  eventBus.emit("toggleHeaderBackBtnVisibility", false)
  eventBus.off("headerBackBtnPressed")
});

const stockExchange = ref("Bybit");

const setStock = (stock: string) => {
  stockExchange.value = stock;
};

const setLanguage = (language) => {
  locale.value = language;
};

const accountArrow = ref("arrow-icon");
const stockExchangeArrow = ref("arrow-icon");
const languageArrow = ref("arrow-icon");

onMounted(async () => {
  document.addEventListener("click", handleClickOutsideLanguageSettings);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideLanguageSettings);
});

const handleClickOutsideLanguageSettings = (event) => {
  const languageSettingsElement = document.querySelector(".language-settings");
  const languageWrapperElement = document.querySelector(".language-wrapper");

  if (
    isLanguageSettingsVisible.value &&
    languageSettingsElement &&
    !languageSettingsElement.contains(event.target) &&
    !languageWrapperElement.contains(event.target)
  ) {
    isLanguageSettingsVisible.value = false;
  }
};
</script>

<template>
  <section class="settings">
    <div class="bg"></div>
    <div class="container">
      <div class="settings-content">
        <h2>Settings</h2>
        <div class="settings-list">
          <div
            class="settings-wrapper stock-exchange-wrapper"
            @click="toggleStockExchangeMenu"
          >
            <div class="setting-header">
              <h3>{{ t("change-stock") }}</h3>
              <p>{{ stockExchange }}</p>
              <img
                :class="stockExchangeArrow"
                src="../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--stock"
              v-if="isStockExchangeMenuVisible"
            >
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
          <div
            class="settings-wrapper language-settings-wrapper"
            @click="toggleLanguageSettings"
          >
            <div class="setting-header">
              <h3>{{ t("language-settings") }}</h3>
              <img
                :class="languageArrow"
                src="../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--language"
              v-if="isLanguageSettingsVisible"
            >
              <button @click="setLanguage('en')" class="language-btn">
                <img src="../assets/svg/flags/eng.svg" alt="English language" />
                {{ t("english") }}
              </button>
              <button @click="setLanguage('ru')" class="language-btn">
                <img src="../assets/svg/flags/rus.svg" alt="Russian language" />
                {{ t("russian") }}
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
            <div class="setting-header">
              <h3>{{ t("delete-account") }}</h3>
              <img
                :class="accountArrow"
                src="../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--confirm"
              v-if="isConfirmModalVisible"
            >
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
            <div class="settings-wrapper">
              <h3>{{ t("vibration") }}</h3>
              <SliderButton />
            </div>
            <div class="settings-wrapper">
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
  margin: 46px 0 20px 0
  color: white
.bg
  position: absolute
  top: 0
  left: 0
  height: 100%
  width: 100vw
  background-image: url("../assets/svg/settings-vectors.svg")
.settings-content
  width: 100%
  align-items: start
  flex-direction: column
  display: flex
h2
  font-weight: 600
  color: $c-light-text
  margin-bottom: 46px

.settings-list
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 10px

.settings-wrapper
  background: rgba(255, 255, 255, 0.02)
  box-shadow: $c-element-shadow
  backdrop-filter: blur(8.53px)
  border: 1px solid $c-border-color
  border-radius: 18px
  display: flex
  flex-direction: column
  width: 100%
  align-items: start
  justify-content: center
  padding: 17px 20px
  position: relative
  gap: 12px

  h3
    font-size: 14px
    font-weight: 400

  img
    position: absolute
    right: 21px

.stock-exchange-wrapper, .account-wrapper
  position: relative

  p
    opacity: 60%
    font-size: 12px

.setting-header
  position: relative
  gap: 12px
  display: flex
  flex-direction: column
  width: 100%
  align-items: start
  justify-content: center

  img
    position: absolute
    right: 0

.setting-dropdown
  height: fit-content
  width: 100%
  margin-top: 20px
  display: flex
  flex-direction: column
  align-items: start
  gap: 20px
  border-radius: 10px

  button
    display: flex
    align-items: center
    gap: 10px
    font-size: 18px
    color: white

.setting-dropdown--confirm
  align-items: center

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

.sliders
  justify-content: space-between
  margin-top: 10px
  width: 100%
  display: flex
  gap: 10px
  color: $c-light-text

.slider-setting
  display: flex
  justify-content: space-between
  padding: 0 0 0 15px
  align-items: center


.politic
  opacity: 60%
  font-size: 12px
  align-self: start
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
