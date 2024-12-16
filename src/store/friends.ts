import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

export const friendsStore = defineStore("friends", {
  state: () => ({
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
        const validationQuery = telegramStore().ensureValidationQuery();

        const response = await axios.post(
          `${config.backendURL}/api/cards/get-karma`,
          validationQuery
        );

        checkResponseSuccess(response);

        this.friends = response.data.data.friends;
      } catch (error) {
        console.error("Ошибка при получении друзей:", error);
        throw new Error("Server error when getting friends list");
      }
    },

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
