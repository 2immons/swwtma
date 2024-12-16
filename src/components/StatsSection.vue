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
              + {{ speed }}/{{ t("h") }}
              <img src="../assets/svg/stats/green-coin.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="mining-progress-wrapper">
          <div class="mining-progress-bar">
            <div
              class="progress"
              :style="{ width: progressWidth }"
              v-if="processState === 'active'"
            >
              <div class="interface">
                <button @click="claimProcessReward">Claim</button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>{{ hours }} {{ t("h") }} {{ minutes }} {{ t("m") }}</p>
                </div>
              </div>
            </div>
            <div class="progress" v-if="processState === 'closed'">
              <div class="interface">
                <button @click="claimProcessReward" :class="claimButtonClass">
                  {{ t("claim") }}
                </button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>{{ hours }} {{ t("h") }} {{ minutes }} {{ t("m") }}</p>
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
import { eventBus } from "@/event_bus/eventBus";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const profileStoreInstance = profileStore();

const speed = computed(() => profileStoreInstance.getNewSpeed);
const balance = computed(() => profileStoreInstance.getBalance);
const processState = computed(() => profileStoreInstance.getProcessState);

const claimButtonClass = computed(() => {
  return processState.value === "active"
    ? "claim-button--active"
    : "claim-button";
});

const remainingSeconds = computed(
  () => profileStoreInstance.getRemainingSeconds
);
const totalProcessSeconds = computed(
  () => profileStoreInstance.getTotalProcessSeconds
);

const progressWidth = computed(() => {
  return (
    String((remainingSeconds.value / totalProcessSeconds.value) * 100) + "%"
  );
});

const hours = ref(Math.floor(remainingSeconds.value / 60));
const minutes = ref(remainingSeconds.value % 60);

const claimProcessReward = () => {
  profileStoreInstance.claimProcessReward();
};

const fetchUserProfile = async () => {
  try {
    await profileStoreInstance.getUserProfile();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

onMounted(async () => {
  await fetchUserProfile();
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

      @media (max-width: 400px)
        font-size: 19px

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
