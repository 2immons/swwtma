import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";

export const questsStore = defineStore("quests", {
  state: () => ({
    categories: [
      {
        id: 0,
        title: "Social",
        tasks: [
          {
            title: "Task 1",
          },
          {
            title: "Tasks 2",
          },
        ],
      },
      {
        id: 1,
        title: "Network",
        tasks: [
          {
            title: "Task 1",
          },
          {
            title: "Tasks 2",
          },
        ],
      },
      {
        id: 2,
        title: "Test 1",
        tasks: [
          {
            title: "Task 1",
          },
          {
            title: "Tasks 2",
          },
        ],
      },
      {
        id: 3,
        title: "Test 2",
        tasks: [
          {
            title: "Task 1",
          },
          {
            title: "Tasks 2",
          },
          {
            title: "Tasks 3",
          },
        ],
      },
      {
        id: 4,
        title: "Test 33",
        tasks: [
          {
            title: "Task 23",
          },
          {
            title: "Tasks 21",
          },
          {
            title: "Tasks 33",
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
