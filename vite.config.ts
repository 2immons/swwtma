import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ mode }) => ({
  plugins: [vue(), mode === "production" ? null : vueDevTools()],
  base:
    mode === "development"
      ? "https://sww.tonycrypto.site/"
      : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
      },
    },
  },
  server: {
    host: true,
    port: 5175,
  },
}));
