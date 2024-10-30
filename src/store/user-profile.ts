import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

export const profileStore = defineStore("profile", {
  state: () => ({
    balance: 40000,
    speed: 0.36,
    remainingMinutes: 60,
  }),

  actions: {
    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile(queryForValidation: any) {
      try {
        const response = await axios.get(
          `${config.backendURL}/api/profile/myProfile`,
          {
            params: queryForValidation,
          }
        );

        if (response.status !== 200) {
          throw new Error(
            "Не удалось создать обращение. Статус ответа от сервера не 200: " +
              response.status
          );
        }

        this.balance = response.data.balance;
        locale.value = response.data.language || "en";
      } catch (error) {
        console.error("Ошибка при запросе профиля пользователя:", error);
        throw error;
      }
    },
  },

  getters: {
    getBalance(state) {
      return state.balance;
    },
    getSpeed(state) {
      return state.speed.toFixed(2);
    },
    getRemainingTime(state) {
      const hours = Math.floor(state.remainingMinutes / 60);
      const minutes = state.remainingMinutes % 60;

      return [hours, minutes];
    },
  },
});
