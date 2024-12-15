<template>
  <PageHeader />
  <main>
    <StatsSection v-if="!isWorldPopulationVisible" />
    <EarthSection v-if="!isWorldPopulationVisible" />
    <TheWorldPopulation v-if="isWorldPopulationVisible" />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import PageFooter from "@/components/PageFooter.vue";
import StatsSection from "@/components/StatsSection.vue";
import EarthSection from "@/components/EarthSection.vue";
import TheWorldPopulation from "@/components/TheWorldPopulation.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { eventBus } from "@/event_bus/eventBus";
import router from "@/router";
const isWorldPopulationVisible = ref(false);

onMounted(() => {
  eventBus.on("toggleWorldStatictics", (visible) => {
    isWorldPopulationVisible.value = visible;
  });
  eventBus.on("headerBackBtnPressed", (visible) => {
    isWorldPopulationVisible.value = false;
  });
});

onUnmounted(() => {
  eventBus.off("toggleWorldStatictics");
  eventBus.off("headerBackBtnPressed")
});
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
