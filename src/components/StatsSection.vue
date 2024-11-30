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
            <div class="progress">
              <div class="interface">
                <button>Claim</button>
                <div class="time">
                  <img src="../assets/svg/stats/time.svg" alt="" />
                  <p>{{ remainingTime[0] }}h {{ remainingTime[1] }}m</p>
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
import { computed } from "vue";
import { profileStore } from "@/store/user-profile";

const profileStoreInstance = profileStore();

const speed = computed(() => profileStoreInstance.getSpeed);
const balance = computed(() => profileStoreInstance.getBalance);
const remainingTime = computed(() => profileStoreInstance.getRemainingTime);
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
  width: 80%
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(90deg, rgba(78, 78, 78, 0.3) 0%, rgba(78, 78, 78, 0) 100%)
  height: 100%
  display: flex
  justify-content: start
  align-items: center

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

  button
    width: 75px
    background: $c-btn
    border-radius: 31.64px
    color: $c-main-text
    font-weight: 700
    font-size: 10px

  .time
    display: flex
    align-items: center
    gap: 5px
    font-weight: 600

    p
      opacity: 80%
</style>
