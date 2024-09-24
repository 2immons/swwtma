<script setup lang="ts">
import QuestItem from "@/components/TaskItem.vue";
import { questsStore } from "@/store/quests";
import { computed, ref } from "vue";
import TaskItem from "@/components/TaskItem.vue";
import PromoTask from "@/components/PromoTask.vue";
import TasksCategory from "@/components/TasksCategory.vue";

const availableTasks = ref(10);

const isPromoQuests = ref(false);
const isWeeklyQuests = ref(false);

const questsStoreInstance = questsStore();

const quests = computed(() => {
  return questsStoreInstance.quests;
});

const activeCategory = ref(0);

const categories = computed(() => {
  return questsStoreInstance.categories;
});

const setActiveCategory = (index: number) => {
  activeCategory.value = index;
};

const categoryTitleClass = (index: number) => {
  return index === activeCategory.value
    ? "category-title--active"
    : "category-title";
};
</script>

<template>
  <section class="quests">
    <div class="container">
      <div class="quests-content">
        <h2>
          {{ t("tasks") }} <span>{{ availableTasks }}</span>
        </h2>
        <div class="promo-tasks-wrapper no-scrollbar" v-if="isPromoQuests">
          <div class="promo-tasks">
            <TaskItem
              v-for="(item, index) in quests"
              :key="index"
              :quest="item"
            />
          </div>
        </div>
        <h3 v-if="isWeeklyQuests">
          {{ t("weekly") }}
        </h3>
        <div class="regular-tasks">
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
          <hr />
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
@import "src/styles/variables"
.quests
  display: flex
  justify-content: center
  margin: 20px 0
.quests-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex
h2, h3
  display: flex
  align-self: start
  color: $c-light-text

  span
    font-size: 30px
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
  padding: 10px 10px 20px 10px
  height: fit-content
  background: $c-element-bg
  border-radius: 12px
  box-shadow: $c-element-shadow
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  margin-top: 20px

.nav
  display: flex
  flex-direction: row
  gap: 20px
  width: 100%
  overflow-x: scroll

hr
  border: 1px solid $c-element-bg
  margin: 10px 0

.tasks-nav
  display: flex
  position: relative

.category-title, .category-title--active
  font-size: 20px
  font-weight: 400
  white-space: nowrap
  color: $c-main-text
  padding: 0 5px 0 0

.category-title--active
  font-weight: 700
</style>
