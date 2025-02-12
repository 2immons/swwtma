import { defineStore } from "pinia";
import axios from "axios";

import { useI18n } from "vue-i18n";
import { checkResponseSuccess, requestConfig } from "@/store/utils/apiUtils.ts";
import type { Population } from "@/types/types.ts";

const mockPopulationData = {
  population: 0,
  births_year: 0,
  births_today: 0,
  deaths_year: 0,
  deaths_today: 0,
  net_population_growth_year: 0,
  net_population_growth_today: 0
}

export const worldPopulationStore = defineStore("world-population", {
  state: () => ({
    worldPopulation: mockPopulationData as Population,
    updateInterval: null as number | null, // Интервал обновления
  }),

  actions: {
    async getWorldPopulation() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/population/`;
        const response = await axios.get(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "get");

        if (validatedResponse) {
          // Сбрасываем значения
          this.worldPopulation = validatedResponse.data;

          // Запускаем обновление счетчика
          this.startPopulationCounter();
        }
      } catch (error) {
        console.error("Ошибка при получении данных о населении:", error);
        throw new Error("Server error when getting the population statistics");
      }
    },

    startPopulationCounter() {
      // Очищаем старый интервал, если есть
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }

      this.updateInterval = setInterval(() => {
        this.worldPopulation.population += Math.floor(Math.random() * 3) + 1; // +1..3
        this.worldPopulation.births_today += Math.floor(Math.random() * 2) + 1; // +1..2
        this.worldPopulation.deaths_today += Math.floor(Math.random() * 2); // +0..1
        this.worldPopulation.net_population_growth_today =
            this.worldPopulation.births_today - this.worldPopulation.deaths_today;
      }, 1000); // Обновление каждую секунду
    },

    stopPopulationCounter() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    }
  },

  getters: {},
});
