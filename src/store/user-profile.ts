import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";
import { useI18n } from "vue-i18n";

export const profileStore = defineStore("profile", {
  state: () => ({
    balance: 40000,
    speed: 0.36,
    chatId: "",
    name: "",
    process: {
      status: "closed", // active, closed
      remainingMinutes: 122,
    }
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

        const process = response.data.process;

        this.process.status = process.status;

        if (this.process.status === "ACTIVE") {
          this.process.remainingMinutes = process.remainingMinutes
        }

        this.balance = response.data.balance;
        this.speed = response.data.summPower;
        this.chatId = response.data.chatId;
        this.name = response.data.name;
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
      return state.process.remainingMinutes;
    },
    getStatus(state) {
      return state.process.status;
    },
  },
});
