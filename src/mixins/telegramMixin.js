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
          const queryDataObj = Object.fromEntries(
            new URLSearchParams(queryString)
          );

          const receivedHash = queryDataObj.hash;
          const authDate = queryDataObj.auth_date;

          delete queryDataObj.hash;
          delete queryDataObj.user;

          const flattenedQueryDataObj = {
            ...queryDataObj,
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name || "",
            username: user.username || "",
            language_code: user.language_code,
            is_premium: user.is_premium,
            allows_write_to_pm: user.allows_write_to_pm,
          };

          const sortedKeys = Object.keys(flattenedQueryDataObj).sort();
          const dataCheckString = sortedKeys
            .map((key) => `${key}=${flattenedQueryDataObj[key]}`)
            .join("\n");

          return {
            web_app_data: {
              data_check_string: dataCheckString,
              hash: receivedHash,
              auth_date: authDate,
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
