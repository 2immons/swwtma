<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { questsStore } from "@/store/quests";
const questsStoreInstance = questsStore();

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const selectType = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <div class="select-wrapper">
    <button class="active-btn">Mining</button>
    <button>Games</button>
    <div class="active-btn-bg"></div>
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

  .active-btn-bg
    inset: 0
    position: absolute
    height: 100%
    width: 50%
    border-radius: 70px
    background: #FBFBFB
</style>
