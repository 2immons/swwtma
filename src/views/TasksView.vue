<template>
  <PageHeader />
  <main>
    <TasksSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/layout/TheHeader.vue";
import PageFooter from "@/components/layout/TheFooter.vue";
import TasksSection from "@/components/tasks/TasksSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
