<script setup lang="ts">
import QuestItem from "@/components/tasks/TaskItem.vue";
import { questsStore } from "@/store/tasks";
import { computed, onMounted, ref } from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";
import PromoTask from "@/components/tasks/PromoTask.vue";
import TasksCategory from "@/components/tasks/TasksCategory.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const isAtStart = ref(true);
const isAtEnd = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  isAtStart.value = target.scrollLeft === 0;
  isAtEnd.value = target.scrollLeft + target.offsetWidth >= target.scrollWidth;
};

const availableTasks = ref(10);

const isWeeklyQuests = ref(false);

const questsStoreInstance = questsStore();

// const promoTasks = computed(() => {
//   return questsStoreInstance.groups;
// });

onMounted(async () => {
  await questsStoreInstance.fetchTasks();
});

const categories = computed(() => {
  return questsStoreInstance.categories;
});

const groupsTasks = computed(() => {
  return questsStoreInstance.groups;
});

const activeCategory = ref(0);

const setActiveCategory = (index: number) => {
  activeCategory.value = index;
};

const categoryTitleClass = (index: number) => {
  return index === activeCategory.value
    ? "category-title--active"
    : "category-title";
};

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const handleMouseDown = (event) => {
  const container = event.currentTarget;
  isDragging.value = true;
  startX.value = event.pageX - container.offsetLeft;
  scrollLeft.value = container.scrollLeft;
};

const handleMouseMove = (event) => {
  if (!isDragging.value) return;
  const container = event.currentTarget;
  const x = event.pageX - container.offsetLeft;
  const walk = (x - startX.value) * 2;
  container.scrollLeft = scrollLeft.value - walk;
};

const handleMouseUp = () => {
  isDragging.value = false;
};
</script>

<template>
  <section class="quests">
    <div class="container">
      <div class="quests-content">
        <h2>
          {{ t("tasks") }} <span>{{ availableTasks }}</span>
        </h2>
        <div
          class="promo-tasks no-scrollbar"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        >
          <PromoTask
            v-for="(group, index) in groupsTasks"
            :key="index"
            :group="group"
            :index="index"
          />
        </div>
        <h3 v-if="isWeeklyQuests">
          {{ t("weekly") }}
        </h3>
        <div class="regular-tasks">
          <div class="nav-wrapper">
            <div class="nav no-scrollbar" @scroll="handleScroll">
              <button
                v-for="(category, index) in categories"
                :key="index"
                :class="categoryTitleClass(index)"
                @click="setActiveCategory(index)"
              >
                {{ category.category }}
              </button>
            </div>
            <div class="nav-overlay nav-overlay--left" v-if="!isAtStart"></div>
            <div class="nav-overlay nav-overlay--right" v-if="!isAtEnd"></div>
          </div>
          <TasksCategory
            class="tasks-nav"
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            :activeCategory="activeCategory"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.quests
  display: flex
  justify-content: center
  margin: 46px 0 20px 0

.quests-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex

h2, h3
  display: flex
  align-self: start
  color: vars.$c-light-text

  span
    font-size: 14px
    margin-left: 8px

.promo-tasks
  display: flex
  flex-wrap: nowrap
  overflow-x: auto
  overflow-y: hidden
  -webkit-overflow-scrolling: touch
  scroll-behavior: smooth
  scroll-padding: 0
  scroll-snap-type: x mandatory
  width: 100%
  position: relative
  padding-right: 20px

  & > *:last-child
    flex: 0 0 calc(100% + 20px)

.quests-list
  display: flex
  margin-top: 15px
  flex-direction: column
  align-items: center
  width: 95%
  gap: 20px

.promo-tasks-wrapper
  width: 100%
  overflow-x: scroll

.promo-tasks
  display: flex
  justify-content: start
  align-self: start
  gap: 10px

.regular-tasks
  height: fit-content
  border-radius: 12px
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  margin-top: 20px

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

.nav-overlay--left
  left: 0
  background: vars.$c-gradient-nav-right

.nav-overlay--right
  right: 0
  background: vars.$c-gradient-nav-left

.nav
  display: flex
  gap: 20px
  overflow-x: scroll

hr
  border: 1px solid vars.$c-dark-element
  margin: 10px 0

.tasks-nav
  display: flex
  position: relative

.category-title, .category-title--active
  font-size: 18px
  font-weight: 500
  white-space: nowrap
  color: vars.$c-light-text
  opacity: 50%
  line-height: 24.6px

  padding: 0 5px 0 0

.category-title--active
  font-weight: 700
  opacity: 100%
</style>
