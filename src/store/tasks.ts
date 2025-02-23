import { defineStore } from "pinia";
import axios from "axios";
import {checkResponseSuccess, getCsrfToken, requestConfig} from "@/store/utils/apiUtils";
import {TaskAction, type TaskBaseSchema} from "@/types/types";
import {profileStore} from "@/store/user-profile.ts";

// Mock data
const mockTasksResponse = {
  groups: [
    {
      name: "Group 1",
      description: "Description for Group 1",
      is_active: true,
      tasks: [
        {
          url: "https://example.com/task1",
          name: "st233",
          description: "string1",
          reward: 100,
          action: "special",
          code_required: false,
          id: 1,
          category: "Category 1",
          social: "Social 1",
          is_done: false,
        },
        {
          url: "https://example.com/task1",
          name: "st233",
          description: "string1",
          reward: 100,
          action: "special",
          code_required: false,
          id: 1,
          category: "Category 1",
          social: "Social 1",
          is_done: false,
        },
      ],
    },
    {
      name: "Group 12",
      description: "Description for Group 1",
      is_active: true,
      tasks: [
        {
          url: "https://example.com/task1",
          name: "st233",
          description: "string1",
          reward: 100,
          action: "special",
          code_required: false,
          id: 1,
          category: "Category 1",
          social: "Social 1",
          is_done: false,
        },
        {
          url: "https://example.com/task1",
          name: "st233",
          description: "string1",
          reward: 100,
          action: "special",
          code_required: false,
          id: 1,
          category: "Category 1",
          social: "Social 1",
          is_done: false,
        },
      ],
    },
  ],
  solo_tasks: [
    {
      url: "https://example.com/solo_task1",
      name: "string2",
      description: "string 3",
      reward: 50,
      code_required: true,
      id: 2,
      category: "Category 2",
      social: "Social 2",
      is_done: false,
      action: "redirect_other_social"
    },
    {
      url: "https://example.com/solo_task1",
      name: "string",
      description: "string 1",
      reward: 50,
      code_required: false,
      id: 1,
      category: "Category 2",
      social: "Social 2",
      is_done: true,
      action: "redirect_other_social"
    },
    {
      url: "https://example.com/solo_task2",
      name: "string",
      description: "string 2",
      reward: 75,
      code_required: true,
      id: 3,
      category: "Category 3",
      social: "Social 3",
      is_done: true,
      action: "redirect_other_social"
    },
  ],
  tasks: [
    {
      url: "https://example.com/solo_task2",
      name: "string",
      description: "string 2",
      reward: 75,
      code_required: true,
      id: 3,
      category: "Category 3",
      social: "Social 3",
      is_done: true,
      action: "redirect_other"
    },
  ] as TaskBaseSchema[],
};

// Function to group tasks by category and add an index
function groupTasksByCategory(
  tasks: TaskBaseSchema[],
): Array<{ category: string; index: number; tasks: TaskBaseSchema[] }> {
  const categoryMap: { [key: string]: TaskBaseSchema[] } = {};

  tasks.forEach((task) => {
    const category = task.category || "Uncategorized"; // Default to 'Uncategorized' if category is null or undefined
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(task);
  });

  return Object.keys(categoryMap).map((category, index) => ({
    category,
    index,
    tasks: categoryMap[category],
  }));
}

// Function to determine the status of a group of tasks
const getGroupTaskStatus = (tasks: TaskBaseSchema[]): string => {
  if (tasks.every((task) => task.is_done)) {
    return "completed";
  } else if (tasks.some((task) => task.is_done)) {
    return "in_progress";
  } else {
    return "not_started";
  }
};

export const questsStore = defineStore("tasks", {
  state: () => ({
    categories: groupTasksByCategory(mockTasksResponse.solo_tasks),
    soloTasks: mockTasksResponse.solo_tasks,
    groups: mockTasksResponse.groups,
    tasks: mockTasksResponse.tasks,
  }),

  actions: {
    async fetchTasks() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/tasks/`

        const validatedResponse = await checkResponseSuccess(url, "get")

        if(validatedResponse) {
          this.categories = groupTasksByCategory(validatedResponse.data.solo_tasks);
          this.soloTasks = validatedResponse.data.solo_tasks;
          this.groups = validatedResponse.data.groups;
          this.tasks = validatedResponse.data.tasks;
        }
      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        throw new Error("Server error when getting tasks list");
      }
    },

    async completeTask(id: number, secret?: string) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/tasks/check-completion?task_id=${id}&secret=${secret}`

        const validatedResponse = await checkResponseSuccess(url, "post", {})

        if (validatedResponse) {
          if (validatedResponse.status === 200) {
            profileStore().updateBalance(validatedResponse.data.balance.balance)
            return true
          }
        }
      } catch (error) {
        console.error("Ошибка при получении заданий:", error);
        throw new Error("Server error when getting tasks list");
      }
    },

    // claimPromoTaskReward(promoTask: PromoTask) {
    //   const foundPromoTask = this.promoTasks.find(
    //     (pt: PromoTask) => pt.promo_task_id === promoTask.promo_task_id
    //   );

    //   // TODO: вставить здесь запрос на сервер

    //   if (foundPromoTask) {
    //     promoTask.promo_task_status = "CLAIMED";
    //   }
    // },

    // claimReward(task: any) {
    //   const category = this.categories.find((cat) =>
    //     cat.tasks.some((t) => t.id === task.id)
    //   );
    //   if (category) {
    //     const taskToUpdate = category.tasks.find((t) => t.id === task.id);
    //     if (taskToUpdate) {
    //       taskToUpdate.status = "CLAIMED";
    //     }
    //   }
    // },

    // async joinQuest(quest: any) {
    //   const response = await axios.post(
    //     config.backendURL + "/orders/join-quest",
    //     {
    //       quest,
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.status !== 201) {
    //     throw new Error(
    //       "Не удалось создать обращение. Неправильный статус ответа от сервера: " +
    //         response.status
    //     );
    //   }
    // },
  },

  getters: {},
});
