<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";
import { type TaskBaseSchema } from "@/types/types";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
// Определение интерфейсов
interface Task {
  id: number;
  title: string;
  url: string;
  status: string; // VERIFYING, NOT_STARTED, COMPLETED, CLAIMED
}

interface Category {
  category: string;
  index: number;
  tasks: TaskBaseSchema[];
}

const props = defineProps<{
  activeCategory: number;
  category: Category;
}>();

const emit = defineEmits(["clicked"]);
</script>

<template>
  <div
    class="task-category__tasks"
    v-if="props.activeCategory === props.category.index"
  >
    <TaskItem
      class="task-category__task"
      v-for="(task, index) in props.category.tasks"
      :key="index"
      :task="task"
      :isPromoTask="false"
    />
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.task-category
  position: relative

.task-category__tasks
  position: absolute
  display: flex
  flex-direction: column
  width: 100%
  gap: 10px

.task-category__task
  display: flex
</style>
