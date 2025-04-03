import { defineStore } from "pinia";
import { settingsStore } from "@/store/settings";
import axios from "axios";

import { checkResponseSuccess } from "@/store/utils/apiUtils";
import router from "@/router";
import {questsStore} from "@/store/tasks.ts";
import {karmaStore} from "@/store/karma.ts";
import {cardsStore} from "@/store/cards.ts";
import {friendsStore} from "@/store/friends.ts";

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
    isOnboardingCompleted: import.meta.env.MODE !== "production" ? false : true,
    isOnboardingChecking: import.meta.env.MODE !== "production" ? true : true,
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
    isOnboardingCompleted() {
      if (this.telegramWebApp && this.telegramWebApp.initData) {
        (window as any).Telegram.WebApp.CloudStorage.getItem(
            "onboardingCompleted",
            async function (err: any, value: any) {
              if (err) {
                console.error("Ошибка получения данных из cloud storage:", err);
              } else {
                if (value === "true") {
                  await router.replace("/home");
                  return;
                }
                telegramStore().isOnboardingChecking = false;
              }
            },
        );
      }
    },

    setCompletedOnboarding() {
      if (this.telegramWebApp && this.telegramWebApp.initData) {
        const key = "onboardingCompleted";
        const value = "true";
        (window as any).Telegram.WebApp.CloudStorage.setItem(
            key,
            value,
            function (err: any, success: any) {
              if (err) {
                console.error(
                    "Ошибка при сохранении данных в cloud storage:",
                    err,
                );
              } else {
                console.log("Статус онбординга успешно сохранен:", success);
              }
            },
        );
      }
    },

    removeCompletedOnboarding() {
      if (this.telegramWebApp && this.telegramWebApp.initData) {
        const key = "onboardingCompleted";
        (window as any).Telegram.WebApp.CloudStorage.removeItem(
            key,
            function (err: any, success: any) {
              if (err) {
                console.error(
                    "Ошибка при сохранении данных в cloud storage:",
                    err,
                );
              } else {
                console.log("Статус онбординга успешно   сохранен:", success);
              }
            },
        );
      }
    },

    setMiniAppPreferences() {
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
    },

    setMiniAppSettings() {
      telegramStore().isOnboardingChecking = true;
      if (this.telegramWebApp && this.telegramWebApp.initData) {
        this.telegramWebApp.ready();

        this.isOnboardingCompleted();
        this.setMiniAppPreferences();

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

      return {
        username: user?.username || "No username",
        firstName: user?.first_name || "Unknown",
        lastName: user?.last_name || "Unknown",
        language: user?.language_code || "ru",
        avatar: user?.photo_url || "",
      };
    },

    setInitData() {
      this.initData = this.telegramWebApp.initData;
      questsStore().fetchTasks()
      karmaStore().fetchKarma()
      cardsStore().fetchCards()
      friendsStore().fetchFriends()
    },

    setMockInitData() {
      this.initData = mockInitData;
    },

    showAlert(msg: string) {
      this.telegramWebApp.showAlert(msg);
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
