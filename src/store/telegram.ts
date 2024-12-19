import { defineStore } from "pinia";
import { settingsStore } from "@/store/settings";

interface WebAppData {
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
  avatar: string,
}

export const telegramStore = defineStore("telegram", {
  state: () => ({
    telegramWebApp: (window as any).Telegram?.WebApp ?? null,
    webAppData: null as null | WebAppData,
    userData: {
      username: "No username",
      firstName: "Unknown",
      lastName: "Unknown",
      language: "en",
      avatar: ""
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

          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile) {
            this.telegramWebApp.requestFullscreen();
          }
        }

        this.userData = this.getUserData();
        this.webAppData = this.generateWebAppData();

        this.checkReferalCode()
      } else {
        console.error("Telegram WebApp недоступен. Методы инициализации Mini App пропущены.");
      }
    },

    // Получает от Телеграма данные пользователя (язык, имя и т.д.)
    getUserData() {
      const user = this.telegramWebApp.initDataUnsafe?.user;

      if (!user)
        throw new Error("Ошибка получения данных пользователя")

      return {
        username: user.username || "No username",
        firstName: user.first_name || "Unknown",
        lastName: user.last_name || "Unknown",
        language: user.language_code || "en",
        avatar: user.photo_url || ""
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
          throw new Error("Ошибка при проверке реферального кода.")
        }
      }
    },

    // Возвращает из Telegram.WebApp.initData данные для валидационного объекта
    generateWebAppData(): WebAppData {
      const queryString = this.telegramWebApp.initData;
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
    },

    showAlert(msg: string) {
      this.telegramWebApp.showAlert(msg)
    },

    sendReferalLink(preparedInlineMessageID: number) {
      this.telegramWebApp.shareMessage(preparedInlineMessageID)
    }
  },

  getters: {
    getWebAppData: (state) => {
      if (!state.webAppData) {
        throw new Error("WebAppData не установлена")
      }
      return state.webAppData
    }
  },
});
