import { defineStore } from "pinia";
import axios from "axios";
import { useI18n } from "vue-i18n";
import {checkResponseSuccess, getCsrfToken, requestConfig} from "@/store/utils/apiUtils";
import {
  type MiningBase,
  type MiningStatus,
  type UserBase,
  type UserGetSchema,
} from "@/types/types";

const mockUserProfile: UserGetSchema = {
  id: 0,
  user_id: 0,
  username: "string",
  referrer_id: 0,
  is_banned: false,
  is_deleted: false,
  referral_code: "string",
  balance: {
    balance: 0,
    mining_power: 0,
  },
  settings: {
    language: "en",
    vibration: false,
    animation: false,
  },
  done_tasks: [],
  user_cards: [],
  karma_donates: [],
  minings: [
    {
      amount: 0,
      status: "pending",
      start_time: "2025-02-03T13:07:16.660503",
      end_time: "2025-02-03T13:07:16.660503",
      is_claimed: false,
    },
  ],
  referrer: {
    id: 0,
    user_id: 0,
    username: "string",
    referrer_id: 0,
    is_banned: false,
    is_deleted: false,
    referral_code: "string",
  },
};

export const profileStore = defineStore("profile", {
  state: () => ({
    userProfile: mockUserProfile,
  }),

  actions: {
    // setProfileVariables устанавливает переменные профиля
    setProfileVariables(responseData: UserGetSchema) {
      this.userProfile = responseData;

      const { locale } = useI18n();
      locale.value = responseData.settings?.language || "en";
    },

    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/?extra=all`
        const response = await axios.get(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "get")

        this.setProfileVariables(validatedResponse.data);
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async startMining() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/start-mining`
        const response = await axios.post(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post")
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    // claimProcessReward отправляет запрос на получение награды за процесс
    async claimMining() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/claim-mining`
        const response = await axios.post(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post")
      } catch (error) {
        console.error("Ошибка при получении награды за процесс:", error);
        throw new Error("Server error when claiming reward");
      }
    },
  },

  getters: {
    getBalance(state) {
      return state.userProfile.balance?.balance;
    },
    getPower(state) {
      return state.userProfile.balance?.mining_power;
    },

    getMiningInfo(
      state,
    ): MiningBase & {
      remainingHours: number;
      remainingMinutes: number;
      elapsedSeconds: number;
      totalSeconds: number;
      remainingSeconds: number;
    } {
      const miningInfo = state.userProfile.minings[0];
      const endTime = new Date(miningInfo.end_time).getTime();
      const startTime = new Date(miningInfo.start_time).getTime();
      const currentTime = Date.now();

      // Calculate the timezone offset in milliseconds
      const userTimezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
      const moscowTimezoneOffset = -180 * 60 * 1000; // Moscow is UTC+3, so -180 minutes

      // Adjust the end time and start time to the user's timezone
      const adjustedEndTime =
        endTime + userTimezoneOffset - moscowTimezoneOffset;
      const adjustedStartTime =
        startTime + userTimezoneOffset - moscowTimezoneOffset;

      const remainingMilliseconds = adjustedEndTime - currentTime;
      const elapsedMilliseconds = currentTime - adjustedStartTime;
      const totalMilliseconds = adjustedEndTime - adjustedStartTime;

      const remainingHours = Math.floor(
        remainingMilliseconds / (1000 * 60 * 60),
      );
      const remainingMinutes = Math.floor(
        (remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
      );
      const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
      const totalSeconds = Math.floor(totalMilliseconds / 1000);

      return {
        ...miningInfo,
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        elapsedSeconds,
        totalSeconds,
      };
    },
  },
});
