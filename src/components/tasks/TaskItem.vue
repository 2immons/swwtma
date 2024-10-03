<script setup lang="ts">
import { defineProps } from "vue";
import { questsStore } from "@/store/quests";
const questsStoreInstance = questsStore();

const props = defineProps<{
  quest: {
    title: "string";
    description: "string";
  };
}>();

const joinQuest = async (quest: any) => {
  try {
    await questsStoreInstance.joinQuest(quest);
  } catch (error) {
    console.error(error);
    return;
  }
};
</script>

<template>
  <div class="quest-item">
    <div class="left-side">
      <img src="../../assets/svg/tasks/battery.svg" alt="" />
      <div class="info">
        <h3>{{ quest.title }}</h3>
        <div class="income">
          <p>+ 699</p>
          <img src="../../assets/svg/tasks/green-coin.svg" alt="" />
        </div>
      </div>
    </div>
    <button @click="joinQuest(quest)">{{ t("accept-task") }}</button>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.quest-item
  padding: 20px 17px
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  height: fit-content
  color: $c-light-element
  background: #22F07D05

  border-radius: 18px
  gap: 15px

  .left-side
    display: flex
    gap: 29px

  .info
    display: flex
    flex-direction: column
    gap: 12px

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

  button
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    width: fit-content
    background: #22F07D1F
    border-radius: 50px
    height: 25px
    font-size: 10px
    font-weight: 800
    color: $c-light-element
    border: 0.4px solid #22F07D33
    backdrop-filter: blur(2px)
    gap: 3px
</style>
