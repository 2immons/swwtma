<template>
  <PageHeader />
  <main></main>
  <PageFooter />
</template>

<script lang="ts" setup>
import MainLogo from "@/components/EarthSection.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import StatsSection from "@/components/StatsSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 43px
</style>
