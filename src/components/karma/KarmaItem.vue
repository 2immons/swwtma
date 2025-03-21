<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import KarmaPopup from "@/components/karma/KarmaPopup.vue";
import { useI18n } from "vue-i18n";
import type { KarmaBase } from "@/types/types";
import {toNano} from "@ton/ton";
const { t, locale } = useI18n();

const props = defineProps<{
  karmaCard: KarmaBase
}>();

const progressWidth = computed(() => {
  return String((props.karmaCard.current / props.karmaCard.goal) * 100) + "%";
});

const isCardPopupVisible = ref(false);

const openCardPopup = () => {
  isCardPopupVisible.value = true;
};

const imageUrl = computed(() => {
  if (props.karmaCard.image)
    return `${import.meta.env.VITE_BACKEND}/api/v1/files/${props.karmaCard.image.upload_storage}/${props.karmaCard.image.file_id}`
})

</script>

<template>
  <div class="card-item">
    <KarmaPopup
      @click.stop
      :karmaCard="karmaCard"
      :modelValue="isCardPopupVisible"
      @update:modelValue="isCardPopupVisible = $event"
    />
    <div class="ellepsis ellepsis--upper" v-if="karmaCard.is_donated"></div>
    <div class="ellepsis ellepsis--bottom" v-if="karmaCard.is_donated"></div>
    <div class="content">
      <div class="photo">
        <img :src=imageUrl>
      </div>
      <div class="info">
        <p class="card__title">{{ karmaCard.title }}</p>
        <p class="card__boost" v-if="karmaCard.status === 'active'">
          {{ t("boost") }}: + {{ karmaCard.income_percent / 100 * (karmaCard.donate_amount || 0) }}
          <img
            src="../../assets/svg/stats/green-coin--light-green.svg"
            alt=""
          />
          {{ t("h") }}
        </p>
        <p class="card__boost" v-else-if="karmaCard.status === 'completed'">
          {{ t("raised-all-money") }}
        </p>
      </div>
      <hr />
      <div class="footer">
        <div class="donation-goal">
          <p>
            {{ t("donation-goal") }}: {{ karmaCard.goal }}
            <img src="../../assets/svg/stats/green-coin.svg" alt="" />
          </p>
          <div class="donation-bar">
            <div class="progress" :style="{ width: progressWidth }"></div>
          </div>
          <p v-if="karmaCard.is_donated">
            {{ t("you-donated") }}: {{ karmaCard.donate_amount }}
            <img src="../../assets/svg/stats/green-coin.svg" alt="" />
          </p>
        </div>
        <button
          class="buy-btn"
          v-if="!karmaCard.is_donated && karmaCard.status === 'active'"
          @click="openCardPopup"
        >
          {{ t("donate-from") }} {{ karmaCard.min_donation }}
          <img src="../../assets/svg/stats/green-coin--black.svg" alt="" />
        </button>
        <button
          class="buy-btn"
          v-else-if="karmaCard.is_donated && karmaCard.status === 'active'"
          @click="openCardPopup"
        >
          {{ t("donate-more") }}
          <img src="../../assets/svg/stats/green-coin--black.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.card-item
  overflow: hidden
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  width: 100%
  height: 338px
  color: vars.$c-light-text
  background: vars.$c-task-item-bg
  border: 1px solid vars.$c-border-color
  border-radius: 18px
  position: relative

  .ellepsis
    position: absolute
    height: 72px
    width: 60%
    background: vars.$c-light-element
    filter: blur(22px)
    -webkit-filter: blur(22px)
    border-radius: 100px
    opacity: 0.7

  .ellepsis--bottom
    bottom: -45px

  .ellepsis--upper
    top: -82px

.content
  display: flex
  flex-direction: column
  width: 100%
  padding: 10px
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
    border: 1px solid vars.$c-border-color
    border-radius: 9px

    img
      height: 100%
      object-fit: cover
      object-position: center

  .info
    position: relative
    display: flex
    flex-direction: column
    gap: 12px
    width: 100%
    padding: 10px 0
    text-align: start

    .card__title
      font-size: 14px
      text-align: start

    .card__boost
      color: vars.$c-light-element
      font-size: 12px
      display: flex
      align-items: center
      gap: 4px

      img
        height: 10px

  hr
    border: 1px solid rgba(247, 247, 247, 0.1)
    width: 100%

  .footer
    display: flex
    flex-direction: column
    justify-content: space-between
    width: 100%

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
        font-size: 8px

        img
          height: 7px

      .donation-bar
        display: flex
        align-items: center
        height: 4px
        width: 100%
        background: vars.$c-dark-element
        border: 1px solid #FFFFFF40
        backdrop-filter: blur(2px)
        border-radius: 40px

        .progress
          background: vars.$c-light-element
          height: 5px
          border-radius: 40px

    .buy-btn
      display: flex
      align-items: center
      justify-content: center
      gap: 3px
      width: 100%
      font-size: 10px
      font-weight: 700
      background: white
      padding: 9px 0
      border: 1px solid vars.$c-border-color
      border-radius: 100px
      color: vars.$c-main-text
      z-index: 10

      img
        height: 11px
</style>
