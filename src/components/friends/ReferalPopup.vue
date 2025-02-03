<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { friendsStore } from "@/store/friends";
import QrCode from "@/components/ui/QrCode.vue";
import { telegramStore } from "@/store/telegram";
import { eventBus } from "@/event_bus/eventBus";

const { t, locale } = useI18n();

const friendsStoreInstance = friendsStore();

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};

const copy = async () => {
  await navigator.clipboard.writeText(
    referalLink.value + "\n" + referalText.value,
  );
  eventBus.emit("showInfoPopup", t("link-copied"));
  closePopup();
};

const size = ref(270);
const referalLink = ref(
  "https://t.me/EcologyWorkers_bot/saveworldweb?startapp=ref_Tuq6WQIoEy",
);
const referalText = ref("Присоединяйтесь!");

const telegramShareUrl = computed(
  () =>
    `https://t.me/share/url?url=${encodeURIComponent(
      referalLink.value,
    )}&text=${encodeURIComponent(referalText.value)}`,
);

onMounted(async () => {
  if (props.modelValue) {
    document.body.classList.add("no-scroll");
  }
  await requestReferalData();
});

onBeforeUnmount(() => {
  document.body.classList.remove("no-scroll");
});

// Слушайте изменения `modelValue` и обновляйте класс
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  },
);

const requestReferalData = async () => {
  try {
    referalLink.value = await friendsStoreInstance.ensureReferalLink();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

const touchStartY = ref(0);
const touchEndY = ref(0);
const swipeThreshold = 50;
const onTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0].clientY;
};

const onTouchMove = (event: TouchEvent) => {
  touchEndY.value = event.touches[0].clientY;
};

const onTouchEnd = () => {
  if (touchEndY.value - touchStartY.value > swipeThreshold) {
    closePopup(); // Закрыть компонент при свайпе вниз
  }
};
</script>

<template>
  <Transition>
    <div
      class="card-popup"
      v-if="modelValue"
      @click="closePopup"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="content" @click.stop>
        <div class="container">
          <div class="wrapper no-scrollbar">
            <div class="popup-header">
              <h2>Пригласить друга</h2>
            </div>
            <div class="photo">
              <QrCode :size="size" :qrLink="referalLink" />
            </div>
            <div class="buttons">
              <a :href="telegramShareUrl" target="_blank" class="share-button">
                Поделиться
              </a>
              <button @click="copy">Скопировать ссылку</button>
              <button @click="closePopup">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.v-enter-active,
.v-leave-active
  transition: transform 0.3s ease

.v-enter-from,
.v-leave-to
  transform: translateY(100%)

.card-popup
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  left: 0
  z-index: 200
  height: 100vh
  position: fixed
  top: 0

.content
  position: fixed
  bottom: 0
  background: vars.$c-bg
  height: 80%
  max-height: 650px
  margin-top: 60px
  padding-bottom: 30px
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  box-shadow: 0px -6px 54px 0px #FFFFFFB2
  border-top-right-radius: 40px
  border-top-left-radius: 40px
  z-index: 30

.wrapper
  display: flex
  overflow: scroll
  flex-direction: column
  width: 100%
  height: 100%
  align-items: center
  margin-top: 16px
  border-top-right-radius: 30px
  border-top-left-radius: 30px

.container
  height: 100%

.photo
  position: relative
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  min-height: 280px
  overflow: hidden

.popup-header
  position: relative
  margin-top: 16px
  min-height: fit-content
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  overflow: hidden
  margin-bottom: 20px

  button
    position: absolute
    right: 10px
    top: -25px
    rotate: 45deg
    font-weight: 200
    font-size: 60px
    line-height: 84px
    background: transparent
    color: vars.$c-light-text

.buttons
  display: flex
  flex-direction: column
  width: 100%
  margin-top: 30px
  gap: 15px

  button, a
    width: 100%
    font-size: 16px
    font-weight: 700
    background: white
    padding: 15px 0
    border: 1px solid vars.$c-border-color
    border-radius: 100px
    align-items: center
    justify-content: center
    gap: 4px
    color: vars.$c-main-text
</style>
