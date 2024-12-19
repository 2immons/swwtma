import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";


export const friendsStore = defineStore("friends", {
  state: () => ({
    referalLink: null as null | string,
    friends: [
      {
        name: "Имя",
        boost: 10,
        total: 20,
      },
      {
        name: "Имя",
        boost: 10,
        total: 20,
      },
      {
        name: "Имя",
        boost: 10,
        total: 20,
      },
      {
        name: "Имя",
        boost: 10,
        total: 20,
      },
      {
        name: "Имя",
        boost: 10,
        total: 20,
      },
    ],
  }),

  actions: {
    async fetchFriends() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/cards/get-karma`,
          webAppData
        );

        checkResponseSuccess(response);

        this.friends = response.data.data.friends;
      } catch (error) {
        console.error("Ошибка при получении друзей:", error);
        throw new Error("Server error when getting friends list");
      }
    },

    async ensureReferalLink() {
      if (!this.referalLink) {
        try {
          this.referalLink = await this.requestReferalLink()
        } catch (error) {
          console.error("Ошибка получения реферальных данных:", error)
          throw new Error("Error when getting referal link")
        }
      }
      return this.referalLink
    },

    async requestReferalLink(): Promise<string> {
      const webAppData = telegramStore().getWebAppData;

      const response = await axios.post(
          `${config.backendURL}/api/request-invite-link`,
          webAppData
      );

      checkResponseSuccess(response);

      if (response.data.data.referalLink === null) {
        throw new Error("Реферальная ссылка полученная с сервера пустая")
      }

      return response.data.data.referalLink
    },
  },

  getters: {},
});
