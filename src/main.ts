import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { languages, defaultLocale } from "@/i18n";
import PopupWindow from "@/components/PopupWindow.vue";
import { telegramStore } from "@/store/telegram";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

const telegramStoreInstance = telegramStore();
telegramStoreInstance.getUserData()

const messages = Object.assign(languages);
const i18n = createI18n({
  locale: telegramStoreInstance.userData.language || defaultLocale,
  fallbackLocale: "en",
  messages,
});

telegramStoreInstance.setMiniAppSettings();
telegramStoreInstance.setMiniAppData();

app.use(i18n);

app.component("PopupWindow", PopupWindow);

app.mount("#app");
