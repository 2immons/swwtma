<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { eventBus } from "@/event_bus/eventBus";
import { telegramStore } from "@/store/telegram";

enum PopupType {
  ERROR,
  INFO,
}

interface Popup {
  id: number;
  type: PopupType;
  message: string;
}

const popups = ref<Popup[]>([]);
let popupId = 0;

const showPopup = (msg: string, type: PopupType) => {
  const id = popupId++;
  popups.value.push({
    id,
    message: msg,
    type: type,
  });

  setTimeout(() => {
    popups.value = popups.value.filter((popup) => popup.id !== id);
  }, 3000);
};

onMounted(() => {
  eventBus.on("showErrorPopup", (msg: string) => {
    showPopup(msg, PopupType.ERROR);
  });
  eventBus.on("showInfoPopup", (msg: string) => {
    showPopup(msg, PopupType.INFO);
  });
});

const popupMarginClacc = ref("");
const isFullScreen = computed(
  () => telegramStore().telegramWebApp.isFullscreen,
);
watch(
  isFullScreen,
  (newValue) => {
    popupMarginClacc.value = newValue
      ? "popup-margin-calc"
      : "popup-margin-default";
  },
  { immediate: true },
);
</script>

<template>
  <div :class="popupMarginClacc">
    <transition-group name="popup" tag="div">
      <div v-for="popup in popups" :key="popup.id" class="popup-item">
        <div
          class="popup-item__content popup-item__content--error"
          v-if="popup.type === PopupType.ERROR"
        >
          <img src="../assets/svg/alert-icon.svg" alt="" />
          <p>{{ popup.message }}</p>
        </div>
        <div
          class="popup-item__content popup-item__content--info"
          v-else-if="popup.type === PopupType.INFO"
        >
          <img src="../assets/svg/v-icon--success.svg" alt="" />
          <p>{{ popup.message }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="sass">
.popup, .popup-margin-calc, .popup-margin-default
  position: fixed
  left: 50%
  transform: translateX(-50%)
  z-index: 20
  display: flex
  flex-direction: column

.popup-margin-calc
  top: calc(var(--tg-safe-area-inset-top) + var(--tg-content-safe-area-inset-top) + 50px)
.popup-margin-default
  top: 50px

.popup-item
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
  margin-top: 10px
  width: 300px

.popup-item__content
  border-radius: 5px
  padding: 10px 20px
  display: flex
  gap: 10px
  align-items: center
  justify-content: space-between

.popup-item__content--error
  background: red
  color: white

.popup-item__content--info
  background: white
  color: black

/* Анимация появления и исчезновения */
.popup-enter-active, .popup-leave-active
  transition: transform 0.5s, opacity 0.2s

.popup-enter-from
  transform: translateY(-100%)
  opacity: 0

.popup-enter-to
  transform: translateY(0)
  opacity: 1

.popup-leave-from
  transform: translateY(0)
  opacity: 1

.popup-leave-to
  transform: translateY(-100%)
  opacity: 0
</style>
