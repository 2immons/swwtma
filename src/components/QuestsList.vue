<script setup lang="ts">
import QuestItem from "@/components/QuestItem.vue";
</script>

<template>
  <div class="quests">
    <div class="container">
      <div class="quests-content">
        <h2>Quests</h2>
        <div class="quests-list">
          <QuestItem />
          <QuestItem />
          <QuestItem />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.quests
  display: flex
  justify-content: center
.quests-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex
.quests-list
  display: flex
  flex-direction: column
  align-items: center
  width: 90%
  gap: 20px
</style>
