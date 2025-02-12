<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  watch, computed,
} from "vue";
import { useI18n } from "vue-i18n";
import type {CardBase} from "@/types/types.ts";
import CardPopup from "@/components/mining/CardPopup.vue";
import {profileStore} from "@/store/user-profile.ts";
const { t, locale } = useI18n();

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
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
    closePopup();
  }
};


const profileStoreInstance = profileStore()
const fetchCheckInInfo = async () => {
  await profileStoreInstance.getCheckInInfo()
}

const checkInInfo = computed(() => profileStoreInstance.checkInInfo)
const lastCheckInDate = computed(() => profileStoreInstance.userProfile.last_check_in)

const canGetReward = computed(() => {
  if (!lastCheckInDate.value) {
    return true
  }
  console.log(lastCheckInDate.value); // Используйте lastCheckInDate.value для доступа к значению
  const now = Date.now();
  const rewardTime = new Date(lastCheckInDate.value).getTime();

  console.log(now)
  console.log(rewardTime)

  const rewardTimePlus24Hours = rewardTime + 24 * 60 * 60 * 1000;
  // Добавляем 24 часа к времени последнего чекина
  const remainingMilliseconds = Math.max(0, rewardTimePlus24Hours - now);
  // Проверяем, прошло ли 24 часа
  return remainingMilliseconds <= 0;
});


onMounted(async () => {
  if (props.modelValue) {
    document.body.classList.add("no-scroll");
  }
  await fetchCheckInInfo()
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

const userStreak = computed(() => profileStoreInstance.userProfile.streak)

const getReward = async () => {
  await profileStoreInstance.getCheckInReward()
}

// const imageUrl = computed(() => {
//       if (props.card.image)
//         return `${import.meta.env.VITE_BACKEND}/api/v1/files/${props.card.image.upload_storage}/${props.card.image.file_id}`
//     })
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
            <div class="photo">
              <!--      <img src="../../assets/images/card-test.png" alt="" />-->
              <img src="@/assets/images/calendar.png">
              <button @click="closePopup">+</button>
            </div>
            <div class="info">
              <h3>{{ t("check-in") }}</h3>
              <p>{{ t("check-in-text") }}</p>
            </div>
            <div class="calendar">
              <div v-for="day in checkInInfo" :class="day.streak > userStreak ? 'day' : 'day day--completed'">
                <p class="streak">
                  {{ t("day") }}{{ day.streak }}
                </p>
                <p class="reward">
                  {{ day.reward }}
                  <img src="@/assets/svg/stats/green-coin.svg" alt="">
                </p>
              </div>
            </div>
            <button class="buy-btn" v-if="canGetReward" @click="getReward">
              {{ t("get-reward") }}
            </button>
            <button class="buy-btn" v-else-if="!canGetReward">
              {{ t("comeback-later") }}
            </button>
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
  color: white !important
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
  width: 100%
  background: vars.$c-bg
  height: 80%
  max-height: 650px
  display: flex
  justify-content: center
  margin-top: 60px
  padding-bottom: 30px
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
  min-height: 100px
  overflow: hidden

  img
    height: 100px

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
    color: vars.$c-main-text

.calendar
  display: grid
  width: 100%
  grid-template-columns: repeat(4, 1fr)
  gap: 5px

  .day
    padding: 10px 5px
    aspect-ratio: 1
    width: 100%
    border: 1px solid gray
    background: linear-gradient(0deg, rgb(122, 176, 123) 0%, rgb(59, 155, 22) 68%)
    border-radius: 18px
    display: flex
    align-items: center
    justify-content: space-evenly
    flex-direction: column
    height: 100%

    .reward
      display: flex
      gap: 5px

  .day--completed
    background: linear-gradient(0deg, rgb(82, 93, 82) 0%, rgb(73, 91, 64) 68%)

    .reward, .streak
      opacity: 0.6
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

.info
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin-top: 20px
  margin-bottom: 20px

  h3
    text-align: left
    font-size: 20px

  p
    margin-top: 20px
    text-align: start
    font-size: 18px
    opacity: 50%
    line-height: 16px

hr
  margin: 20px 0
  width: 100%
  border: 1px solid vars.$c-border-color

.buy-btn
  margin-top: 20px
  width: 100%
  font-size: 16px
  font-weight: 700
  background: white
  padding: 22px
  border: 1px solid vars.$c-border-color
  border-radius: 100px
  display: flex
  align-items: center
  justify-content: center
  gap: 4px
  color: vars.$c-main-text

  img
    height: 14px
</style>
