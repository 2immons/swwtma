import { defineStore } from "pinia";
import axios from "axios";

import { useI18n } from "vue-i18n";

export const worldPopulationStore = defineStore("world-population", {
  state: () => ({
    worldPopulation: {},
  }),

  actions: {
    // getWorldPopulation получает данные о населении
    async getWorldPopulation() {
      try {
        const response = await axios.get(`${config.worldPopulationURL}`);

        // TODO: изменять стейт
        return response.data;
      } catch (error) {
        console.error("Ошибка при получении данных о населении:", error);
        throw new Error("Server error when getting the population statistics");
      }
    },
  },

  getters: {},
});
