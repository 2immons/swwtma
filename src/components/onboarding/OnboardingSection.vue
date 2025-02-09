<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import img1 from "../../assets/images/computer.png";
import img2 from "../../assets/images/batteries.png";
import img3 from "../../assets/images/mining.png";
import img4 from "../../assets/images/coins.png";
import coin1 from "../../assets/svg/coin-anim/coin1.svg";
import coin2 from "../../assets/svg/coin-anim/coin2.svg";
import coin3 from "../../assets/svg/coin-anim/coin3.svg";
import coin4 from "../../assets/svg/coin-anim/coin4.svg";
import coin5 from "../../assets/svg/coin-anim/coin5.svg";
import coin6 from "../../assets/svg/coin-anim/coin6.svg";

const coinFrames = ref([coin1, coin2, coin3, coin4, coin5, coin6]);
const currentCoinFrameIndex = ref(0);

const currentCoinFrame = computed(
  () => coinFrames.value[currentCoinFrameIndex.value],
);

const rotateCoin = () => {
  currentCoinFrameIndex.value =
    (currentCoinFrameIndex.value + 1) % coinFrames.value.length;
};

const telegramStoreInstance = telegramStore();

const frames = ref([img1, img2, img3, img4]);
const infoArray = ref([
  {
    title_ru: "Добро пожаловать в HashSeeker!",
    text_ru:
      "Майнинг еще никогда не был таким простым! Запустите облачный майнинг одним нажатием и начинайте зарабатывать уже сейчас",
    title_en: "Start Cloud Mining with Just One Click",
    text_en:
      "Begin the journey right now! Mining has never been this easy. One Click — You're Mining Tokens. Start mining for free and watch your earnings grow.",
  },
  {
    title_ru: "Начните бесплатно",
    text_ru:
      "Восстанавливайте энергию и продолжайте получать награду, просматривая рекламу",
    title_en: "Restore Energy by Watching Ads",
    text_en: "Increase your mining power by simply viewing ads.",
  },
  {
    title_ru: "Станьте премиум-майнером",
    text_ru:
      "Получайте больше наград! Автоматическое восстановление энергии, дополнительные аватарки, увеличение максимальной энергии!",
    title_en: "Become a Premium Miner",
    text_en:
      "Support the project and multiply your earnings by having additional energy, profile pictures, increasing the max energy supply.",
  },
  {
    title_ru: "Let's seek some cash!",
    text_ru: "",
    title_en: "Let's seek some cash!",
    text_en: "",
  },
]);

const currentIndex = ref(0);

let startX = 0;

const handleTouchStart = (event: TouchEvent) => {
  startX = event.touches[0].clientX;
};

const handleTouchEnd = (event: TouchEvent) => {
  const endX = event.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (deltaX > 50) {
    // Свайп вправо
    if (currentIndex.value > 0) {
      currentIndex.value -= 1;
    }
  } else if (deltaX < -50) {
    // Свайп влево
    if (currentIndex.value < frames.value.length - 1) {
      currentIndex.value += 1;
    }
  }
};

const setCurrentIndex = (index?: number) => {
  if (index) currentIndex.value = index;
  else if (currentIndex.value === frames.value.length - 1) skipOnboarding();
  else currentIndex.value++;
};

import { useRouter } from "vue-router";
import { telegramStore } from "@/store/telegram.ts";
import { useI18n } from "vue-i18n";
import {eventBus} from "@/event_bus/eventBus.ts";
import {profileStore} from "@/store/user-profile.ts";

const { t, locale } = useI18n();

const router = useRouter();

const skipOnboarding = () => {
  router.replace("/home");
  telegramStoreInstance.setCompletedOnboarding();
};

const buttonText = computed(() => {
  if (currentIndex.value === frames.value.length - 1) return t("continue");
  else return t("skip");
});

const footerClass = computed(() => {
  if (telegramStoreInstance.telegramWebApp.initData) {
    return "container container--footer--tg";
  } else {
    return "container container--footer";
  }
});

