import { defineStore } from "pinia";
import axios from "axios";

import { type KarmaBase } from '@/types/types'
import { telegramStore } from "@/store/telegram";
import { checkResponseSuccess, getRequestConfig } from "@/store/utils/apiUtils";

// Convert the array to an object keyed by karma id
const mockKarmasResponse = [
  {
    id: 0,
    title: "string",
    info: "string",
    goal: 1000,
    current: 500,
    image: {
      url: "string",
      filename: "string"
    },
    backdrop: "string",
    min_donation: 100,
    status: "active",
    income_percent: 1,
    category: {
      name: "string"
    },
    is_donated: true,
    donate_amount: 100
  },
  {
    id: 1,
    title: "string",
    info: "string",
    goal: 0,
    current: 0,
    image: {
      url: "string",
      filename: "string"
    },
    backdrop: "string",
    min_donation: 0,
    status: "active",
    income_percent: 1,
    category: {
      name: "string"
    },
    is_donated: false,
    donate_amount: 0
  }
] as KarmaBase[];

// Function to group tasks by category and add an index
function groupKarmasByCategory(
  karmas: KarmaBase[],
): Array<{ category: string; index: number; karmas: KarmaBase[] }> {
  const categoryMap: { [key: string]: KarmaBase[] } = {};

  karmas.forEach((karma) => {
    // Extract the category name or use 'Uncategorized' if null
    const categoryName = karma.category?.name || "Uncategorized";
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = [];
    }
    categoryMap[categoryName].push(karma);
  });

  return Object.keys(categoryMap).map((category, index) => ({
    category,
    index,
    karmas: categoryMap[category],
  }));
}

export const karmaStore = defineStore("karma", {
  state: () => ({
    categories: import.meta.env.MODE === "production" ? [] : groupKarmasByCategory(mockKarmasResponse)
  }),

  actions: {
    async fetchKarma() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/karmas/`

        const validatedResponse = await checkResponseSuccess(url, "get")

        if(validatedResponse) {
          this.categories = groupKarmasByCategory(validatedResponse.data);
        }
      } catch (error) {
        console.error("Ошибка при получении карточек кармы:", error);
        throw new Error("Server error when getting karma-cards");
      }
    },

    async donate(id: number, tx_hash: string, currency: string) {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/karmas/donate`
        const data = {
          karma_id: id,
          tx_hash: tx_hash,
          currency: currency
        }

        const validatedResponse = await checkResponseSuccess(url, "post", data)
      } catch (error) {
        console.error("Ошибка при получении карточек кармы:", error);
        throw new Error("Server error when getting karma-cards");
      }
    }
  },

  getters: {},
});
