<template>
  <PageHeader />
  <main>
    <TasksSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import TasksSection from "@/components/tasks/TasksSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 43px
</style>
