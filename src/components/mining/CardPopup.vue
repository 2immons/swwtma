<script setup lang="ts">
import {
  defineEmits,
  defineProps,
  onMounted,
  onBeforeUnmount,
  ref,
  watch, computed,
} from "vue";
import { cardsStore } from "@/store/cards";
import PageHeader from "@/components/layout/TheHeader.vue";
const cardsStoreInstance = cardsStore();
import { useI18n } from "vue-i18n";
import type { CardBase } from "@/types/types";
import {eventBus} from "@/event_bus/eventBus.ts";
const { t, locale } = useI18n();

const props = defineProps<{
  card: CardBase;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const closePopup = () => {
  emit("update:modelValue", false);
};

const touchStartY = ref(0);
const touchEndY = ref(0);
const swipeThreshold = 50;

const onTouchStart = (event: TouchEvent) => {
  touchStartY.value = event.touches[0].clientY;
};

const onTouchMove = (event: TouchEvent) => {
  touchEndY.value = event.touches[0].clientY;
};

const onTouchEnd = () => {
  if (touchEndY.value - touchStartY.value > swipeThreshold) {
    closePopup();
  }
};

onMounted(async () => {
  if (props.modelValue) {
    document.body.classList.add("no-scroll");
  }
});

onBeforeUnmount(() => {
  document.body.classList.remove("no-scroll");
});

// Слушайте изменения `modelValue` и обновляйте класс
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  },
);

const purchaseCard = async () => {
  if (!props.card.is_bought) {
    const isValid = await cardsStoreInstance.purchaseCard(props.card.id)
    if (!isValid) {
      eventBus.emit("showErrorPopup", t("balance-error"))
    }
  } else {
    const isValid = await cardsStoreInstance.upgradeCard(props.card.id)
    if (isValid) {
      await cardsStoreInstance.fetchCards();
      closePopup();
    }
  }
}

const targetLevel = computed(() => {
  if (props.card.is_bought) {
    if (props.card.user_card?.max_level) {
      return props.card.user_card;
    } else {
      if (props.card.user_card) {
        const targetLevel = props.card.user_card.level + 1;

        for (let i = 0; i < props.card.level_map.length; i++) {
          if (props.card.level_map[i].level === targetLevel) {
            return props.card.level_map[i];
          }
        }
      }
    }
  } else {
    if (props.card.level_map) {
      const targetLevel = 1;

      for (let i = 0; i < props.card.level_map.length; i++) {
        if (props.card.level_map[i].level === targetLevel) {
          return props.card.level_map[i];
        }
      }
    }
  }
});

const imageUrl = computed(() => {
      if (props.card.image)
        return `${import.meta.env.VITE_BACKEND}/api/v1/files/${props.card.image.upload_storage}/${props.card.image.file_id}`
    })
</script>



<template>
  <Transition>
    <div
      class="card-popup"
      v-if="modelValue"
      @click="closePopup"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="content" @click.stop>
        <div class="container">
          <div class="wrapper no-scrollbar">
            <div class="photo">
              <!--      <img src="../../assets/images/card-test.png" alt="" />-->
              <img :src=imageUrl>
              <button @click="closePopup" class="close-btn">+</button>
            </div>
            <div class="info">
              <h3>{{ card.title }}</h3>
              <p>{{ card.info }}</p>
            </div>
            <hr />
            <div class="stats">
              <p class="level">
                <img
                  src="../../assets/svg/stats/green-coin--light-green.svg"
                  alt=""
                />
                Lvl {{ targetLevel?.level }}
              </p>
              <p class="income">
                {{ t("boost") }}: + {{ targetLevel?.power }}
                <img src="../../assets/svg/stats/green-coin.svg" alt="" />
              </p>
            </div>
            <button class="buy-btn" @click="purchaseCard()" v-if="card.is_available && !card.user_card?.max_level">
              {{ t("buy") }} {{ targetLevel?.upgrade_cost }}
              <img src="../../assets/svg/stats/green-coin--black.svg" alt="" />
            </button>
            <button class="buy-btn" v-else-if="card.user_card?.max_level">
              {{ t("already-max-level") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

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
  background: vars.$c-bg
  height: 80%
  max-height: 650px
  display: flex
  width: 100%
  justify-content: center
  margin-top: 60px
  padding-bottom: 30px
  border-top-right-radius: 30px
  border-top-left-radius: 30px

.container
  height: 100%

.photo
  position: relative
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  min-height: 280px
  overflow: hidden

  img
    height: 100%
    object-fit: cover
    object-position: center

.popup-header
  position: relative
  margin-top: 16px
  min-height: fit-content
  display: flex
  width: 100%
  border-radius: 20px
  justify-content: center
  align-items: center
  overflow: hidden
  margin-bottom: 20px

.close-btn
  position: absolute
  right: 10px
  top: -25px
  rotate: 45deg
  font-weight: 200
  font-size: 60px
  line-height: 84px
  background: transparent
  color: vars.$c-main-text

.buttons
  display: flex
  flex-direction: column
  width: 100%
  margin-top: 30px
  gap: 15px

  button, a
    width: 100%
    font-size: 16px
    font-weight: 700
    background: white
    padding: 15px 0
    border: 1px solid vars.$c-border-color
    border-radius: 100px
    align-items: center
    justify-content: center
    gap: 4px
    color: vars.$c-main-text

.wrapper
  display: flex
  overflow: scroll
  flex-direction: column
  width: 100%
  height: 100%
  align-items: center
  margin-top: 16px
  border-top-right-radius: 30px
  border-top-left-radius: 30px

.info
  margin-top: 26px
  width: 100%

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
  border: 1px solid vars.$c-border-color

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
    color: vars.$c-light-element
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
  border: 1px solid vars.$c-border-color
  border-radius: 100px
  display: flex
  align-items: center
  justify-content: center
  gap: 4px
  color: vars.$c-main-text

  img
    height: 14px
</style>
