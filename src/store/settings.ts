import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

export const settingsStore = defineStore("settings", {
  state: () => ({}),

  actions: {
    async deleteAccount() {
      try {
        const initData = telegramStore().initData;

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/delete-account`,
          initData,
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка при удалении аккаунта:", error);
        throw new Error("Server error while deleting the account");
      }
    },
    async changeLanguage(language: string) {
      try {
        const initData = telegramStore().getInitData;

        const requestBody = {
          // ...initData,
          language: language,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/change-language`,
          requestBody,
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка смены языка:", error);
        throw new Error("Server error while changing the language");
      }
    },
    async becomeReferal(code: string) {
      try {
        const initData = telegramStore().getInitData;

        const requestBody = {
          //...initData,
          code: code,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/become-referal`,
          requestBody,
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка привязки аккаунта по реферальной ссылке:", error);
        throw new Error("Server error while becoming referal");
      }
    },
  },

  getters: {},
});
