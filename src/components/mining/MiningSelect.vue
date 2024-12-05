<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { eventBus } from "@/event_bus/eventBus";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const selectType = (type: string) => {
  if (type === "mining") {
    gameBtnClass.value = "inactive-btn";
    miningBtnClass.value = "active-btn";
    eventBus.emit("toggleFooterVisibility", true);
  } else if (type === "game") {
    miningBtnClass.value = "inactive-btn";
    gameBtnClass.value = "active-btn";
    eventBus.emit("toggleFooterVisibility", false);
  }
  emit("update:modelValue", type);
};

const miningBtnClass = ref("active-btn");
const gameBtnClass = ref("inactive-btn");
</script>

<template>
  <div class="select-wrapper">
    <button :class="miningBtnClass" @click="selectType('mining')">
      Mining
    </button>
    <button :class="gameBtnClass" @click="selectType('game')">Games</button>
  </div>
</template>

<style scoped lang="sass">
@import "../../styles/variables"
.select-wrapper
  position: relative
  background: #FFFFFF0D
  border-radius: 70px
  height: 40px
  width: 100%
  margin-top: 46px
  display: grid
  grid-template-columns: 1fr 1fr

  button
    color: white
    z-index: 10
    opacity: 50%

  .active-btn
    color: $c-main-text
    opacity: 100%
    background: #FBFBFB
    width: 100%
    border-radius: 70px
</style>
