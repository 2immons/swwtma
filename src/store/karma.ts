import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";

export const karmaStore = defineStore("karma", {
  state: () => ({
    categories: [
      {
        id: 0,
        title: "Social",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          }
        ],
      },
      {
        id: 1,
        title: "Network",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
      {
        id: 2,
        title: "Test 1",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
      {
        id: 3,
        title: "Test 2",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
      {
        id: 4,
        title: "Test 33",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
      {
        id: 5,
        title: "Test 33",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
      {
        id: 6,
        title: "Test 33",
        tasks: [
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
          {
            title: "Title",
            price: 10,
            level: 20,
          },
        ],
      },
    ],

    promoTasks: [
      {
        title: "Quest Name 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, metus sit amet volutpat convallis, neque sem ullamcorper.",
      },
      {
        title: "Quest Name 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, metus sit amet volutpat convallis, neque sem ullamcorper.",
      },
      {
        title: "Quest Name 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, metus sit amet volutpat convallis, neque sem ullamcorper.",
      },
      {
        title: "Quest Name 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, metus sit amet volutpat convallis, neque sem ullamcorper.",
      },
    ],
  }),

  actions: {
    fetchQuests() {
      return this.promoTasks;
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
