<script setup lang="ts">
import { questsStore } from "@/store/tasks";
import { computed, onMounted, ref } from "vue";
import MiningSelect from "@/components/mining/MiningSelect.vue";
import CardsList from "@/components/mining/CardsList.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import GameSection from "@/components/game/GameSection.vue";

const miningType = ref("mining");
</script>

<template>
  <section class="quests">
    <div class="container">
      <div class="quests-content">
        <h2>
          {{ t("mining") }}
        </h2>
        <MiningSelect
          :modelValue="miningType"
          @update:modelValue="miningType = $event"
        />
        <div class="regular-tasks" v-if="miningType === 'mining'">
          <CardsList />
        </div>
        <div class="game" v-else-if="miningType === 'game'">
          <GameSection />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "@/styles/variables" as vars

.quests
  display: flex
  justify-content: center
  margin: 46px 0 20px 0

.quests-content
  width: 100%
  align-items: center
  flex-direction: column
  display: flex

h2, h3
  display: flex
  align-self: start
  color: vars.$c-light-text

  span
    font-size: 30px
    margin-left: 8px

.quests-list
  display: flex
  margin-top: 15px
  flex-direction: column
  align-items: center
  width: 95%
  gap: 20px

.promo-tasks-wrapper
  width: 100%
  overflow-x: scroll

.promo-tasks
  display: flex
  justify-content: start
  align-self: start
  gap: 10px

.regular-tasks
  height: fit-content
  border-radius: 12px
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  margin-top: 20px

.game
  width: 100%
  margin-top: 20px
  height: 350px

.nav-wrapper
  position: relative
  width: 100%
  height: 58px
  display: flex

.nav-overlay
  position: absolute
  top: 0
  bottom: 0
  width: 128px
  height: 100%
  pointer-events: none
  background: vars.$c-gradient-nav-right

.nav-overlay--left
  left: 0
  background: vars.$c-gradient-nav-right

.nav-overlay--right
  right: 0
  background: vars.$c-gradient-nav-left

.nav
  display: flex
  gap: 20px
  overflow-x: scroll

hr
  border: 1px solid vars.$c-dark-element
  margin: 10px 0

.tasks-nav
  display: flex
  position: relative

.category-title, .category-title--active
  font-size: 18px
  font-weight: 500
  white-space: nowrap
  color: vars.$c-light-text
  opacity: 50%
  line-height: 24.6px

  padding: 0 5px 0 0

.category-title--active
  font-weight: 700
  opacity: 100%
</style>
