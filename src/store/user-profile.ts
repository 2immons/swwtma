import { defineStore } from "pinia";
import axios from "axios";
import { useI18n } from "vue-i18n";
import {checkResponseSuccess, getCsrfToken, requestConfig} from "@/store/utils/apiUtils";
import {
  type MiningBase,
  type MiningStartOut,
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

export const profileStore = defineStore("profile", {
  state: () => ({
    userProfile: mockUserProfile,
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

      if (responseData.minings.length <= 0) {
        this.userProfile.minings[0] = {
          amount: 0,
          status: "completed",
          start_time: "2020-01-01T20:42:16.989Z",
          end_time: "2020-01-01T20:42:16.989Z",
          is_claimed: true,
        }
      }

      const { locale } = useI18n();
      locale.value = responseData.settings?.language || "en";
    },

    // getUserProfile получает информацию о профиле пользователя
    async getUserProfile() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/?extra=all`
        const response = await axios.get(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "get")

        if (validatedResponse)
          this.setProfileVariables(validatedResponse.data);
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async startMining() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/start-mining`
        const response = await axios.post(url, {}, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post", {})
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
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/claim-mining`
        const response = await axios.post(url, {}, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post", {})
        if (validatedResponse) {
          this.updateBalance(validatedResponse.data.balance, validatedResponse.data.mining_power)
          this.userProfile.minings[this.userProfile.minings.length - 1].status = 'completed'
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

      const remainingPercentage = Math.abs((remainingMilliseconds / totalMilliseconds) * 100 - 100);

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
