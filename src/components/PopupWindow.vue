<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { eventBus } from "@/event_bus/eventBus";

const isVisible = ref(false);
const message = ref("");

// Функция для отображения попапа
// TODO: сделать чтобы был контейнер, куда могли поместиться несколько ошибок
const showPopup = (errorMessage: string) => {
  message.value = errorMessage;
  isVisible.value = true;

  // Скрыть попап через 3 секунды
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
};

onMounted(() => {
  eventBus.on("showErrorPopup", (msg: string) => {
    showPopup(msg);
  });
});
</script>

<template>
  <div v-if="isVisible" class="popup">
    <p>{{ message }}</p>
  </div>
</template>

<style lang="sass">
.popup
  position: fixed
  top: calc(var(--tg-safe-area-inset-top) + var(--tg-content-safe-area-inset-top))
  left: 50%
  transform: translateX(-50%)
  background: red
  color: white
  padding: 10px 20px
  border-radius: 5px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
  z-index: 20
</style>
