<script setup lang="ts">
import { computed, onMounted } from "vue";
import CardItem from "@/components/mining/CardItem.vue";
import { cardsStore } from "@/store/cards";
import { eventBus } from "@/event_bus/eventBus";

const cardsStoreInstance = cardsStore();

const cards = computed(() => {
  return cardsStoreInstance.cards;
});

const fetchCards = async () => {
  try {
    await cardsStoreInstance.fetchCards();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

onMounted(async () => {
  // await fetchCards();
});
</script>

<template>
  <div class="task-list">
    <CardItem v-for="(card, index) in cards" :key="index" :card="card" />
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.task-list
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 10px
</style>
