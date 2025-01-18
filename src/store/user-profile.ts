import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { useI18n } from "vue-i18n";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

interface ProfileResponse {
  balance: number;
  newSpeed: number;
  chatId: string;
  name: string;
  language: string;
  process: {
    state: string; // active, closed
    remainingSeconds: number;
    totalProcessSeconds: number;
    miningResult: number;
  };
}

export const profileStore = defineStore("profile", {
  state: () => ({
    balance: 40000,
    newSpeed: 0.36,
    chatId: "",
    name: "",
    process: {
      state: "closed", // active, closed
      remainingSeconds: 122,
      totalProcessSeconds: 8 * 60 * 60,
      miningResult: 300,
    },
  }),

  actions: {
    // setProfileVariables устанавливает переменные профиля
    setProfileVariables(responseData: ProfileResponse) {
      const { locale } = useI18n();

      const process = responseData.process;

      this.process.state = process.state;

      if (this.process.state === "ACTIVE") {
        this.process.remainingSeconds = process.remainingSeconds;
      }

      this.balance = responseData.balance;
      this.newSpeed = responseData.newSpeed;
      this.chatId = responseData.chatId;
      this.name = responseData.name;
      locale.value = responseData.language || "en";
    },

    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/profile/myProfile`,
          webAppData
        );

        checkResponseSuccess(response);

        this.setProfileVariables(response.data);
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    // claimProcessReward отправляет запрос на получение награды за процесс
    async claimProcessReward() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/profile/myProfile`,
          webAppData
        );

        checkResponseSuccess(response);
      } catch (error) {
        console.error("Ошибка при получении награды за процесс:", error);
        throw new Error("Server error when claiming reward");
      }
    },
  },

  getters: {
    getBalance(state) {
      return state.balance;
    },
    getNewSpeed(state) {
      return state.newSpeed.toFixed(2);
    },
    getRemainingSeconds(state) {
      return state.process.remainingSeconds;
    },
    getTotalProcessSeconds(state) {
      return state.process.totalProcessSeconds;
    },
    getProcessState(state) {
      return state.process.state;
    },
  },
});
