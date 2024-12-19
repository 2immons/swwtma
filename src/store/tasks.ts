import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./utils/config";
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess } from "@/store/utils/apiUtils";

interface Task {
  id: number;
  title: string;
  url: string;
  status: string;
}

interface Category {
  cat_id: number;
  title: string;
  tasks: Task[];
}

interface PromoTask {
  promo_task_id: number;
  description: string;
  title: string;
  promo_task_status: string;
  tasks: Task[];
}

export const questsStore = defineStore("tasks", {
  state: () => ({
    categories: [
      {
        cat_id: 0,
        title: "Social",
        tasks: [
          {
            id: 0,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "VERIFYING",
          },
          {
            id: 1,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "CLAIMED",
          },
          {
            id: 2,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "COMPLETED",
          },
          {
            id: 3,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
          {
            id: 4,
            title: "Tasks 3",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
        ],
      },
      {
        cat_id: 1,
        title: "Social 2",
        tasks: [
          {
            id: 5,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "VERIFYING",
          },
          {
            id: 6,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "CLAIMED",
          },
          {
            id: 7,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "COMPLETED",
          },
          {
            id: 8,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
          {
            id: 9,
            title: "Tasks 3",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
        ],
      },
      {
        cat_id: 2,
        title: "Social 3",
        tasks: [
          {
            id: 10,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "VERIFYING",
          },
          {
            id: 11,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "CLAIMED",
          },
          {
            id: 12,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "COMPLETED",
          },
        ],
      },
    ] as Category[],

    promoTasks: [
      {
        promo_task_id: 0,
        title: "Recycle",
        description: "Recycle 5 batteries.",
        promo_task_status: "NOT_STARTED",
        tasks: [
          {
            id: 0,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "VERIFYING",
          },
          {
            id: 1,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "CLAIMED",
          },
          {
            id: 2,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "COMPLETED",
          },
          {
            id: 3,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
          {
            id: 4,
            title: "Tasks 3",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
        ],
      },
      {
        promo_task_id: 1,
        title: "Animals",
        description: "Recycle 5 batteries.",
        promo_task_status: "NOT_STARTED",
        tasks: [
          {
            id: 5,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "VERIFYING",
          },
          {
            id: 6,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "CLAIMED",
          },
          {
            id: 7,
            title: "Task 1",
            url: "https://vk.com/al_feed.php",
            status: "COMPLETED",
          },
          {
            id: 8,
            title: "Tasks 2",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
          {
            id: 9,
            title: "Tasks 3",
            url: "https://vk.com/al_feed.php",
            status: "NOT_STARTED",
          },
        ],
      },
    ] as PromoTask[],
  }),

  actions: {
    async fetchTasks() {
      try {
        const webAppData = telegramStore().getWebAppData;

        const response = await axios.post(
          `${config.backendURL}/api/cards/get-karma`,
          webAppData
        );

        checkResponseSuccess(response);

        this.categories = response.data.data.tasks;
        this.promoTasks = response.data.data.promoTasks;
      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        throw new Error("Server error when getting tasks list");
      }
    },

    acceptTask(task: any) {
      const category = this.categories.find((cat) =>
        cat.tasks.some((t) => t.id === task.id)
      );
      if (category) {
        const taskToUpdate = category.tasks.find((t) => t.id === task.id);
        if (taskToUpdate) {
          taskToUpdate.status = "VERIFYING";

          // TODO: заменить ниже на получение ответа от сервера
          setTimeout(() => {
            taskToUpdate.status = "COMPLETED";
          }, 5000);
        }
      }
    },

    acceptPromoTask(task: any) {
      const promoTask = this.promoTasks.find((pt) =>
        pt.tasks.some((t) => t.id === task.id)
      );
      if (promoTask) {
        const taskToUpdate = promoTask.tasks.find((t) => t.id === task.id);
        if (taskToUpdate) {
          taskToUpdate.status = "VERIFYING";
          promoTask.promo_task_status = "IN_PROGRESS";

          // TODO: заменить ниже на получение ответа от сервера
          setTimeout(() => {
            taskToUpdate.status = "COMPLETED";
          }, 5000);

          let isAllTasksCompleted = true;
          promoTask.tasks.forEach((task) => {
            if (task.status !== "COMPLETED") {
              isAllTasksCompleted = false;
              return;
            }
          });

          if (isAllTasksCompleted) {
            promoTask.promo_task_status = "COMPLETED";
          }
        }
      }
    },

    claimPromoTaskReward(promoTask: PromoTask) {
      const foundPromoTask = this.promoTasks.find(
        (pt: PromoTask) => pt.promo_task_id === promoTask.promo_task_id
      );

      // TODO: вставить здесь запрос на сервер

      if (foundPromoTask) {
        promoTask.promo_task_status = "CLAIMED";
      }
    },

    claimReward(task: any) {
      const category = this.categories.find((cat) =>
        cat.tasks.some((t) => t.id === task.id)
      );
      if (category) {
        const taskToUpdate = category.tasks.find((t) => t.id === task.id);
        if (taskToUpdate) {
          taskToUpdate.status = "CLAIMED";
        }
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
