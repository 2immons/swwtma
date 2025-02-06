import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess, requestConfig } from "@/store/utils/apiUtils";
import { type CardBase } from "@/types/types"
import { profileStore } from "./user-profile";

export const cardsStore = defineStore("cards", {
  state: () => ({
    cards: [
      {
        title: "string",
        info: "string",
        image: {
          url: "string",
          filename: "string",
        },
        backdrop: "string",
        id: 0,
        level_map: [
          {
            level: 0,
            power: 0,
            upgrade_cost: 0,
          },
        ],
        is_bought: false,
        is_available: true,
        purchase_cost: 10,
        user_card: {
          card_id: 0,
          level: 0,
          power: 0,
          upgrade_cost: 100,
          max_level: false,
        },
      },

      {
        title: "string",
        info: "string",
        image: {
          url: "string",
          filename: "string",
        },
        backdrop: "string",
        id: 0,
        level_map: [
          {
            level: 0,
            power: 0,
            upgrade_cost: 0,
          },
        ],
        is_bought: false,
        is_available: false,
        purchase_cost: 110,
        user_card: {
          card_id: 0,
          level: 0,
          power: 0,
          upgrade_cost: 100,
          max_level: false,
        },
      },
    ] as CardBase[]
  }),

  actions: {
    async fetchCards() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/cards`
        const response = await axios.get(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "get")

        if (validatedResponse)
          this.cards = validatedResponse.data;
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async purchaseCard(id: number) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/cards/purchase/?card_id=${id}`;
        const response = await axios.post(url, {}, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post");

        if (validatedResponse) {
          profileStore().userProfile = validatedResponse.data;
        }
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async upgradeCard(id: number) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/cards/upgrade/?card_id=${id}`
        const response = await axios.post(url, {}, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "post")

        if (validatedResponse)
          profileStore().userProfile = validatedResponse.data
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    // async joinQuest(quest: any) {
    //   const response = await axios.post(
    //     config.backendURL + "/orders/join-quest",
    //     {
    //       quest,
    //       withCredentials: true,
    //     },
    //   );

    //   if (response.status !== 201) {
    //     throw new Error(
    //       "Не удалось создать обращение. Неправильный статус ответа от сервера: " +
    //         response.status,
    //     );
    //   }
    // },
  },

  getters: {},
});
