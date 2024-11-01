<script setup lang="ts">
import {defineProps, defineEmits, computed, ref} from "vue";
import CardItem from "@/components/mining/CardItem.vue";
import { cardsStore } from "@/store/cards";

const cardsStoreInstance = cardsStore();

const cards = computed(() => {
  return cardsStoreInstance.cards;
});

// Определение интерфейсов
interface Task {
  title: string;
}

interface Category {
  id: number;
  title: string;
  tasks: Task[];
}

</script>

<template>
  <div class="task-list">
    <CardItem
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
    />
  </div>
</template>

<style scoped lang="sass">
.task-list
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 10px
</style>
