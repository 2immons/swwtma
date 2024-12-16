<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { karmaStore } from "@/store/karma";
import KarmaItem from "@/components/karma/KarmaItem.vue";

// Иконки категорий:
import recyclingIcon from "@/assets/svg/karma/recycling.svg";
import medIcon from "@/assets/svg/karma/med.svg";
import animalsIcon from "@/assets/svg/karma/animals.svg";

const karmaStoreInstance = karmaStore();

const activeCategory = ref(0);

const categories = computed(() => {
  return karmaStoreInstance.categories;
});

const karmaCards = ref<KarmaCard[]>(
  categories.value[activeCategory.value].karmaCards
);

// Определение интерфейсов
interface KarmaCard {
  title: string;
  price: number;
}

interface Category {
  id: number;
  title: string;
  karmaCards: KarmaCard[];
}

const srcToCategoryIcons = ref([
  recyclingIcon,
  medIcon,
  animalsIcon,
  animalsIcon,
]);

const srcToCategoryIcon = ref(srcToCategoryIcons.value[0]);

const setActiveCategory = (index: number) => {
  activeCategory.value = index;
  srcToCategoryIcon.value = srcToCategoryIcons.value[index];
  karmaCards.value = categories.value[activeCategory.value].karmaCards;
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
</script>

<template>
  <div class="task-list">
    <div class="nav-wrapper">
      <div class="nav no-scrollbar" @scroll="handleScroll">
        <button
          v-for="(category, index) in categories"
          :key="index"
          :class="categoryTitleClass(index)"
          @click="setActiveCategory(index)"
        >
          <img
            :src="srcToCategoryIcon"
            alt=""
            v-if="category.id === activeCategory"
          />
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
  display: flex
  align-items: center
  justify-content: space-between
  gap: 10px
  line-height: 24.6px
  z-index: 10

  padding: 0 5px 0 0

.category-title--active
  font-weight: 500
  opacity: 100%

  padding: 9.5px 10px
  border: 1px solid #FFFFFF99
  border-radius: 100px

.list
  margin-top: 24px
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 10px
  row-gap: 19px
</style>
