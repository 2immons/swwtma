import { defineStore } from "pinia";
import axios from "axios";
import { config } from "./config";
import { useI18n } from "vue-i18n";

export const worldPopulationStore = defineStore("world-population", {
  state: () => ({}),

  actions: {
    // getWorldPopulation получает данные о населении
    async getWorldPopulation() {
      try {
        const response = await axios.get(`${config.worldPopulationURL}`);

        if (response.status !== 200) {
          throw new Error(
            "Не удалось получить данные о населении " + response.status
          );
        }

        return response.data;
      } catch (error) {
        console.error("Ошибка при запросе профиля пользователя:", error);
        throw error;
      }
    },
  },

  getters: {},
});
