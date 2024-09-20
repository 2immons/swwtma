<template>
  <PageHeader />
  <main>
    <QuestsList />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import QuestsList from "@/components/QuestsList.vue";
</script>

<style lang="sass">
main
  flex: 1
</style>
