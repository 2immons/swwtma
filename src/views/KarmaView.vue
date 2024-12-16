<template>
  <PageHeader />
  <main>
    <KarmaSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/layout/TheHeader.vue";
import PageFooter from "@/components/layout/TheFooter.vue";
import MiningSection from "@/components/mining/MiningSection.vue";
import KarmaSection from "@/components/karma/KarmaSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
