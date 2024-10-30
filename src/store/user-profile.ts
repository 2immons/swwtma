import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";
import { useI18n } from "vue-i18n";

export const profileStore = defineStore("profile", {
  state: () => ({
    balance: 40000,
    speed: 0.36,
    remainingMinutes: 60,
    chatId: "",
    name: ""
  }),

  actions: {
    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile(queryForValidation: any) {
      const { locale } = useI18n(); // Вызов внутри метода

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
        this.speed = response.data.summPower;
        this.chatId = response.data.chatId;
        this.name = response.data.name;
        locale.value = response.data.language || "en"; // Установка локали
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
