<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
} from "vue";
import { useI18n } from "vue-i18n";
import {friendsStore} from "@/store/friends";
import QrCode from "@/components/ui/QrCode.vue";
import {telegramStore} from "@/store/telegram";
import {eventBus} from "@/event_bus/eventBus";

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
  await navigator.clipboard.writeText(referalLink.value + "\n" + referalText.value)
  const telegramStoreInstance = telegramStore()
  telegramStoreInstance.showAlert("Ссылка: " + referalLink.value + " скопирована в буфер обмена!")
}

const size = ref(270)
const referalLink = ref("https://t.me/EcologyWorkers_bot/saveworldweb?startapp=ref_Tuq6WQIoEy");
const referalText = ref("Присоединяйтесь!")

const telegramShareUrl = computed(() => `https://t.me/share/url?url=${encodeURIComponent(referalLink.value)}&text=${encodeURIComponent(referalText.value)}`)

onMounted(async () => {
  await requestReferalData()
})

const requestReferalData = async () => {
  try {
    referalLink.value = await friendsStoreInstance.ensureReferalLink();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message)
  }
}
</script>

<template>
  <Transition>
    <div class="card-popup" v-if="modelValue" @click="closePopup">
      <div class="content" @click.stop>
        <div class="container">
          <div class="popup-header">
            <h2>Пригласить друга</h2>
          </div>
          <QrCode
            :size="size"
            :qrLink="referalLink"
          />
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
  </Transition>
</template>

<style scoped lang="sass">
@import "../../styles/variables"

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
  background: $c-bg
  margin-top: 60px
  padding-bottom: 8%
  display: flex
  width: 100%
  flex-direction: column
  align-items: center
  height: fit-content
  box-shadow: 0px -6px 54px 0px #FFFFFFB2
  border-top-right-radius: 40px
  border-top-left-radius: 40px
  z-index: 30

.photo
  position: relative
  margin-top: 16px
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  height: 280px
  overflow: hidden

.popup-header
  position: relative
  margin-top: 16px
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
    color: $c-light-text

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
    border: 1px solid $c-border-color
    border-radius: 100px
    align-items: center
    justify-content: center
    gap: 4px
    color: $c-main-text
</style>
