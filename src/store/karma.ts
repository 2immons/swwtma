import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

export const karmaStore = defineStore("karma", {
  state: () => ({
    categories: [
      {
        id: 0,
        title: "Recycle",
        karmaCards: [
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            userDonat: 0,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            userDonat: 12,
            isPurchased: true,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 1000,
            userDonat: 12,
            isPurchased: true,
            status: "CLOSED",
          },
        ],
      },
      {
        id: 1,
        title: "Medicine",
        karmaCards: [
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: true,
            status: "ACTIVE",
          },
        ],
      },
      {
        id: 2,
        title: "Animals",
        karmaCards: [
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
          {
            title: "Title",
            price: 10,
            boost: 10,
            goal: 1000,
            raised: 100,
            isPurchased: false,
            status: "ACTIVE",
          },
        ],
      },
    ],
  }),

  actions: {
    async fetchKarma() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/cards/get-karma`,
          webAppData,
        );

        checkResponseSuccess(response);

        this.categories = response.data.data.categories;
      } catch (error) {
        console.error("Ошибка при получении карточек кармы:", error);
        throw new Error("Server error when getting karma-cards");
      }
    },
  },

  getters: {},
});
