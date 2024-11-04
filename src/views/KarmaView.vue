<template>
  <PageHeader />
  <main>
    <KarmaSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import MiningSection from "@/components/mining/MiningSection.vue";
import KarmaSection from "@/components/karma/KarmaSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
