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
    <div class="content">
      <div class="photo">
        <img src="../../assets/images/card.png" alt="" />
      </div>
      <div class="info">
        <p class="card__title">{{ karmaCard.title }}</p>
        <p class="card__boost">
          Boost: + 0.5
          <img src="../../assets/svg/stats/green-coin--light-green.svg" alt="" />
          h
        </p>
      </div>
      <hr />
      <div class="footer">
        <div class="donation-goal">
          <p>
            Donation Goal 78383838
            <img src="../../assets/svg/stats/green-coin.svg" alt="">
          </p>
          <div class="donation-bar">
            <div class="progress"></div>
          </div>
        </div>
        <button class="buy-btn">
          Купить за {{ karmaCard.price }}
          <img src="../../assets/svg/stats/green-coin--black.svg" alt="">
        </button>
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

.content
  display: flex
  flex-direction: column
  width: 100%
  padding: 21px
  height: fit-content
  align-items: center
  justify-content: space-between

  .photo
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 140px
    overflow: hidden
    border: 1px solid $c-border-color
    border-radius: 9px

  .info
    position: relative
    display: flex
    flex-direction: column
    gap: 12px
    width: 100%
    padding: 10px 0

    .card__title
      font-size: 14px
      text-align: start

    .card__boost
      color: $c-light-element
      font-size: 12px
      display: flex
      align-items: center
      gap: 4px

      img
        height: 12px

  hr
    border: 1px solid rgba(247, 247, 247, 0.1)
    width: 100%

  .footer
    display: flex
    flex-direction: column
    justify-content: space-between
    width: 100%
    padding: 12px 0

    .donation-goal
      display: flex
      flex-direction: column
      width: 100%
      align-items: start
      gap: 8px

      p
        text-align: start
        display: flex
        justify-content: center
        align-items: center
        gap: 3px
        opacity: 70%
        font-size: 8px

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
          width: 50%
          border-radius: 40px

    .buy-btn
      display: flex
      align-items: center
      justify-content: center
      gap: 3px
      margin-top: 20px
      width: 100%
      font-size: 10px
      font-weight: 700
      background: white
      padding: 9px 15px
      border: 1px solid $c-border-color
      border-radius: 100px
      color: $c-main-text

      img
        height: 11px
</style>
