import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess, getRequestConfig } from "@/store/utils/apiUtils";
import { profileStore } from "./user-profile";
import type { UserReferrals } from "@/types/types";

const mockReferalsResponse = {
  id: 0,
  user_id: 0,
  username: "string",
  referrer_id: 0,
  user_image_url: "string",
  is_banned: false,
  is_deleted: false,
  referral_code: "string",
  claimable: 0,
  referrals: [
    {
      username: "string",
      user_id: 0,
      total_income: 1,
      claimed_income: 4,
      unclaimed_income: 0,
      user_image_url: ""
    },
    {
      username: "string",
      user_id: 2,
      total_income: 2,
      claimed_income: 3,
      unclaimed_income: 0,
      user_image_url: "https://e7.pngegg.com/pngimages/875/651/png-clipart-background-brush-texture-brush-black-thumbnail.png"
    }
  ]
} as UserReferrals

function getReferalLink(code: string | null) {
  return `https://t.me/EcologyWorkers_bot/saveworldweb?startapp=${code}`
}

export const friendsStore = defineStore("friends", {
  state: () => ({
    referalText: "Присоединяйтесь!",
    referalLink: getReferalLink(profileStore().userProfile.referral_code),
    friends: mockReferalsResponse
  }),

  actions: {
    async fetchFriends() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/referrals/`

        const validatedResponse = await checkResponseSuccess(url, "get")

        if(validatedResponse) {
          this.friends = validatedResponse.data;
        }
      } catch (error) {
        console.error("Ошибка при получении друзей:", error);
        throw new Error("Server error when getting friends list");
      }
    },

    async claimReward() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/users/referrals/`

        const validatedResponse = await checkResponseSuccess(url, "post", {})

        if(validatedResponse) {
          this.friends = validatedResponse.data;
          profileStore().updateBalance(validatedResponse.data.balance.balance, validatedResponse.data.balance.mining_power)
        }
      } catch (error) {
        console.error("Ошибка при получении друзей:", error);
        throw new Error("Server error when getting friends list");
      }
    }
  },

  getters: {},
});
