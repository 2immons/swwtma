<template>
  <PageHeader />
  <main>
    <SettingsSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import SettingsSection from "@/components/SettingsSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
