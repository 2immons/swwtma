import { telegramStore } from "@/store/telegram";
import gameanalytics from "gameanalytics";
import EGAAdAction from "gameanalytics";
import EGAAdType from "gameanalytics";

export const Analytics = {
  init() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.configureBuild("telegram 1.0.0");
      gameanalytics.GameAnalytics.setEnabledInfoLog(true);

      gameanalytics.GameAnalytics.initialize(
        "b884fce067d665d8a9ac8e97c0d01f7d",
        "51c304c2a3c797c91cc9bfebd0490966ba4b1b0e",
        // import.meta.env.VITE_GAME_KEY,
        // import.meta.env.VITE_GAME_SECRET
      );
    }
  },

  // Отслеживание покупок
  trackPurchase(
    itemId: string,
    itemType: string,
    amount: number,
    cartType: string,
  ) {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addBusinessEvent(
        "USD",
        amount * 100,
        itemType,
        itemId,
        cartType,
        {
          tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
        },
      );
    }
  },

  // 1. Регистрация пользователя
  trackRegistration() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addDesignEvent("User:Registration", 1);
    }
  },

  // 2. Заход в приложение
  trackAppOpen() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addDesignEvent("App:Open", 1, {
        tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
      });
    }
  },

  // 3. Начало майнинга
  trackMiningStart() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addDesignEvent("Mining:Start", 1, {
        tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
      });
    }
  },

  // 4. Выполнение задания
  trackTaskComplete(taskId: number) {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addDesignEvent("Task:Complete", taskId, {
        tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
      });
    }
  },

  // 5. Реклама
  trackAdAdsgram() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addAdEvent(
        EGAAdAction.RewardReceived,
        EGAAdType.RewardedVideo,
        "Adsgram",
        String(import.meta.env.VITE_ADSGRAM_PROGRESS),
        {
          tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
        },
      );
    }
  },

  trackAdAdsonar() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addAdEvent(
        EGAAdAction.RewardReceived,
        EGAAdType.RewardedVideo,
        "Adsonar",
        String(import.meta.env.VITE_ADSONAR_PROGRESS),
        {
          tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
        },
      );
    }
  },

  trackAdRestoreAdsgram() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addAdEvent(
        EGAAdAction.RewardReceived,
        EGAAdType.RewardedVideo,
        "Adsgram Restore",
        String(import.meta.env.VITE_ADSGRAM_RESTORE),
        {
          tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
        },
      );
    }
  },

  trackAdRestoreAdsonar() {
    if (import.meta.env.MODE === "production") {
      gameanalytics.GameAnalytics.addAdEvent(
        EGAAdAction.RewardReceived,
        EGAAdType.RewardedVideo,
        "Adsonar Restore",
        String(import.meta.env.VITE_ADSONAR_RESTORE),
        {
          tg_user_id: telegramStore().webAppData?.web_app_data.user_id,
        },
      );
    }
  },
};
