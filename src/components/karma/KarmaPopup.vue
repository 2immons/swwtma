<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
} from "vue";
import { cardsStore } from "@/store/cards";
import PageHeader from "@/components/PageHeader.vue";
import { karmaStore } from "@/store/karma";
const karmaStoreInstance = karmaStore();

const props = defineProps<{
  karmaCard: {
    title: string;
    price: number;
    boost: number;
    goal: number;
    raised: number;
    userDonat: number;
    isPurchased: boolean;
    status: string; // "ACTIVE", "CLOSED"
  };
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};

const progressWidth = computed(() => {
  return String((props.karmaCard.raised / props.karmaCard.goal) * 100) + "%";
});
</script>

<template>
  <Transition>
    <div class="card-popup" v-if="modelValue" @click="closePopup">
      <div class="content" @click.stop>
        <div class="container">
          <div class="photo">
            <img src="../../assets/images/card-popup.png" alt="" />
            <button @click="closePopup">+</button>
          </div>
          <div class="info">
            <h3>{{ karmaCard.title }}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sed eros viverra aliquam
              commodo sit sed. Tempor cras adipiscing ut et. Quam porttitor et
              amet consequat molestie. Fames in non vitae in
            </p>
          </div>
          <hr />
          <div class="stats">
            <p>
              Прибыль: + {{ karmaCard.boost }}
              <img src="../../assets/svg/stats/green-coin.svg" alt="" />
              / h
            </p>
          </div>
          <div class="donation-goal">
            <p>
              Donation Goal {{ karmaCard.goal }}
              <img src="../../assets/svg/stats/green-coin.svg" alt="" />
              (осталось {{ karmaCard.goal - karmaCard.raised }}
              <img src="../../assets/svg/stats/green-coin.svg" alt="" />)
            </p>
            <div class="donation-bar">
              <div class="progress" :style="{ width: progressWidth }"></div>
            </div>
            <p v-if="karmaCard.isPurchased">
              Вы вложили: {{ karmaCard.userDonat }}
              <img src="../../assets/svg/stats/green-coin.svg" alt="" />
            </p>
            <p v-else-if="!karmaCard.isPurchased">
              Вы еще ничего не вкладывали
            </p>
          </div>
          <button
            class="buy-btn"
            v-if="!karmaCard.isPurchased && karmaCard.status === 'ACTIVE'"
          >
            Вложить от {{ karmaCard.price }}
            <img src="../../assets/svg/stats/green-coin--black.svg" alt="" />
          </button>
          <button
            class="buy-btn"
            v-else-if="karmaCard.isPurchased && karmaCard.status === 'ACTIVE'"
          >
            Вложить еще
            <img src="../../assets/svg/stats/green-coin--black.svg" alt="" />
          </button>
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

  button
    position: absolute
    right: 10px
    top: -12px
    rotate: 45deg
    font-weight: 200
    font-size: 60px
    line-height: 84px
    background: transparent
    color: $c-main-text

.info
  margin-top: 26px

  h3
    text-align: left
    font-size: 20px

  p
    margin-top: 20px
    text-align: start
    font-size: 10px
    opacity: 50%
    line-height: 16px

hr
  margin: 20px 0
  width: 100%
  border: 1px solid $c-border-color

.stats
  display: flex
  flex-direction: column
  justify-content: start
  align-items: start
  width: 100%
  gap: 12px

  p
    display: flex
    gap: 3px
    align-items: center
    font-size: 14px
    opacity: 70%
    img
      height: 12px


.donation-goal
  display: flex
  flex-direction: column
  width: 100%
  align-items: start
  gap: 8px
  margin: 12px 0
  height: 38px

  p
    text-align: start
    display: flex
    justify-content: center
    align-items: center
    gap: 3px
    opacity: 70%
    font-size: 11px

    img
      height: 7px

  .donation-bar
    display: flex
    align-items: center
    height: 4px
    width: 100%
    background: #FFFFFF0D
    border: 1px solid #FFFFFF40
    backdrop-filter: blur(2px)
    border-radius: 40px

    .progress
      background: $c-light-element
      height: 5px
      border-radius: 40px

.buy-btn
  margin-top: 20px
  width: 100%
  font-size: 16px
  font-weight: 700
  background: white
  padding: 15px 0
  border: 1px solid $c-border-color
  border-radius: 100px
  display: flex
  align-items: center
  justify-content: center
  gap: 4px
  color: $c-main-text

  img
    height: 14px
</style>
