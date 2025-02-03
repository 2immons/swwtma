import { defineStore } from "pinia";
import { settingsStore } from "@/store/settings";
import axios from "axios";

import { checkResponseSuccess } from "@/store/utils/apiUtils";

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  language: string;
  avatar: string;
}

const mockInitData =
  "query_id=AAELmUAuAAAAAAuZQC7lzaSb user=%7B%22id%22%3A775985419%2C%22first_name%22%3A%22%D0%9F%D0%B0%D0%B2%D0%B5%D0%BB%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22simmons34%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F0gYkc5PaYG3VubCPhiYdBwbyGmIOyRU1S333mpporE4.svg%22%7D&auth_date=1738574312&signature=zBcFAgoCzpmSD0o0usAipu8xeBNcyPzgzIzuOttJ1b7RSdIY1Wj9yOnT5P8hSRNRBPHPqHhhfLBxnilF5bcSAg&hash=534b327d6bdb3bc359bab7e18eb04a3bfefe60a06a5bbcc29672f6e15f298fa1";

export const telegramStore = defineStore("telegram", {
  state: () => ({
    telegramWebApp: (window as any).Telegram?.WebApp ?? null,
    initData: "",
    userData: {
      username: "No username",
      firstName: "Unknown",
      lastName: "Unknown",
      language: "en",
      avatar: "",
    } as UserData,
    referalCode: null as null | string,
  }),

  actions: {
    setMiniAppSettings() {
      if (this.telegramWebApp && this.telegramWebApp.initData) {
        this.telegramWebApp.ready();

        // Стилизация и настройка Mini App
        this.telegramWebApp.expand();
        if (this.telegramWebApp.version >= 8) {
          this.telegramWebApp.lockOrientation();
          this.telegramWebApp.disableVerticalSwipes();

          const isMobile = /iPhone|iPad|iPod|Android/i.test(
            navigator.userAgent,
          );
          if (isMobile) {
            this.telegramWebApp.requestFullscreen();
          }
        }

        this.userData = this.getUserData();
      } else {
        console.error(
          "Telegram WebApp недоступен. Методы настройки Mini App пропущены.",
        );
      }
    },

    async setMiniAppData() {
      if (
        import.meta.env.MODE === "production" ||
        import.meta.env.MODE === "development"
      ) {
        this.setInitData();
        await this.auth();
        return;
      }

      this.setMockInitData();
      this.checkReferalCode();
    },

    async auth() {
      try {
        const initData = telegramStore().getInitData;

        await axios.post(
          `${import.meta.env.VITE_BACKEND}/api/v1/auth`,
          initData,
          { withCredentials: true },
        );
      } catch (error) {
        console.error("Ошибка авторизации:", error);
      }
    },

    async refreshAuthToken() {
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/auth/refresh`,
        {},
        { withCredentials: true },
      );
    },

    // Получает от Телеграма данные пользователя (язык, имя и т.д.)
    getUserData() {
      const user = this.telegramWebApp.initDataUnsafe?.user;

      if (!user) throw new Error("Ошибка получения данных пользователя");

      return {
        username: user.username || "No username",
        firstName: user.first_name || "Unknown",
        lastName: user.last_name || "Unknown",
        language: user.language_code || "en",
        avatar: user.photo_url || "",
      };
    },

    // Проверяет наличие валидного реферального кода в startParam и вызывает запрос о привязке на сервер
    checkReferalCode() {
      const startParam = this.telegramWebApp.initDataUnsafe.start_param;
      if (this.referalCode === null && startParam) {
        try {
          const match = startParam?.match(/ref_([a-zA-Z0-9]+)/);

          if (match && match[1]) {
            this.referalCode = match[1];

            if (this.referalCode)
              settingsStore().becomeReferal(this.referalCode);
          }
        } catch (error) {
          throw new Error("Ошибка при проверке реферального кода.");
        }
      }
    },

    setInitData() {
      this.initData = this.telegramWebApp.initData;
    },

    setMockInitData() {
      this.initData = mockInitData;
    },

    showAlert(msg: string) {
      this.telegramWebApp.showAlert(msg);
    },

    sendReferalLink(preparedInlineMessageID: number) {
      this.telegramWebApp.shareMessage(preparedInlineMessageID);
    },
  },

  getters: {
    getInitData: (state) => {
      if (!state.initData) {
        throw new Error("InitData не установлена");
      }
      return state.initData;
    },
  },
});
