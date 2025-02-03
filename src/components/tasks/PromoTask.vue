<script setup lang="ts">
import { computed, defineProps } from "vue";
import { questsStore } from "@/store/tasks";
import { storeToRefs } from "pinia";
import { TaskBaseSchema, TaskGroupBaseSchema } from "@/types/types";
const tasksStoreInstance = questsStore();

const props = defineProps<{
  index: number;
  group: TaskGroupBaseSchema;
}>();

const openPromoTask = async () => {
  try {
    //
  } catch (error) {
    console.error(error);
    return;
  }
};

const getGroupTaskStatus = (tasks: TaskBaseSchema[] | null): string => {
  if (tasks) {
    if (tasks.every((task) => task.is_done)) {
      return "COMPLETED";
    } else if (tasks.some((task) => task.is_done)) {
      return "IN_PROGRESS";
    } else {
      return "NOT_STARTED";
    }
  } else {
    return "not_started";
  }
};

// const claimReward = async () => {
//   try {
//     tasksStoreInstance.claimPromoTaskReward(props.group.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };
</script>

<template>
  <div class="promo-task-wrapper">
    <div class="promo-task-box">
      <img
        src="../../assets/svg/bg-vectores--promo-task.svg"
        alt=""
        class="bg-image"
      />
      <div class="bg-ellepsis"></div>
      <p class="title">{{ group.name }}</p>
      <p class="name">{{ group.description }}</p>
      <div class="footer">
        <router-link
          :to="{
            name: 'promo-task',
            params: { promo_task_id: props.index },
          }"
          v-if="
            getGroupTaskStatus(props.group.tasks) !== 'CLAIMED' &&
            getGroupTaskStatus(props.group.tasks) !== 'COMPLETED'
          "
        >
          <button @click="openPromoTask" class="start-btn">
            {{
              getGroupTaskStatus(props.group.tasks) === "IN_PROGRESS"
                ? t("continue-promo-task")
                : t("accept-task")
            }}
          </button>
        </router-link>
        <button
          @click="claimReward"
          v-else-if="getGroupTaskStatus(props.group.tasks) === 'COMPLETED'"
          class="claim-btn"
        >
          {{ t("claim-task") }}
        </button>
        <div
          class="claimed-wrapper"
          v-else-if="promoTask.promo_task_status === 'CLAIMED'"
        >
          <p>Completed</p>
        </div>
        <div class="benefits">
          <p>
            + 699
            <img src="../../assets/svg/stats/green-coin--small.svg" alt="" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.promo-task-wrapper
  width: 100%
  overflow-x: visible // Видимость "выглядывающих" элементов
  position: relative
  flex-direction: column
  margin-top: 26px
  color: white
  gap: 20px
  flex: 0 0 100%
  scroll-snap-align: start

.promo-task-box
  position: relative
  background: vars.$c-dark-element
  width: 100%
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  padding: 22px
  border: 1px solid vars.$c-border-color
  opacity: 100%
  border-radius: 20px
  overflow: hidden
  gap: 40px

  .bg-image
    position: absolute
    right: 0
    top: 0
    width: 100%
    height: 100%
    opacity: 0.2

  .bg-ellepsis
    position: absolute
    height: 140px
    width: 140px
    top: -70px
    right: -30px
    border-radius: 50%
    background: white
    overflow: hidden
    opacity: 0.4
    will-change: filter
    filter: blur(80px)
    -webkit-filter: blur(80px)

  .title
    font-size: 10px
    opacity: 50%
    text-align: left

  .name
    font-size: 25px
    font-weight: 600
    text-align: left

.footer
  display: flex
  gap: 6px
  height: 30px
  z-index: 20
  align-items: center

  a
    height: 30px

  button
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    width: fit-content
    border-radius: 50px
    height: 25px
    font-size: 10px
    font-weight: bolder
    backdrop-filter: blur(2px)
    gap: 3px

  .start-btn
    border: 1px solid vars.$c-border-color
    color: vars.$c-main-text
    backdrop-filter: blur(2px)
    background: white
    height: 100%

  .claim-btn
    background: vars.$c-light-element
    color: vars.$c-main-text

  .claimed-wrapper
    height: 25px
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    border-radius: 50px
    backdrop-filter: blur(2px)
    background: rgba(34, 240, 125, 0.2)

  .benefits
    border: 1px solid vars.$c-border-color
    backdrop-filter: blur(2px)
    background: vars.$c-dark-element
    height: 100%
    border-radius: 50px
    padding: 4px 15px
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    font-weight: bolder

  .claimed-wrapper
    height: 30px
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    border-radius: 50px
    border: 1px solid vars.$c-border-color
    backdrop-filter: blur(2px)
    background: vars.$c-dark-element

    p
      font-size: 10px
      font-weight: 600
      color: white
</style>
