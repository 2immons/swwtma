<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-content">
        <div class="stats-wrapper">
          <div class="stats__item stats__item--balance">
            <p>Your Balance</p>
            <div class="amount">
              {{ balance }}
            </div>
          </div>
          <div class="stats__item stats__item--mining-speed">
            <p>Mining Speed</p>
            <div class="amount">+ {{ speed }}/h</div>
          </div>
        </div>
        <div class="mining-progress-wrapper">
          <div class="mining-progress-bar">
            <div
              class="progress"
              :style="{ width: progressWidth }"
              v-if="processStatus === 'active'"
            >
              <div class="interface">
                <button @click="claimProcessReward">Claim</button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>{{ hours }}h {{ minutes }}m</p>
                </div>
              </div>
            </div>
            <div class="progress" v-if="processStatus === 'closed'">
              <div class="interface">
                <button @click="claimProcessReward" :class="claimButtonClass">
                  Claim
                </button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>{{ hours }}h {{ minutes }}m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { profileStore } from "@/store/user-profile";
import { telegramMixin } from "@/mixins/telegramMixin";

const profileStoreInstance = profileStore();

const speed = computed(() => profileStoreInstance.getSpeed);
const balance = computed(() => profileStoreInstance.getBalance);
const processStatus = computed(() => profileStoreInstance.getStatus);

const claimButtonClass = computed(() => {
  return processStatus.value === "active"
    ? "claim-button--active"
    : "claim-button";
});

const remainingMinutes = computed(() => profileStoreInstance.getRemainingTime);

const progressWidth = computed(() => {
  return String((remainingMinutes.value / (60 * 4)) * 100) + "%";
});

const hours = ref(Math.floor(remainingMinutes.value / 60));
const minutes = ref(remainingMinutes.value % 60);

const claimProcessReward = () => {
  // await profileStoreInstance.claimProcessReward();
};

onMounted(async () => {
  const profileStoreInstance = profileStore();
  const queryForValidation = telegramMixin.methods.generateQueryForValidation();
  // await profileStoreInstance.getUserProfile(queryForValidation);
});
</script>

<style scoped lang="sass">
@import "src/styles/variables"
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
    background: $c-dark-element
    display: flex
    flex-direction: column
    justify-content: center
    align-items: start
    gap: 20px
    color: white
    padding: 22px 20px
    height: 100px
    backdrop-filter: blur(2.5px)
    border: 1px solid $c-border-color




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

.mining-progress-wrapper
  background: $c-dark-element
  border-radius: 20px
  border: 1px solid $c-border-color
  height: 71px
  display: flex
  align-items: center
  justify-content: center

.mining-progress-bar
  width: 91%
  height: 33px
  background: #0000002B
  border-radius: 50px
  position: relative
  overflow: hidden
  border: 1px solid $c-border-color
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
  background: #1517154D
  border-radius: 50px
  height: 25px
  border: 1px solid $c-border-color
  gap: 8px
  display: flex
  margin-left: 3px
  padding-right: 14px
  line-height: 13.66px
  text-align: center
  font-size: 10px

  .claim-button, .claim-button--active
    width: 75px
    background: $c-btn
    border-radius: 31.64px
    color: $c-main-text
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
      opacity: 80%
</style>
