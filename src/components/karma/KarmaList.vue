<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { karmaStore } from "@/store/karma";
import KarmaItem from "@/components/karma/KarmaItem.vue";
import { eventBus } from "@/event_bus/eventBus";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
// Иконки категорий:
import recyclingIcon from "@/assets/svg/karma/recycling.svg";
import medIcon from "@/assets/svg/karma/med.svg";
import animalsIcon from "@/assets/svg/karma/animals.svg";
import type { KarmaBase } from "@/types/types";

const karmaStoreInstance = karmaStore();

const fetchKarmas = async () => {
  try {
    await karmaStoreInstance.fetchKarma();
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
};

onMounted(async () => {
  await fetchKarmas();
});

const activeCategory = ref(0);

const categories = computed(() => {
  return karmaStoreInstance.categories;
});

const karmaCards = ref<KarmaBase[]>(
  categories.value[activeCategory.value].karmas,
);

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
  karmaCards.value = categories.value[activeCategory.value].karmas;
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
            v-if="category.index === activeCategory"
          />
          {{ category.category }}
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
@use "@/styles/variables" as vars

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
  background: vars.$c-gradient-nav-right

.nav
  display: flex
  align-items: center
  gap: 20px
  overflow-x: scroll

.nav-overlay--left
  left: 0
  background: vars.$c-gradient-nav-right

.nav-overlay--right
  right: 0
  background: vars.$c-gradient-nav-left

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
  row-gap: 13px
</style>
