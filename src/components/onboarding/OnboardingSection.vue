<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import img1 from "../../assets/images/onboarding1.png";
import img2 from "../../assets/images/onboarding2.png";
import img3 from "../../assets/images/onboarding3.png";
import img4 from "../../assets/images/onboarding4.png";
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
    title_ru: "Welcome to Save World Web",
    text_ru: "Играй, меняй мир и зарабатывай на добрых делах Мы отправляемся навстречу экологичному будущему",
    title_en: "Welcome to Save World Web",
    text_en: "Play, change the world, and earn from good deeds. We are setting off on a journey toward an eco-friendly future",
  },
  {
    title_ru: "",
    text_ru:
      "Давай познакомимся с приложением, ниже представлена home page. На этой странице отслеживается скорость добычи, клейм и твой баланс, а также нажми на землю и узнай много нового.ac",
    title_en: "",
    text_en: "Let's check out the app! Below is the home page. Here, you can see how fast you're mining, your claims, and your balance. Plus, click on the land to find out more cool stuff.",
  },
  {
    title_ru: "",
    text_ru:
      "Участвуй в благотворительных сборах и получай за это вознаграждение. Выбирай область которую хочешь поддержать, и становись частью глобального движения.",
    title_en: "",
    text_en:
      "Participate in charity drives and earn rewards for doing so. Choose the area you want to support and become part of a global movement.",
  },
  {
    title_ru: "",
    text_ru: "Поздравляю, ты успел на этап добычи монеты, во вкладке майнинг ты можешь добывать green coin, который после листинга станет основной валютой в нашей экосистеме",
    title_en: "",
    text_en: "Congrats, you've made it to the coin mining stage! In the mining tab, you can mine Green Coin, which will become the main currency in our ecosystem after it's listed.",
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
import {worldPopulationStore} from "@/store/world-population.ts";

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
    return "main-section--tg";
  } else {
    return "main-section";
  }
});

const profileStoreInstance = profileStore();

const fetchUserProfile = async () => {
  try {
    await profileStoreInstance.getUserProfile();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};


const populationStoreInstance = worldPopulationStore();
onMounted(async () => {
  await fetchUserProfile();
  locale.value = profileStore().userProfile.settings.language
  await populationStoreInstance.getWorldPopulation()
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
    <!-- <div class="onboarding-blank" v-if="isOnboardingBlankVisible"></div> -->
    <section class="header-section">
      <div class="container container--header">
        <div class="header">
          <button
            @click="skipOnboarding"
            v-if="currentIndex !== frames.length - 1"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </section>
    <section class="footer-section no-scroll">
      <div class="container">
        <div class="wrapper">
          <div class="slider-wrapper slider-wrapper--text">
            <div
              class="info-slider"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div v-for="(info, index) in infoArray" :key="index" class="info">
                <p class="info-text">
                  <h3 v-if="info.title_ru || info.title_en">
                    {{
                      telegramStoreInstance.userData.language === "ru"
                        ? info.title_ru
                        : info.title_en
                    }}
                  </h3>
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
    <section class="main-section no-scroll">
      <div :class="footerClass">
      <div class="slider-wrapper">
        <div
          class="img-slider"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <img v-for="(img, index) in frames" :key="index" :src="img" alt="" />
        </div>
      </div>
    </div>
    </section>
  </div>
</template>

<style scoped lang="sass">
@use "../../styles/variables" as vars

.info-text
  padding: 30px 20px
  border-radius: 20px
  border: 1px solid vars.$c-border-color
  background: rgb(255 255 255 / 13%)
  text-align: start !important

  display: flex
  flex-direction: column
  gap: 25px

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
  object-fit: contain

.active-dot, .dot
  height: 6px
  width: 6px

.active-dot
  background: vars.$c-btn-confirm

.dot
  background: #A4A4A4

.onboarding-wrapper, .onboarding-wrapper--gray
  display: flex
  gap: 30px
  flex-direction: column
  height: 100vh
  background: #000000
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

.footer-section
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  background: #000000
  margin-top: 30px

.container
  gap: 22px
  height: 100%

.main-section
  margin-bottom: 10px !important
  width: 100%

.main-section--tg
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
