<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import TaskItem from "@/components/tasks/TaskItem.vue";
import { storeToRefs } from "pinia";
import { questsStore } from "@/store/tasks";
import { eventBus } from "@/event_bus/eventBus";
import router from "@/router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const props = defineProps<{
  promoTaskID: number;
}>();

const tasksStoreInstance = questsStore();

const promoTask = tasksStoreInstance.groups[props.promoTaskID];

const emit = defineEmits(["clicked"]);

onMounted(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", true);
  eventBus.on("headerBackBtnPressed", () => {
    router.back();
  });
});

onBeforeUnmount(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", false);
  eventBus.off("headerBackBtnPressed");
});
</script>

<template>
  <section class="promo-task">
    <div class="container">
      <div class="promo-task-content">
        <h2>
          {{ t("promo-tasks") }}
        </h2>
        <div class="task-category__tasks">
          <TaskItem
            class="task-category__task"
            v-for="(task, index) in promoTask.tasks"
            :key="index"
            :task="task"
            :isPromoTask="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.promo-task
  display: flex
  justify-content: center
  margin: 46px 0 20px 0

.promo-task-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex

  h2, h3
    display: flex
    align-self: start
    color: vars.$c-light-text

.task-category__tasks
  height: fit-content
  gap: 10px
  border-radius: 12px
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  margin-top: 20px

.task-category__task
  display: flex
</style>
