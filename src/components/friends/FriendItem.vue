<script setup lang="ts">
import { defineProps } from "vue";
import { friendsStore } from "@/store/friends";
import { type UserReferralIncomeSchema } from "@/types/types"

const friendsStoreInstance = friendsStore();

const props = defineProps<{
  friend: UserReferralIncomeSchema
}>();
</script>

<template>
  <div class="friend">
    <div class="photo"></div>
    <div class="info">
      <p class="name">{{ friend.username }}</p>
      <p class="boost">
        <img src="../../assets/svg/stats/green-coin.svg" alt="" />
        + {{ friend.unclaimed_income }}
      </p>
    </div>
    <div class="total">
      <p>
        + {{ friend.total_income }}
        <img src="../../assets/svg/stats/green-coin.svg" alt="" />
      </p>
    </div>
  </div>
  <hr />
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

hr
  border: 0.4px solid #F7F7F71A
  margin-bottom: 12px

.friend
  width: 100%
  display: flex
  height: 40px
  margin-bottom: 12px
  align-items: center

  .photo
    height: 40px
    width: 40px
    background: #D9D9D9
    border-radius: 50px
    margin-right: 17px

  .info
    display: flex
    flex-direction: column
    padding: 3px 0
    height: 100%
    flex-grow: 1
    justify-content: space-between

    .name
      text-align: left
      font-size: 14px

    .boost
      display: flex
      opacity: 50%
      gap: 4px
      font-size: 12px
      img
        height: 14px

  .total
    display: flex
    justify-content: center
    align-items: center
    opacity: 50%
    font-size: 18px
    font-weight: 700
    line-height: 15px

    img
      height: 15px
</style>
