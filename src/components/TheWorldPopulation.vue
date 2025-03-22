<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import { eventBus } from "@/event_bus/eventBus";
import axios from "axios";
import { worldPopulationStore } from "@/store/world-population";
import router from "@/router";
import { useI18n } from "vue-i18n";
import type {Population} from "@/types/types.ts";
const { t, locale } = useI18n();
const population = computed(() => populationStore.worldPopulation)
const populationStore = worldPopulationStore();

const fetchPopulation = async () => {
  try {
    await populationStore.getWorldPopulation()
  } catch (error) {
    eventBus.emit("showErrorPopup", error.message);
  }
}

onMounted(async () => {
  eventBus.emit("toggleHeaderBackBtnVisibility", true);
  await fetchPopulation()
});

onBeforeUnmount(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", false);
});

const formatNumber = (num: number | undefined) => {
  return num ? num.toLocaleString("ru-RU") : "0";
};
</script>

<template>
  <section class="world-population-section">
    <div class="container">
      <div class="world-population-content">
        <h2>World Population</h2>
        <div class="stats-list">
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.population) }}</p>
            <p class="hint">Current World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.births_year) }}</p>
            <p class="hint">Births this year</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.births_today) }}</p>
            <p class="hint">Births today</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.deaths_year) }}</p>
            <p class="hint">Deaths this year</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.deaths_today) }}</p>
            <p class="hint">Deaths today</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.net_population_growth_year) }}</p>
            <p class="hint">Net population growth this year</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">{{ formatNumber(population?.net_population_growth_today) }}</p>
            <p class="hint">Net population growth today</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
.world-population-section
  display: flex
  justify-content: center
  align-items: center
  margin-top: 46px
  width: 100%
  color: white

.world-population-content
  display: flex
  flex-direction: column
  justify-content: center
  align-items: start
  width: 100%

  h2
    font-size: 27px
    margin-bottom: 46px

  .stats-list
    display: flex
    flex-direction: column
    width: 100%
    align-items: start

    hr
      margin: 12px 0
      border: 1px solid rgba(247, 247, 247, 0.05)
      width: 100%

    .stats-item
      display: flex
      flex-direction: column
      gap: 12px
      align-items: start

      .title
        font-size: 14px
        font-weight: 600

      .hint
        opacity: 60%
        font-size: 12px
        font-weight: 400
</style>
