import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import {checkResponseSuccess, requestConfig} from "@/store/utils/apiUtils";
import type {Language, SettingsBase} from "@/types/types.ts";
import {profileStore} from "@/store/user-profile.ts";

export const settingsStore = defineStore("settings", {
  state: () => ({}),

  actions: {
    // async deleteAccount() {
    //   try {
    //     const initData = telegramStore().initData;
    //
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_BACKEND}/api/delete-account`,
    //       initData,
    //     );
    //
    //     checkResponseSuccess(response);
    //   } catch (error) {
    //     console.error("Ошибка при удалении аккаунта:", error);
    //     throw new Error("Server error while deleting the account");
    //   }
    // },

    async changeLanguage(lang: Language) {
      const newSettings = { ...profileStore().userProfile.settings }
      newSettings.language = lang
      if (newSettings)
        await this.changeSettings(newSettings)
    },

    async changeVibration() {
      let newSettings = { ...profileStore().userProfile.settings }
      newSettings.vibration = !newSettings.vibration
      if (newSettings)
        await this.changeSettings(newSettings)
    },

    async changeAnimation() {
      let newSettings = { ...profileStore().userProfile.settings }
      newSettings.animation = !newSettings.animation
      if (newSettings)
        await this.changeSettings(newSettings)
    },

    async changeSettings(settings: SettingsBase) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/settings/`
        const data = {
          language: settings.language,
          vibration: settings.vibration,
          animation: settings.animation,
        }

        const validatedResponse = await checkResponseSuccess(url, "patch", data)

        if (validatedResponse)
          profileStore().userProfile.settings = validatedResponse.data;
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },
  },

  getters: {},
});
