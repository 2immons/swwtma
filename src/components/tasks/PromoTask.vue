<script setup lang="ts">
import {computed, defineProps} from "vue";
import { questsStore } from "@/store/quests";
import {storeToRefs} from "pinia";
const tasksStoreInstance = questsStore();

interface Task {
  id: number;
  title: string;
  url: string;
  status: string, // VERIFYING, NOT_STARTED, COMPLETED, CLAIMED
}

interface PromoTask {
  promo_task_id: number;
  description: string;
  title: string,
  promo_task_status: string,
  tasks: Task[];
}

const props = defineProps<{
  promoTask: PromoTask
}>();

const { promoTasks } = storeToRefs(tasksStoreInstance);

const promoTask = computed((): PromoTask => {
  const foundPromoTask = promoTasks.value.find((currentPromoTask) => currentPromoTask.promo_task_id === props.promoTask.promo_task_id);
  return foundPromoTask ? foundPromoTask : props.promoTask;
});

const openPromoTask = async () => {
  try {
    //
  } catch (error) {
    console.error(error);
    return;
  }
};

const claimReward = async () => {
  try {
    tasksStoreInstance.claimPromoTaskReward(promoTask.value);
  } catch (error) {
    console.error(error);
    return;
  }
};
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
      <p class="title">{{ promoTask.title }}</p>
      <p class="name">{{ promoTask.description }}</p>
      <div class="footer">
        <router-link
            :to="{ name: 'promo-task', params: { promo_task_id: promoTask.promo_task_id } }"
            v-if="promoTask.promo_task_status !=='CLAIMED' && promoTask.promo_task_status !=='COMPLETED'">
          <button @click="openPromoTask">
            {{ promoTask.promo_task_status === 'IN_PROGRESS' ? t("continue-promo-task") : t("accept-task") }}
          </button>
        </router-link>
        <button @click="claimReward" v-else-if="promoTask.promo_task_status ==='COMPLETED'">{{ t("claim-task") }}</button>
        <div class="claimed-wrapper" v-else-if="promoTask.promo_task_status === 'CLAIMED'">
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
@import "../../styles/variables"
.promo-task-wrapper
  width: 100%
  display: flex
  flex-direction: column
  margin-top: 26px
  color: white
  gap: 20px

.promo-task-box
  position: relative
  background: #FFFFFF0D
  width: 100%
  display: flex
  flex-direction: column
  align-items: start
  justify-content: space-between
  padding: 22px
  border: 1px solid $c-border-color
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
    font-size: 27px
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
    background: white
    padding: 4px 15px
    border: 0.4px solid #22F07D33
    border-radius: 50px
    font-size: 12px
    font-weight: 700
    height: 100%
    color: $c-main-text

  .benefits
    border: 1px solid $c-border-color
    backdrop-filter: blur(2px)
    background: $c-dark-element
    height: 100%
    border-radius: 50px
    padding: 4px 15px
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    font-weight: 500

  .claimed-wrapper
    height: 30px
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    border-radius: 50px
    border: 1px solid $c-border-color
    backdrop-filter: blur(2px)
    background: $c-dark-element

    p
      font-size: 10px
      font-weight: 600
      color: white
</style>
