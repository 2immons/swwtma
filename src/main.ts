import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { languages, defaultLocale } from "@/i18n";
import Tres from "@tresjs/core";
import PopupWindow from "@/components/PopupWindow.vue";
import {telegramStore} from "@/store/telegram";

const pinia = createPinia();

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);

// Миксин для локализации
app.mixin({
  methods: {
    t(key: string) {
      return i18n.global.t(key);
    },
  },
});

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(Tres);

telegramStore().setMiniAppSettings()

app.component("PopupWindow", PopupWindow);

app.mount("#app");
