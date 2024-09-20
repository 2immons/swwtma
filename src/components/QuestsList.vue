<script setup lang="ts">
import QuestItem from "@/components/QuestItem.vue";
import { questsStore } from "@/store/quests";
import { computed } from "vue";

const questsStoreInstance = questsStore();

const quests = computed(() => {
  return questsStoreInstance.quests;
});
</script>

<template>
  <section class="quests">
    <div class="container">
      <div class="quests-content">
        <h2>Quests</h2>
        <div class="quests-list">
          <QuestItem
            v-for="(item, index) in quests"
            :key="index"
            :quest="item"
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
h2
  color: $c-light-text
.quests-list
  display: flex
  margin-top: 15px
  flex-direction: column
  align-items: center
  width: 95%
  gap: 20px
</style>
