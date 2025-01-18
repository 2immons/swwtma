import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

export const settingsStore = defineStore("settings", {
  state: () => ({}),

  actions: {
    async deleteAccount() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/delete-account`,
          webAppData
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка при удалении аккаунта:", error);
        throw new Error("Server error while deleting the account");
      }
    },
    async changeLanguage(language: string) {
      try {
        const webAppData = telegramStore().getWebAppData;

        const requestBody = {
          ...webAppData,
          language: language,
        };

        const response = await axios.post(
          `${config.backendURL}/api/change-language`,
          requestBody
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка смены языка:", error);
        throw new Error("Server error while changing the language");
      }
    },
    async becomeReferal(code: string) {
      try {
        const webAppData = telegramStore().getWebAppData;

        const requestBody = {
          ...webAppData,
          code: code,
        };

        const response = await axios.post(
          `${config.backendURL}/api/become-referal`,
          requestBody
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
