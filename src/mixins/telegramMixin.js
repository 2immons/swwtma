import { ref } from "vue";

export const telegramMixin = {
  data() {
    return {
      username: ref("Loading..."),
      firstName: ref("Loading..."),
      lastName: ref("Loading..."),
      locale: ref("en"),
    };
  },
  methods: {
    // generateQueryForValidation создает и возвращает валидационные данные из данных Telegram для проверки авторизованности будущего запроса
    generateQueryForValidation() {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();

        const user = window.Telegram.WebApp.initDataUnsafe?.user;

        if (user) {
          const queryString = window.Telegram.WebApp.initData;
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
        }
      } else {
        console.error("Telegram WebApp API не доступен.");
        return null;
      }
    },
  },
};