const fetchUserProfile = async () => {
  try {
    await profileStoreInstance.getUserProfile();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

onMounted(async () => {
  await fetchUserProfile();
  locale.value = profileStore().userProfile.settings.language
  setInterval(rotateCoin, 100);
});

const isOnboardingBlankVisible = computed(() => {
  if (telegramStoreInstance.isOnboardingChecking) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <div
    class="onboarding-wrapper no-scroll"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @click="setCurrentIndex()"
  >
    <div class="onboarding-blank" v-if="isOnboardingBlankVisible"></div>
    <section class="header-section">
      <div class="container container--header">
        <div class="header">
          <button
            @click="skipOnboarding"
            v-if="currentIndex !== frames.length - 1"
          >
            {{ buttonText }}
            <img src="../../assets/svg/arrow.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
    <section class="main-section no-scroll">
      <div class="slider-wrapper">
        <div
          class="img-slider"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <img v-for="(img, index) in frames" :key="index" :src="img" alt="" />
        </div>
      </div>
    </section>
    <section class="footer-section no-scroll">
      <div :class="footerClass">
        <div class="wrapper">
          <div class="slider-wrapper slider-wrapper--text">
            <div
              class="info-slider"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div v-for="(info, index) in infoArray" :key="index" class="info">
                <h3>
                  <img
                    v-if="index === frames.length - 1"
                    class="coin"
                    :src="currentCoinFrame"
                    alt=""
                  />
                  {{
                    telegramStoreInstance.userData.language === "ru"
                      ? info.title_ru
                      : info.title_en
                  }}
                </h3>
                <p>
                  {{
                    telegramStoreInstance.userData.language === "ru"
                      ? info.text_ru
                      : info.text_en
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="dots" v-if="currentIndex !== frames.length - 1">
            <div
              v-for="index in frames.length"
              :key="index - 1"
              :class="index - 1 === currentIndex ? 'active-dot' : 'dot'"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="sass">
@use "../../styles/variables" as vars
*
  color: white
.header-section
  position: fixed
  z-index: 20
  color: white
  font-size: 16px
  line-height: 16px
  font-weight: 400
  width: 100%

.container--footer, .container--header, .container--footer--tg
  justify-self: center

.img-slider, .info-slider
  display: flex
  transition: transform 0.3s ease-in-out
  width: 100%
  height: 100%

.btn-start
  margin-bottom: 15px

.img-slider img, .info-slider div
  flex: 0 0 100%

.img-slider img
  width: 100%
  aspect-ratio: 1
  object-fit: cover

.active-dot, .dot
  height: 6px
  width: 6px

.active-dot
  background: blue

.dot
  background: #A4A4A4

.onboarding-wrapper, .onboarding-wrapper--gray
  display: flex
  flex-direction: column
  height: 100vh
  background: #FEFEFE
  min-height: 100%
  overscroll-behavior-y: contain

.onboarding-blank
  position: absolute
  top: 0
  height: 100vh
  width: 100vw
  background: vars.$c-bg
  z-index: 10

section
  justify-content: inherit

.main-section
  flex: 1
  height: 60vh

.footer-section
  background: vars.$c-bg
  height: 40vh

.container
  gap: 22px
  height: 100%

.container--footer
  margin-bottom: 10px

.container--footer--tg
  margin-bottom: calc(10px + var(--tg-safe-area-inset-bottom))

.header
  width: 100%
  display: flex
  justify-content: end
  padding: 16px 0

  button
    display: flex
    align-items: center
    gap: 2px
    font-size: 16px
    line-height: 16px
    font-weight: 400
    position: relative
    margin-right: 30px

    img
      position: absolute
      height: 20px
      right: -22px
      top: -1px

.wrapper
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 100%
  align-items: center
  width: 100%

.slider-wrapper
  height: 100%
  width: 100%
  overflow: hidden

.slider-wrapper--text
  padding: 15% 0

.dots
  display: flex
  gap: 16px

.info
  display: flex
  flex-direction: column
  height: 100%
  align-items: center
  justify-content: center
  gap: 20px

  .coin
    width: 16px
    height: 16px
    opacity: 1
    transition: opacity 0.3s ease

  h3
    font-weight: 400
    font-size: 20px
    line-height: 20px
    text-align: center
    display: flex
    align-items: center
    gap: 8px
  p
    font-weight: 400
    font-size: 18px
    line-height: 18px
    text-align: center

.coin-hidden
  opacity: 0
</style>
