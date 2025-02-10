<script setup lang="ts">
import SliderButton from "@/components/ui/SliderButton.vue";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import { useI18n } from "vue-i18n";
import { eventBus } from "@/event_bus/eventBus";
import router from "@/router";
import { settingsStore } from "@/store/settings";
import {profileStore} from "@/store/user-profile.ts";
import type {Language} from "@/types/types.ts";
import {telegramStore} from "@/store/telegram.ts";

const settingsStoreInstance = settingsStore();

const isAvatarSettingsVisible = ref(false);
const isConfirmModalVisible = ref(false);
const isLanguageSettingsVisible = ref(false);
const isReferalSettingsVisible = ref(false);

const avatarSettingArrow = ref("arrow-icon");
const accountArrow = ref("arrow-icon");
const languageArrow = ref("arrow-icon");
const referalArrow = ref("arrow-icon");

const { t, locale } = useI18n();

const toggleDropdown = (
  isVisible: Ref<boolean, boolean>,
  arrowRef: Ref<string, string>,
) => {
  isVisible.value = !isVisible.value;
  arrowRef.value = isVisible.value ? "arrow-icon--open" : "arrow-icon";
};

const toggleConfirmModal = () =>
  toggleDropdown(isConfirmModalVisible, accountArrow);
const toggleStockExchangeMenu = () =>
  toggleDropdown(isAvatarSettingsVisible, avatarSettingArrow);
const toggleLanguageSettings = () =>
  toggleDropdown(isLanguageSettingsVisible, languageArrow);

const toggleReferalSettings = () =>
  toggleDropdown(isReferalSettingsVisible, referalArrow);

const handleClickOutside = (event: Event) => {
  const dropdowns = [
    {
      isVisible: isConfirmModalVisible,
      wrapper: ".account-wrapper",
      dropdown: ".setting-dropdown--confirm",
      arrow: accountArrow,
    },
    {
      isVisible: isAvatarSettingsVisible,
      wrapper: ".avatar-settings-wrapper",
      dropdown: ".setting-dropdown--avatar",
      arrow: avatarSettingArrow,
    },
    {
      isVisible: isLanguageSettingsVisible,
      wrapper: ".language-settings-wrapper",
      dropdown: ".setting-dropdown--language",
      arrow: languageArrow,
    },
    {
      isVisible: isReferalSettingsVisible,
      wrapper: ".referal-wrapper",
      dropdown: ".setting-dropdown--referal",
      arrow: referalArrow,
    },
  ];

  dropdowns.forEach(({ isVisible, wrapper, dropdown, arrow }) => {
    const target = event.target as Node | null;
    const wrapperElement = document.querySelector(wrapper);
    const dropdownElement = document.querySelector(dropdown);

    // Если сейчас врапер открыт и цель клика не содержит ни врапер ни дропдаун,
    // то скрыть и повернуть стрелку
    if (
      wrapperElement &&
      dropdownElement &&
      target &&
      isVisible.value &&
      !wrapperElement.contains(target) &&
      !dropdownElement.contains(target)
    ) {
      isVisible.value = false;
      arrow.value = "arrow-icon";
    }
  });
};

onMounted(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", true);
  document.addEventListener("click", handleClickOutside);

  eventBus.emit("disableSettingButton", true);
  eventBus.on("headerBackBtnPressed", () => {
    router.back();
  });
});

const deleteStorage = () => {
  telegramStore().removeCompletedOnboarding();
};

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);

  eventBus.emit("disableSettingButton", false);
  eventBus.emit("toggleHeaderBackBtnVisibility", false);
  eventBus.off("headerBackBtnPressed");
});

const profileStoreInstance = profileStore()

onMounted(async () => {
  return await profileStoreInstance.getUserProfile()
})

const settingsComputed = computed(() => {
  return profileStoreInstance.userProfile.settings
})

const referalLink = ref();
// const becomeReferal = () => {
//   toggleReferalSettings();
//   const regex = /startapp=ref_([a-zA-Z0-9]+)/;
//   const match = referalLink.value.match(regex);
//   try {
//     settingsStoreInstance.becomeReferal(match[1]);
//   } catch (error) {
//     eventBus.emit("showErrorPopup", error.message);
//   }
// };

