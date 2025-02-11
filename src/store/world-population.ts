import { defineStore } from "pinia";
import axios from "axios";

import { useI18n } from "vue-i18n";
import {checkResponseSuccess, requestConfig} from "@/store/utils/apiUtils.ts";

export const worldPopulationStore = defineStore("world-population", {
  state: () => ({
    worldPopulation: {

    },
  }),

  actions: {

    // getWorldPopulation получает данные о населении
    async getWorldPopulation() {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/api/v1/karmas/donate`
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
