<script setup lang="ts">
import {computed, defineProps, ref} from "vue";
import {questsStore} from "@/store/tasks";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {TaskAction, TaskBaseSchema} from "@/types/types";
import {telegramStore} from "@/store/telegram.ts";

const { t, locale } = useI18n();

const tasksStoreInstance = questsStore();

const props = defineProps<{
  task: TaskBaseSchema;
  isPromoTask: boolean;
}>();

const { categories } = storeToRefs(tasksStoreInstance);

const task = computed((): TaskBaseSchema => {
  const category = categories.value.find((currentCategory) =>
    currentCategory.tasks.some(
      (currentTask) => currentTask.id === props.task.id,
    ),
  );
  const foundTask = category?.tasks.find(
    (currentTask) => currentTask.id === props.task.id,
  );
  return foundTask || props.task;
});

// const acceptPromoTask = async () => {
//   try {
//     window.open(task.value.url, "_blank");
//     tasksStoreInstance.acceptPromoTask(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

// const acceptTask = async () => {
//   try {
//     window.open(task.value.url, "_blank");
//     tasksStoreInstance.completeTask(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

// const claimReward = async () => {
//   try {
//     tasksStoreInstance.claimReward(task.value);
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// };

const telegramStoreInstance = telegramStore();

const setupStory = () => {
  const lang = telegramStoreInstance.userData.language;
  let mediaUrl = "";
  if (lang === "ru") {
    mediaUrl = "https://hash-seeker.com/public/bot/story_ru.png";
  } else {
    mediaUrl = "https://hash-seeker.com/public/bot/story_en.png";
  }

  const params = {
    text: "Join now! https://t.me/HashSeekerBot",
  };

  telegramStoreInstance.telegramWebApp.shareToStory(mediaUrl, params);
};

const isTaskVerifying = ref(false);
const isTaskReady = ref(false);

const startTask = async () => {
  isTaskReady.value = true;
  switch (props.task.action) {
    case TaskAction.redirect_tg:
      redirectToTelegramLink();
      break;
    case TaskAction.tg_subscription_check:
      redirectToTelegramLink();
      break;
    case TaskAction.redirect_other:
      redirectToOtherLink();
      break;
    case TaskAction.tg_story:
      setupStory();
      break;
  }
};
const redirectToTelegramLink = () => {
  if (props.task.url) {
    telegramStoreInstance.telegramWebApp.openTelegramLink(props.task.url);
  } else {
    console.error("Ссылка отсутствует");
  }
};

const redirectToOtherLink = () => {
  if (props.task.url) {
    window.open(props.task.url, "_blank");
  } else {
    console.error("Ссылка отсутствует");
  }
};

const completeTask = async () => {
  isTaskReady.value = false;
  isTaskVerifying.value = true;
  const isTaskValid = await tasksStoreInstance.completeTask(props.task.id)
  isTaskVerifying.value = false;
  if (isTaskValid) {
    const task = tasksStoreInstance.soloTasks.find((task) => task.id === props.task.id)
    if (task) {
      task.is_done = true;
    }
  } else {
    //
  }
}

</script>

<template>
  <div class="task-item">
    <div class="left-side">
      <img src="../../assets/svg/tasks/battery.svg" alt="" />
      <div class="info">
        <p>{{ task.name }}</p>
      </div>
    </div>
    <div class="right-side">
      <div class="income">
        <p>+ 699</p>
        <img src="../../assets/svg/stats/green-coin.svg" alt="" />
      </div>
      <div class="loader-wrapper" v-if="isTaskVerifying">
        <div class="loader"></div>
      </div>
      <button
          @click="startTask"
          v-else-if="!isTaskVerifying && !task.is_done && !isTaskReady"
          class="start-btn"
      >
        {{ t("accept-task") }}
      </button>
      <div class="claimed-wrapper" v-else-if="task.is_done">
        <img src="../../assets/svg/v-icon.svg" alt="" />
      </div>
      <button
        @click="completeTask"
        v-else-if="isTaskReady"
        class="claim-btn"
      >
        {{ t("claim-task") }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.task-item
  padding: 20px 17px
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%
  height: fit-content
  color: vars.$c-light-text
  background: vars.$c-task-item-bg
  border: 1px solid vars.$c-border-color
  border-radius: 18px
  gap: 12px

  .left-side
    display: flex
    gap: 21px
    width: 90%

  .right-side
    display: flex
    width: 10%
    justify-content: space-between
    min-width: 110px

  .info
    flex: 1
    display: flex
    gap: 12px

    p
      font-size: 13px
      font-weight: 600

    @media (max-width: 360px)
      p
        font-size: 12px

    @media (max-width: 345px)
      p
        font-size: 11px

    @media (max-width: 338px)
      p
        font-size: 10px

  .income
    display: flex
    align-items: center
    justify-content: center
    gap: 3px
    opacity: 60%

    p
      font-size: 12px
      font-weight: 600
      line-height: 16.39px
      text-align: left
      white-space: nowrap

    img
      height: 12px

  h3
    font-size: 14px
    font-weight: 600
    line-height: 19.12px
    text-align: left

  p
    font-size: 18px
    text-align: start
    display: -webkit-box
    -webkit-line-clamp: 4
    -webkit-box-orient: vertical
    overflow: hidden
    text-overflow: ellipsis

  button
    display: flex
    align-items: center
    justify-content: center
    padding: 5px 14px
    width: fit-content
    border-radius: 50px
    font-size: 10px
    font-weight: bold
    backdrop-filter: blur(2px)
    gap: 3px

  .start-btn
    background: #FFFFFF1A
    color: white

  .claim-btn
    background: vars.$c-light-element
    color: vars.$c-main-text

  .claimed-wrapper
    height: 25px
    display: flex
    align-items: center
    justify-content: center
    padding: 0 14px
    border-radius: 50px
    backdrop-filter: blur(2px)
    background: rgba(34, 240, 125, 0.2)

  .loader-wrapper
    height: 25px
    padding: 4px
    background: #FFFFFF1A
    border: 1px solid vars.$c-border-color
    border-radius: 50px

    .loader
      height: 100%
      border: 3px solid #FFFFFF52
      border-top: 3px solid #FFFFFFDE
      border-radius: 50%
      aspect-ratio: 1
      animation: spin 1s linear infinite

      @keyframes spin
        from
          transform: rotate(0deg)
        to
          transform: rotate(360deg)
</style>
