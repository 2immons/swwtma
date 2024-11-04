<script setup lang="ts">
import { defineProps } from "vue";
import { cardsStore } from "@/store/cards";
const cardsStoreInstance = cardsStore();

const props = defineProps<{
  karmaCard: {
    title: string;
    price: number;
    level: number;
  };
}>();
</script>

<template>
  <div class="card-item">
    <div class="photo">
      <img src="../../assets/images/card.png" alt="" />
    </div>
    <div class="content">
      <div class="info">
        <p class="card__title">{{ karmaCard.title }}</p>
        <p class="card__boost">
          Boost: + 0.5
          <img src="../../assets/svg/stats/green-coin.svg" alt="" />
          h
        </p>
        <button>+</button>
        <div class="nav-overlay nav-overlay--left" v-if="!isAtStart"></div>
        <div class="nav-overlay nav-overlay--right" v-if="!isAtEnd"></div>
      </div>
      <hr />
      <div class="footer">
        <div class="footer__item footer__item--level">
          <img src="../../assets/svg/stats/green-coin.svg" alt="" />
          <p>Lvl {{ karmaCard.level }}</p>
        </div>
        <div class="footer__item footer__item--price">
          <p>Price: {{ karmaCard.price }}</p>
          <img src="../../assets/svg/stats/green-coin.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.card-item
  overflow: hidden
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  width: 100%
  height: fit-content
  color: $c-light-text
  background: #FFFFFF05
  border: 1px solid $c-border-color
  border-radius: 18px

.photo
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 161px
  overflow: hidden
  border: 1px solid $c-border-color
  border-radius: 18px

.content
  display: flex
  flex-direction: column
  width: 100%
  padding: 10px
  height: fit-content
  align-items: center
  justify-content: space-between

  .info
    position: relative
    display: flex
    flex-direction: column
    gap: 12px
    width: 100%
    padding: 10px 0

    .card__title
      font-size: 14px

    .card__boost
      color: $c-light-element
      font-size: 12px
      display: flex
      align-items: center
      gap: 4px

      img
        height: 10px

    button
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
      height: 25px
      width: 25px
      border-radius: 50px
      color: white
      background: #FFFFFF1A

  hr
    border: 0.4px solid #F7F7F71A
    width: 100%

  .footer
    display: flex
    justify-content: space-between
    width: 100%
    padding: 12px 0

    .footer__item
      border-radius: 50px
      height: 20px
      padding: 8px 9px
      display: flex
      align-items: center
      gap: 3px
      border: 1px solid $c-border-color

      p
        font-size: 9px

      img
        height: 9px

    .footer__item--level
      background: #FFFFFF24

    .footer__item--price
      background: #FFFFFF08

  .income
    display: flex
    align-items: center
    justify-content: center
    gap: 3px
    opacity: 60%

    p
      font-size: 12px
      font-weight: 600
      line-height: 16.39px

  h3
    font-size: 14px
    font-weight: 600
    line-height: 19.12px

  p
    font-size: 18px
    text-align: start
    display: -webkit-box
    -webkit-line-clamp: 4
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis
</style>
