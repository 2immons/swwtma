<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watchEffect, onMounted } from "vue";
import CardItem from "@/components/mining/CardItem.vue";
import { karmaStore } from "@/store/karma";
import KarmaItem from "@/components/karma/KarmaItem.vue";

const karmaStoreInstance = karmaStore();

const activeCategory = ref(0);

const categories = computed(() => {
  return karmaStoreInstance.categories;
});

const karmaCards = ref<Task[]>(categories.value[activeCategory.value].tasks);

// Определение интерфейсов
interface Task {
  title: string;
  price: number;
  level: number;
}

interface Category {
  id: number;
  title: string;
  tasks: Task[];
}

const setActiveCategory = (index: number) => {
  activeCategory.value = index;
  karmaCards.value = categories.value[activeCategory.value].tasks
};

const categoryTitleClass = (index: number) => {
  return index === activeCategory.value
    ? "category-title--active"
    : "category-title";
};

const isAtStart = ref(true);
const isAtEnd = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  isAtStart.value = target.scrollLeft === 0;
  isAtEnd.value = target.scrollLeft + target.offsetWidth >= target.scrollWidth;
};

onMounted(() => {
  const navElement = document.querySelector(".nav");
  if (navElement) {
    navElement.addEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div class="task-list">
    <div class="nav-wrapper">
      <div class="nav no-scrollbar">
        <button
          v-for="(category, index) in categories"
          :key="index"
          :class="categoryTitleClass(index)"
          @click="setActiveCategory(index)"
        >
          {{ category.title }}
        </button>
      </div>
      <div class="nav-overlay nav-overlay--left" v-if="!isAtStart"></div>
      <div class="nav-overlay nav-overlay--right" v-if="!isAtEnd"></div>
    </div>
    <div class="list">
      <KarmaItem
        v-for="(karmaCard, index) in karmaCards"
        :key="index"
        :karmaCard="karmaCard"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.task-list
  width: 100%
  margin-top: 46px
.nav-wrapper
  position: relative
  width: 100%
  height: 58px
  display: flex

.nav-overlay
  position: absolute
  top: 0
  bottom: 0
  width: 128px
  height: 100%
  pointer-events: none
  background: $c-gradient-nav-right

.nav
  display: flex
  align-items: center
  gap: 20px
  overflow-x: scroll

.nav-overlay--left
  left: 0
  background: $c-gradient-nav-right

.nav-overlay--right
  right: 0
  background: $c-gradient-nav-left

.category-title, .category-title--active
  font-size: 18px
  font-weight: 500
  white-space: nowrap
  color: white
  opacity: 50%
  line-height: 24.6px

  padding: 0 5px 0 0

.category-title--active
  font-weight: 700
  opacity: 100%

  padding: 9.5px 16px
  border: 0.4px solid #FFFFFF99
  border-radius: 100px

.list
  margin-top: 24px
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 10px
</style>
