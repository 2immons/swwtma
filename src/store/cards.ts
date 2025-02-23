import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess, getRequestConfig } from "@/store/utils/apiUtils";
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
            level: 1,
            power: 1,
            upgrade_cost: 1,
          },
          {
            level: 2,
            power: 2,
            upgrade_cost: 2,
          },
        ],
        is_bought: false,
        is_available: true,
        purchase_cost: 1,
        user_card: {
          card_id: 0,
          level: 1,
          power: 1,
          upgrade_cost: 1,
          max_level: true,
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
            level: 1,
            power: 1,
            upgrade_cost: 1,
          },
          {
            level: 2,
            power: 2,
            upgrade_cost: 2,
          },
        ],
        is_bought: true,
        is_available: false,
        purchase_cost: 110,
        user_card: {
          card_id: 0,
          level: 1,
          power: 1,
          upgrade_cost: 2,
          max_level: false,
        },
      },
    ] as CardBase[]
  }),

  actions: {
    async fetchCards() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/cards/`

        const validatedResponse = await checkResponseSuccess(url, "get")

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

        const validatedResponse = await checkResponseSuccess(url, "post", {});

        if (validatedResponse) {
          if (validatedResponse.status === 200) {
            profileStore().userProfile = validatedResponse.data;
            return true
          } else if (validatedResponse.status === 409) {
            return false
          }
        }
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async upgradeCard(id: number) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/cards/upgrade/?card_id=${id}`

        const validatedResponse = await checkResponseSuccess(url, "post", {})

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
