import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";

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
      {
        id: 3,
        title: "Charity",
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
    async joinQuest(quest: any) {
      const response = await axios.post(
        config.backendURL + "/orders/join-quest",
        {
          quest,
          withCredentials: true,
        }
      );

      if (response.status !== 201) {
        throw new Error(
          "Не удалось создать обращение. Неправильный статус ответа от сервера: " +
            response.status
        );
      }
    },
  },

  getters: {},
});
