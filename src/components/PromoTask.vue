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
    <h3>{{ quest.title }}</h3>
    <p>{{ quest.description }}</p>
    <button @click="joinQuest(quest)">{{ t("accept-task") }}</button>
  </div>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.quest-item
  display: flex
  flex-direction: column
  align-items: start
  width: 100%
  height: fit-content
  max-height: 250px
  color: $c-main-text
  background: $c-element-bg
  padding: 15px
  border-radius: 31px
  gap: 15px
  box-shadow: $c-element-shadow

  h3
    font-size: 30px

  p
    font-size: 18px
    text-align: start
    display: -webkit-box
    -webkit-line-clamp: 4
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

  button
    padding: 7px 25px
    width: fit-content
    background: $c-active-element
    box-shadow: $c-element-shadow
    align-self: end
    border-radius: 25px
    font-size: 25px
    text-transform: uppercase
    color: $c-main-text
</style>
