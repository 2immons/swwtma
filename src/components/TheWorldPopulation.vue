<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { eventBus } from "@/event_bus/eventBus";

onMounted(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", true)
});
onBeforeUnmount(() => {
  eventBus.emit("toggleHeaderBackBtnVisibility", false)
});
</script>

<template>
  <section class="world-population-section">
    <div class="container">
      <div class="world-population-content">
        <h2>World Population</h2>
        <div class="stats-list">
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
          </div>
          <hr />
          <div class="stats-item">
            <p class="title">65666444</p>
            <p class="hint">Total World Population</p>
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