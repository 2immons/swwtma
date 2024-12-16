<script setup lang="ts">
import { defineEmits, defineProps, onMounted, onBeforeUnmount, ref } from "vue";
import { cardsStore } from "@/store/cards";
import PageHeader from "@/components/layout/TheHeader.vue";
const cardsStoreInstance = cardsStore();
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const props = defineProps<{
  card: {
    title: string;
    price: number;
    level: number;
  };
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <Transition>
    <div class="card-popup" v-if="modelValue" @click="closePopup">
      <div class="content" @click.stop>
        <div class="container">
          <div class="photo">
            <img src="../../assets/images/card-test.png" alt="" />
            <button @click="closePopup">+</button>
          </div>
          <div class="info">
            <h3>{{ card.title }}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Sed eros viverra aliquam
              commodo sit sed. Tempor cras adipiscing ut et. Quam porttitor et
              amet consequat molestie. Fames in non vitae in
            </p>
          </div>
          <hr />
          <div class="stats">
            <p class="level">
              <img
                src="../../assets/svg/stats/green-coin--light-green.svg"
                alt=""
              />
              Lvl {{ card.level }}
            </p>
            <p class="income">
              {{ t("boost") }}: + {{ card.price }}
              <img src="../../assets/svg/stats/green-coin.svg" alt="" />
            </p>
          </div>
          <button class="buy-btn">
            {{ t("buy") }} {{ card.price }}
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
  padding-bottom: 10%
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
  max-height: 280px
  overflow: hidden

  img
    width: 100%
    aspect-ratio: 1

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
  align-items: center
  width: 100%
  justify-content: start
  gap: 12px

  .level
    display: flex
    background: #22F07D24
    font-size: 11px
    padding: 8px 10px
    color: $c-light-element
    align-items: center
    gap: 3px
    border-radius: 100px
    border: 1px solid rgba(34, 240, 125, 0.1)
    img
      height: 10px

  .income
    display: flex
    gap: 3px
    align-items: center
    font-size: 14px
    opacity: 70%
    img
      height: 12px

.buy-btn
  margin-top: 20px
  width: 100%
  font-size: 16px
  font-weight: 700
  background: white
  padding: 22px
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
