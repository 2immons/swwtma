<script setup lang="ts">
import QuestItem from "@/components/tasks/TaskItem.vue";
import { questsStore } from "@/store/quests";
import { computed, onMounted, ref } from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";
import PromoTask from "@/components/tasks/PromoTask.vue";
import TasksCategory from "@/components/tasks/TasksCategory.vue";
import MiningSelect from "@/components/mining/MiningSelect.vue";
import CardsList from "@/components/mining/CardsList.vue";

const miningType = ref()

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

const availableTasks = ref(10);

const isPromoQuests = ref(false);
const isWeeklyQuests = ref(false);

const questsStoreInstance = questsStore();

const promoTasks = computed(() => {
  return questsStoreInstance.promoTasks;
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
          {{ t("mining") }}
        </h2>
        <MiningSelect
            :modelValue="miningType"
            @update:modelValue="miningType = $event"
        />
        <div class="regular-tasks">
          <CardsList />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
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
  color: $c-light-text

  span
    font-size: 30px
    margin-left: 8px
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
  background: $c-gradient-nav-right

.nav-overlay--left
  left: 0
  background: $c-gradient-nav-right

.nav-overlay--right
  right: 0
  background: $c-gradient-nav-left

.nav
  display: flex
  gap: 20px
  overflow-x: scroll

hr
  border: 1px solid $c-dark-element
  margin: 10px 0

.tasks-nav
  display: flex
  position: relative

.category-title, .category-title--active
  font-size: 18px
  font-weight: 500
  white-space: nowrap
  color: $c-light-text
  opacity: 50%
  line-height: 24.6px

  padding: 0 5px 0 0

.category-title--active
  font-weight: 700
  opacity: 100%
</style>
