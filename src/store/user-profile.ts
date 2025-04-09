import { defineStore } from "pinia";
import axios from "axios";
import { useI18n } from "vue-i18n";
import {checkResponseSuccess, getCsrfToken, getRequestConfig } from "@/store/utils/apiUtils";
import {
  type MiningBase,
  type MiningStartOut,
  type MiningStatus,
  type UserBase,
  type UserGetSchema, UserReferrals,
} from "@/types/types";

const  mockUserProfile: UserGetSchema = {
  id: 0,
  user_id: 0,
  username: "string",
  referrer_id: 0,
  is_banned: false,
  is_deleted: false,
  referral_code: "string",
  streak: 2,
  last_check_in: "2025-02-08T21:48:27.105Z",
  balance: {
    balance: 0,
    mining_power: 123.222,
  },
  settings: {
    language: "ru",
    vibration: false,
    animation: false,
  },
  done_tasks: [],
  user_cards: [],
  karma_donates: [],
  minings: [
    // {
    //   amount: 50,
    //   status: "pending",
    //   start_time: "2025-02-08T23:46:48.070144",
    //   end_time: "2025-02-09T07:46:48.085681",
    //   is_claimed: false,
    // },
    // {
    //   amount: 0,
    //   status: "completed",
    //   start_time: "2020-01-01T20:42:16.989Z",
    //   end_time: "2020-01-01T20:42:16.989Z",
    //   is_claimed: true,
    // }
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

const mockCheckInInfo = [
  {
    "streak": 1,
    "reward": 1
  },
  {
    "streak": 2,
    "reward": 2
  },
  {
    "streak": 3,
    "reward": 3
  },
  {
    "streak": 4,
    "reward": 4
  },
  {
    "streak": 5,
    "reward": 0
  },
  {
    "streak": 6,
    "reward": 1
  },
  {
    "streak": 7,
    "reward": 2
  },
  {
    "streak": 8,
    "reward": 3
  },
  {
    "streak": 9,
    "reward": 4
  },
  {
    "streak": 10,
    "reward": 3000
  }
]

export const profileStore = defineStore("profile", {
  state: () => ({
    userProfile: import.meta.env.MODE === "production" ? {} as UserGetSchema : mockUserProfile,
    checkInInfo: import.meta.env.MODE === "production" ? [] : mockCheckInInfo
  }),

  actions: {
    updateBalance(balance?: number, mining_power?: number) {
      if (this.userProfile.balance) {
        if (balance)
          this.userProfile.balance.balance = balance
        if (mining_power)
          this.userProfile.balance.mining_power = mining_power
      }
    },

    updateMining(responseData: MiningStartOut) {
      if (responseData.balance?.balance && responseData.balance?.mining_power) 
        this.updateBalance(responseData.balance.balance, responseData.balance.mining_power)

      this.userProfile.minings.push({
        amount: responseData.amount,
        status: responseData.status,
        start_time: responseData.start_time,
        end_time: responseData.end_time,
        is_claimed: responseData.is_claimed,
      })
    },

    // setProfileVariables устанавливает переменные профиля
    setProfileVariables(responseData: UserGetSchema) {
      this.userProfile = responseData;
    },

    async getCheckInReward() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/check-in/`

        const validatedResponse = await checkResponseSuccess(url, "post", {})

        if (validatedResponse) {
          this.updateBalance(validatedResponse.data.balance, validatedResponse.data.mining_power)
          this.userProfile.streak = validatedResponse.data.streak
          this.userProfile.last_check_in = validatedResponse.data.last_check_in
        }

      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async getCheckInInfo() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/check-in/`

        const validatedResponse = await checkResponseSuccess(url, "get")

        if (validatedResponse)
          this.checkInInfo = validatedResponse.data
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/?extra=all`

        const validatedResponse = await checkResponseSuccess(url, "get")

        if (validatedResponse)
          this.setProfileVariables(validatedResponse.data);
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async startMining() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/start-mining/`

        const validatedResponse = await checkResponseSuccess(url, "post", {})
        if (validatedResponse) {
          const responseData = validatedResponse.data as MiningStartOut
          this.updateMining(responseData)
        }
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    // claimProcessReward отправляет запрос на получение награды за процесс
    async claimMining() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/claim-mining/`

        const validatedResponse = await checkResponseSuccess(url, "post", {})
        if (validatedResponse) {
          this.updateBalance(validatedResponse.data.balance, validatedResponse.data.mining_power)
          this.userProfile.minings = []
        }
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

    getMiningInfo(state): MiningBase & {
      totalSeconds: number;
      remainingSeconds: number;
      remainingHours: number;
      remainingMinutes: number;
      remainingPercentage: number;
    } {
      const miningInfo = state.userProfile.minings[state.userProfile.minings.length - 1];

      const MSK_OFFSET = 1 * 60 * 60 * 1000

      // Просто парсим время, без корректировки смещения!
      const startTime = new Date(miningInfo.start_time + "+03:00").getTime();
      const endTime = new Date(miningInfo.end_time + "+03:00").getTime();
      const currentTime = Date.now(); // Текущее UTC-время

      console.log("Start Time (raw):", miningInfo.start_time + "+03:00");
      console.log("End Time (raw):", miningInfo.end_time + "+03:00");
      console.log("Current Time:", new Date().toISOString());

      console.log("Start Time UTC:", new Date(startTime).toISOString());
      console.log("End Time UTC:", new Date(endTime).toISOString());

      const totalMilliseconds = endTime - startTime;
      const remainingMilliseconds = Math.max(0, endTime - currentTime);

      const totalSeconds = Math.floor(totalMilliseconds / 1000);
      const remainingSeconds = Math.floor(remainingMilliseconds / 1000);

      const remainingHours = Math.floor(remainingSeconds / 3600);
      const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);

      const remainingPercentage = Math.abs(Math.floor((remainingMilliseconds / totalMilliseconds) * 100) - 100);

      console.log(`Total Hours: ${totalMilliseconds / 3600000}h`);
      console.log(`Remaining Hours: ${remainingHours}h`);
      console.log(`Remaining Minutes: ${remainingMinutes}m`);
      console.log(`Remaining Minutes: ${remainingPercentage}m`);

      return {
        ...miningInfo,
        totalSeconds,
        remainingSeconds,
        remainingHours,
        remainingMinutes,
        remainingPercentage
      };
    }

  },
});
