<template>
  <PageHeader />
  <main>
    <FriendsSection />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import MainLogo from "@/components/EarthSection.vue";
import PageHeader from "@/components/layout/TheHeader.vue";
import PageFooter from "@/components/layout/TheFooter.vue";
import StatsSection from "@/components/StatsSection.vue";
import FriendsSection from "@/components/friends/FriendsSection.vue";
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
