import { defineStore } from "pinia";
import axios from "axios";

import { useI18n } from "vue-i18n";
import {checkResponseSuccess, requestConfig} from "@/store/utils/apiUtils.ts";
import type {Population} from "@/types/types.ts";

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
    worldPopulation: mockPopulationData as Population
  }),

  actions: {

    // getWorldPopulation получает данные о населении
    async getWorldPopulation() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/population/`
        const response = await axios.get(url, requestConfig);

        const validatedResponse = await checkResponseSuccess(response, url, "get")

        if(validatedResponse) {
          this.worldPopulation = validatedResponse.data;
        }
      } catch (error) {
        console.error("Ошибка при получении данных о населении:", error);
        throw new Error("Server error when getting the population statistics");
      }
    },
  },

  getters: {},
});
