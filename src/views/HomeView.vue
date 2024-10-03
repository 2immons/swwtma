<template>
  <PageHeader />
  <main>
    <StatsSection />
    <EarthSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import StatsSection from "@/components/StatsSection.vue";
import EarthSection from "@/components/EarthSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 43px
</style>
