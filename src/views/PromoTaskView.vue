<template>
  <PageHeader />
  <main>
    <PromoTaskSection :promoTaskID="promoTaskID" />
  </main>
  <PageFooter />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/layout/TheHeader.vue";
import PageFooter from "@/components/layout/TheFooter.vue";
import PromoTaskSection from "@/components/tasks/PromoTaskSection.vue";

import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();

const promoTaskID = ref(route.params.promo_task_id);

onMounted(() => {
  console.log(route.params.promo_task_id);
});
</script>

<style lang="sass">
main
  flex: 1
  margin-bottom: 120px
</style>