const setLanguage = async (language: Language) => {
  toggleLanguageSettings();
  locale.value = language;
  try {
    await settingsStoreInstance.changeLanguage(language);
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

const changeVibration = async() => {
  try {
    await settingsStoreInstance.changeVibration();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
}

const changeAnimation = async() => {
  try {
    await settingsStoreInstance.changeAnimation();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
}

const deleteAccount = () => {
  toggleConfirmModal();
  try {
    settingsStoreInstance.deleteAccount();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

import { THEME, TonConnectUI } from "@tonconnect/ui";
let tonConnectUI: TonConnectUI;
let currentWallet;

onMounted(async () => {
  tonConnectUI = new TonConnectUI({
    manifestUrl: `https://sww.tonycrypto.site/#/tonconnect-manifest.json`,
    buttonRootId: "ton-button",
  });

  tonConnectUI.uiOptions = {
    language: "ru",
    uiPreferences: {
      theme: THEME.DARK,
    },
  };

  tonConnectUI.onStatusChange(async () => {
    if (tonConnectUI.connected) {
      const connectedWallet = tonConnectUI.wallet;
      console.log("Wallet connected:", connectedWallet);
      // if (connectedWallet)
      //   // await paymentsStoreInstance.connectWallet(
      //   //     connectedWallet?.account.address,
      //   // );
    } else {
      console.log("Wallet disconnected");
    }
  });
});
</script>

<template>
  <section class="settings">
    <div class="bg"></div>
    <div class="container">
      <div class="settings-content">
        <h2>Settings</h2>
        <button @click="deleteStorage" v-if="!isProd" style="color: white">Удалить</button>
        <div class="settings-list">
          <div class="settings-wrapper">
            <button id="ton-button">{{ t("connect-wallet") }}</button>
          </div>
          <div
            class="settings-wrapper avatar-settings-wrapper"
            @click="toggleStockExchangeMenu"
            v-if="false"
          >
            <div class="setting-header">
              <h3>{{ t("avatar-setting") }}</h3>
              <img
                :class="avatarSettingArrow"
                src="../../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--avatar"
              v-if="isAvatarSettingsVisible"
              @click.stop
            >
              <p>Выбор фото</p>
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
                src="../../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--language"
              v-if="isLanguageSettingsVisible"
              @click.stop
            >
              <button @click="setLanguage('en')" class="language-btn">
                <img
                  src="../../assets/svg/flags/eng.svg"
                  alt="English language"
                />
                {{ t("english") }}
              </button>
              <button @click="setLanguage('ru')" class="language-btn">
                <img
                  src="../../assets/svg/flags/rus.svg"
                  alt="Russian language"
                />
                {{ t("russian") }}
              </button>
            </div>
          </div>

          <div
            class="settings-wrapper referal-wrapper"
            @click="toggleReferalSettings"
          >
            <div class="setting-header">
              <h3>{{ t("become-referal") }}</h3>
              <img
                :class="referalArrow"
                src="../../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--referal"
              v-if="isReferalSettingsVisible"
              @click.stop
            >
              <p>{{ t("enter-referal") }}:</p>
              <input
                type="text"
                v-model="referalLink"
                placeholder="https://t.me/sww/app?startapp=ref_Tuq6WQIoEy"
              />
              <button
                @click="becomeReferal"
                class="setting-btn setting-btn--confirm"
              >
                {{ t("confirm-btn") }}
              </button>
            </div>
          </div>

          <div
            class="settings-wrapper account-wrapper"
            @click="toggleConfirmModal"
          >
            <div class="setting-header">
              <h3>{{ t("delete-account") }}</h3>
              <img
                :class="accountArrow"
                src="../../assets/svg/nav/arrow-right.svg"
                alt=""
              />
            </div>
            <div
              class="setting-dropdown setting-dropdown--confirm"
              v-if="isConfirmModalVisible"
              @click.stop
            >
              <h3>{{ t("is-sure") }}</h3>
              <div class="confirm-modal__buttons">
                <button
                  class="setting-btn setting-btn--confirm"
                  @click="deleteAccount"
                >
                  {{ t("yes") }}
                </button>
                <button
                  class="setting-btn setting-btn--deny"
                  @click="toggleConfirmModal"
                >
                  {{ t("no") }}
                </button>
              </div>
            </div>
          </div>

          <h4>{{ t("game-settings") }}</h4>

          <div class="sliders">
            <div class="settings-wrapper">
              <h3>{{ t("vibration") }}</h3>
              <SliderButton @click="changeVibration"/>
            </div>
            <div class="settings-wrapper">
              <h3>{{ t("coin-animation") }}</h3>
              <SliderButton @click="changeAnimation"/>
            </div>
          </div>
        </div>
        <p class="politic">Политика конфедициальности</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

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
  background-image: url("../../assets/svg/settings-vectors.svg")

.settings-content
  width: 100%
  align-items: start
  flex-direction: column
  display: flex

h2
  font-weight: 600
  color: vars.$c-light-text
  margin-bottom: 46px

.settings-list
  margin-top: 10px
  width: 100%
  display: flex
  flex-direction: column
  gap: 10px

.settings-wrapper
  background: rgba(255, 255, 255, 0.02)
  box-shadow: vars.$c-element-shadow
  backdrop-filter: blur(8.53px)
  border: 1px solid vars.$c-border-color
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

  p
    opacity: 60%
    font-size: 12px

  button
    display: flex
    align-items: center
    gap: 10px
    font-size: 18px
    color: white

.setting-dropdown--referal
  input
    height: 30px
    padding: 3px 0
    background: transparent
    border: none
    border-bottom: 1px solid vars.$c-dark-element
    font-size: 11px
    outline: none
    color: white
    width: 100%
    transition: 0.2s border-bottom-color ease

  input:focus
    border-bottom: 1px solid vars.$c-light-element

.setting-dropdown--confirm
  align-items: center

  .confirm-modal__buttons
    display: flex
    width: 100%
    justify-content: space-around

h4
  margin-top: 10px

.sliders
  justify-content: space-between
  width: 100%
  display: flex
  gap: 10px
  color: vars.$c-light-text

.slider-setting
  display: flex
  justify-content: space-between
  padding: 0 0 0 15px
  align-items: center

.setting-btn, setting-btn--confirm, setting-btn--deny
  font-size: 18px
  border-radius: 12px
  border: 1px solid vars.$c-main-text
  padding: 5px 10px
  box-shadow: vars.$c-element-shadow

.setting-btn--confirm
  background: vars.$c-light-element
  color: vars.$c-main-text

.setting-btn--deny
  background: vars.$c-btn-deny
  color: vars.$c-light-text

.politic
  opacity: 60%
  font-size: 12px
  align-self: start
  margin-top: 30px
  color: vars.$c-light-text

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
  background: vars.$c-dark-element
  box-shadow: vars.$c-element-shadow

.language-settings
  position: absolute
  background: vars.$c-light-text
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
    color: vars.$c-main-text
</style>
