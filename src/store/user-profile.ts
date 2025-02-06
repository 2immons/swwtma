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
    {
      amount: 0,
      status: "pending",
      start_time: "2025-02-06T17:07:16.660503",
      end_time: "2025-02-07T15:45:16.660503",
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
    updateBalance(balance: number, mining_power: number) {
      if (this.userProfile.balance) {
        this.userProfile.balance.balance = balance
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

        const validatedResponse = await checkResponseSuccess(response, url, "post")
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

        const validatedResponse = await checkResponseSuccess(response, url, "post")
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
    } {
      const miningInfo = state.userProfile.minings[0];
      const MSK_OFFSET = 3 * 60 * 60 * 1000; // UTC+3 в миллисекундах

      const startTimeMSK = new Date(miningInfo.start_time).getTime(); // Сервер хранит MSK-время
      const endTimeMSK = new Date(miningInfo.end_time).getTime();

// Приводим MSK-время к UTC
      const startTime = startTimeMSK - MSK_OFFSET;
      const endTime = endTimeMSK - MSK_OFFSET;
      const currentTime = Date.now(); // Уже в UTC

// Вычисления
      const totalMilliseconds = endTime - startTime;
      const remainingMilliseconds = endTime - currentTime;

      const totalSeconds = Math.floor(totalMilliseconds / 1000);
      const remainingSeconds = Math.max(0, Math.floor(remainingMilliseconds / 1000)); // Не даем уйти в минус

      const remainingHours = Math.floor(remainingSeconds / 3600);
      const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);

      const remainingPercentage = ((remainingMilliseconds / totalMilliseconds) * 100).toFixed(2);

      console.log(`Total Seconds: ${totalSeconds}`);
      console.log(`Remaining Seconds: ${remainingSeconds}`);
      console.log(`Remaining Time: ${remainingHours}h ${remainingMinutes}m`);


      return {
        ...miningInfo,
        totalSeconds,
        remainingSeconds,
        remainingHours,
        remainingMinutes,
        remainingPercentage
      };
    },
  },
});
