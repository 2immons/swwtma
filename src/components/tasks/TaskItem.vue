<script setup lang="ts">
import { computed, defineProps } from "vue";
import { questsStore } from "@/store/tasks";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { TaskBaseSchema } from "@/types/types";
const { t, locale } = useI18n();

const tasksStoreInstance = questsStore();

const props = defineProps<{
  task: TaskBaseSchema;
  isPromoTask: boolean;
}>();

interface Task {
  id: number;
  title: string;
  url: string;
  status: string; // VERIFYING, NOT_STARTED, COMPLETED, CLAIMED
}

const { categories } = storeToRefs(tasksStoreInstance);

const task = computed((): TaskBaseSchema => {
  const category = categories.value.find((currentCategory) =>
    currentCategory.tasks.some(
      (currentTask) => currentTask.id === props.task.id,
    ),
  );
  const foundTask = category?.tasks.find(
    (currentTask) => currentTask.id === props.task.id,
  );
  return foundTask || props.task;
});

// const acceptPromoTask = async () => {
//   try {
//     window.open(task.value.url, "_blank");
//     tasksStoreInstance.acceptPromoTask(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

// const acceptTask = async () => {
//   try {
//     window.open(task.value.url, "_blank");
//     tasksStoreInstance.completeTask(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

// const claimReward = async () => {
//   try {
//     tasksStoreInstance.claimReward(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };
</script>

<template>
  <div class="task-item">
    <div class="left-side">
      <img src="../../assets/svg/tasks/battery.svg" alt="" />
      <div class="info">
        <p>{{ task.name }}</p>
      </div>
    </div>
    <div class="right-side">
      <div class="income">
        <p>+ 699</p>
        <img src="../../assets/svg/stats/green-coin.svg" alt="" />
      </div>
      <div class="loader-wrapper" v-if="task.status === 'VERIFYING'">
        <div class="loader"></div>
      </div>
      <div class="claimed-wrapper" v-if="task.status === 'CLAIMED'">
        <img src="../../assets/svg/v-icon.svg" alt="" />
      </div>
      <button
        @click="acceptTask"
        v-else-if="task.status === 'NOT_STARTED'"
        class="start-btn"
      >
        {{ t("accept-task") }}
      </button>
      <button
        @click="claimReward"
        v-else-if="task.status === 'COMPLETED'"
        class="claim-btn"
      >
        {{ t("claim-task") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.task-item
  padding: 20px 17px
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  height: fit-content
  color: vars.$c-light-text
  background: vars.$c-task-item-bg
  border: 1px solid vars.$c-border-color
  border-radius: 18px
  gap: 12px

  .left-side
    display: flex
    gap: 21px
    width: 90%

  .right-side
    display: flex
    width: 10%
    justify-content: space-between
    min-width: 110px

  .info
    flex: 1
    display: flex
    gap: 12px

    p
      font-size: 13px
      font-weight: 600

    @media (max-width: 360px)
      p
        font-size: 12px

    @media (max-width: 345px)
      p
        font-size: 11px

    @media (max-width: 338px)
      p
        font-size: 10px

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
      text-align: left
      white-space: nowrap

    img
      height: 12px

  h3
    font-size: 14px
    font-weight: 600
    line-height: 19.12px
    text-align: left

  p
    font-size: 18px
    text-align: start
    display: -webkit-box
    -webkit-line-clamp: 4
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

  button
    display: flex
    align-items: center
    justify-content: center
    padding: 5px 14px
    width: fit-content
    border-radius: 50px
    font-size: 10px
    font-weight: bold
    backdrop-filter: blur(2px)
    gap: 3px

  .start-btn
    background: #FFFFFF1A
    color: white

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

  .loader-wrapper
    height: 25px
    padding: 4px
    background: #FFFFFF1A
    border: 1px solid vars.$c-border-color
    border-radius: 50px

    .loader
      height: 100%
      border: 3px solid #FFFFFF52
      border-top: 3px solid #FFFFFFDE
      border-radius: 50%
      aspect-ratio: 1
      animation: spin 1s linear infinite

      @keyframes spin
        from
          transform: rotate(0deg)
        to
          transform: rotate(360deg)
</style>
