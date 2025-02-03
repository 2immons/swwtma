import { defineStore } from "pinia";
import axios from "axios";

import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

export const cardsStore = defineStore("cards", {
  state: () => ({
    cards: [
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: false,
      },
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: true,
      },
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: false,
      },
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: true,
      },
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: true,
      },
      {
        title: "Title",
        price: 10,
        level: 20,
        isActive: true,
      },
    ],
  }),

  actions: {
    async fetchCards() {
      try {
        const initData = telegramStore().getInitData;

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/cards/get-cards`,
          initData,
        );

        checkResponseSuccess(response);

        this.cards = response.data.data.cards;
      } catch (error) {
        console.error("Ошибка при получении профиля пользователя:", error);
        throw new Error("Server error when getting the user profile");
      }
    },

    async joinQuest(quest: any) {
      const response = await axios.post(
        config.backendURL + "/orders/join-quest",
        {
          quest,
          withCredentials: true,
        },
      );

      if (response.status !== 201) {
        throw new Error(
          "Не удалось создать обращение. Неправильный статус ответа от сервера: " +
            response.status,
        );
      }
    },
  },

  getters: {},
});
