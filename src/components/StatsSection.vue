<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { profileStore } from "@/store/user-profile";
import { eventBus } from "@/event_bus/eventBus";
import { useI18n } from "vue-i18n";
import {telegramStore} from "@/store/telegram.ts";
const { t, locale } = useI18n();

const profileStoreInstance = profileStore();

const balance = computed(() => profileStoreInstance.getBalance);
const power = computed(() => profileStoreInstance.getPower);
const miningInfo = computed(() => {
  if (profileStore().userProfile.minings.length <= 0) {
    return undefined
  } else {
    return profileStoreInstance.getMiningInfo
  }
});

const isMiningExist = computed(() => {
  if (miningInfo.value) {
    return true
  } else {
    return false
  }
})

const isClaimingPossible = computed(() => {
  if (miningInfo.value) {
    if (miningInfo.value?.status === 'completed') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
})

const isMiningPending = computed(() => {
  if (miningInfo.value) {
    if (miningInfo.value?.status === 'pending') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
})

const claimButtonClass = computed(() => {
  if (isMiningExist) {
    if (isClaimingPossible) {
      return "claim-button--active"
    } else {
      return "claim-button"
    }
  } else {
    return "claim-button--active"
  }
});

const progressWidth = computed(() => {
  if (miningInfo.value) {
    return String(miningInfo.value.remainingPercentage) + "%"
  } else {
    return "0%"
  }
});

const claimReward = async () => {
  await profileStoreInstance.claimMining();
};

const startMining = async () => {
  await profileStoreInstance.startMining();
}

const fetchUserProfile = async () => {
  try {
    await profileStoreInstance.getUserProfile();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

const miningHours = ref(import.meta.env.VITE_MINING_HOURS)

onMounted(async () => {
  await fetchUserProfile();
  locale.value = profileStoreInstance.userProfile.settings.language
});

const isProd = import.meta.env.MODE === "production";
</script>

<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-content">
        <div class="stats-wrapper">
          <div class="stats__item stats__item--balance">
            <p>{{ t("your-balance") }}</p>
            <div class="amount">
              {{ balance }}
              <img src="../assets/svg/stats/green-coin.svg" alt="" />
            </div>
          </div>
          <div class="stats__item stats__item--mining-speed">
            <p>{{ t("mining-speed") }}</p>
            <div class="amount">
              + {{ power }}/{{ t("h") }}
              <img src="../assets/svg/stats/green-coin.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="mining-progress-wrapper">
          <div class="mining-progress-bar">
            <div
                class="progress"
                :style="{ width: progressWidth }"
                v-if="!isClaimingPossible && !isMiningExist && !isMiningPending"
            >
              <div class="interface">
                <button :class="claimButtonClass" @click="startMining">
                  {{ t("start") }}
                </button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>
                    {{ miningHours }} {{ t("h") }}
                    0 {{ t("m") }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="progress"
              :style="{ width: progressWidth }"
              v-else-if="isClaimingPossible && !isMiningPending && isMiningExist"
            >
              <div class="interface">
                <button :class="claimButtonClass" @click="claimReward">
                  {{ t("claim") }}
                </button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>
                    0 {{ t("h") }}
                    0 {{ t("m") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="progress"
                 v-else-if="isMiningPending && isMiningExist && !isClaimingPossible">
              <div class="interface">
                <button @click="claimReward" :class="claimButtonClass">
                  {{ t("claim") }}
                </button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p v-if="miningInfo">
                    {{ miningInfo.remainingHours }} {{ t("h") }}
                    {{ miningInfo.remainingMinutes }} {{ t("m") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.stats-section
  z-index: 200
  display: flex
  justify-content: center
  align-items: center
  margin-top: 41px
  height: 181px
.stats-content
  display: flex
  flex-direction: column
  height: 100%
  width: 100%
  gap: 10px

.stats-wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 10px

  .stats__item
    border-radius: 20px
    background: vars.$c-dark-element
    display: flex
    flex-direction: column
    justify-content: center
    align-items: start
    gap: 20px
    color: vars.$c-light-text
    padding: 22px 20px
    height: 100px
    backdrop-filter: blur(2.5px)
    border: 1px solid vars.$c-border-color

    p
      line-height: 16.4px
      font-size: 12px
      font-weight: 600
      opacity: 50%

    .amount
      display: flex
      align-items: center
      justify-content: start
      gap: 7px
      font-size: 27px
      font-weight: 600
      line-height: 36px

      @media (max-width: 390px)
        font-size: 19px

      @media (max-width: 325px)
        font-size: 17px

.mining-progress-wrapper
  background: vars.$c-dark-element
  border-radius: 20px
  border: 1px solid vars.$c-border-color
  height: 71px
  display: flex
  align-items: center
  justify-content: center
  padding: 18px

.mining-progress-bar
  width: 100%
  height: 33px
  background: #0000002B
  border-radius: 50px
  position: relative
  overflow: hidden
  border: 1px solid vars.$c-border-color
.progress
  position: absolute
  left: 0
  border-radius: 50px
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(90deg, rgba(78, 78, 78, 0.3) 0%, rgba(78, 78, 78, 0) 100%)
  height: 100%
  display: flex
  justify-content: start
  align-items: center
  width: 100%

.interface
  background: #767776
  border-radius: 50px
  height: 25px
  border: 1px solid vars.$c-border-color
  gap: 8px
  display: flex
  margin-left: 3px
  padding-right: 14px
  line-height: 13.66px
  text-align: center
  font-size: 10px

  .claim-button, .claim-button--active
    width: 75px
    background: vars.$c-btn
    border-radius: 31.64px
    color: vars.$c-main-text
    font-weight: 700
    font-size: 10px

  .claim-button--active
    background: rgba(220, 220, 220, 0.7)

  .time
    display: flex
    align-items: center
    gap: 5px
    font-weight: 600

    p
      white-space: nowrap
</style>
