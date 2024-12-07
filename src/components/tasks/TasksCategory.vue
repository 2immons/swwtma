<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";

// Определение интерфейсов
interface Task {
  id: number;
  title: string;
  url: string;
  status: string, // VERIFYING, NOT_STARTED, COMPLETED, CLAIMED
}

interface Category {
  cat_id: number;
  title: string;
  tasks: Task[];
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
    v-if="props.activeCategory === props.category.cat_id"
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
