import { defineStore } from "pinia";

interface ValidationQuery {
  web_app_data: {
    data_check_string: string | null;
    auth_date: string | null;
    hash: string | null;
  };
}

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  language: string;
}

export const telegramStore = defineStore("telegram", {
  state: () => ({
    validationQuery: null as null | ValidationQuery,
    userData: null as null | UserData,
  }),

  actions: {
    ensureUserData(): UserData {
      if (!this.userData) {
        this.userData = this.generateUserData();
      }
      return this.userData;
    },

    generateUserData() {
      const telegram = (window as any).Telegram;
      if (typeof window !== "undefined" && telegram && telegram.WebApp) {
        telegram.WebApp.ready();

        const user = telegram.WebApp.initDataUnsafe?.user;

        if (user) {
          return {
            username: user.username || "No username",
            firstName: user.first_name || "Unknown",
            lastName: user.last_name || "Unknown",
            language: user.language_code || "en",
          };
        } else {
          console.error("User в Telegram WebAppData не доступен.");
          return {
            username: "No username",
            firstName: "Unknown",
            lastName: "Unknown",
            language: "en",
          };
        }
      } else {
        console.error("Telegram WebApp API не доступен.");
        return {
          username: "No username",
          firstName: "Unknown",
          lastName: "Unknown",
          language: "en",
        };
      }
    },

    ensureValidationQuery(): ValidationQuery {
      if (!this.validationQuery) {
        this.validationQuery = this.generateValidationQuery();
      }
      return this.validationQuery;
    },

    generateValidationQuery(): ValidationQuery {
      const telegram = (window as any).Telegram;
      if (typeof window !== "undefined" && telegram && telegram.WebApp) {
        telegram.WebApp.ready();

        const user = telegram.WebApp.initDataUnsafe?.user;

        if (user) {
          const queryString = telegram.WebApp.initData;
          const params = new URLSearchParams(queryString);

          const authDate = params.get("auth_date");
          const hash = params.get("hash");

          params.delete("hash");

          const dataCheckString = Array.from(params.entries())
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([key, value]) => `${key}=${value}`)
            .join("\n");

          return {
            web_app_data: {
              data_check_string: dataCheckString,
              auth_date: authDate,
              hash: hash,
            },
          };
        } else {
          console.error("User в Telegram WebAppData не доступен.");
          return {
            web_app_data: {
              data_check_string: null,
              auth_date: null,
              hash: null,
            },
          };
        }
      } else {
        console.error("Telegram WebApp API не доступен.");
        return {
          web_app_data: {
            data_check_string: null,
            auth_date: null,
            hash: null,
          },
        };
      }
    },
  },

  getters: {},
});
