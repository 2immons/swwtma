<template>
  <qrcode-vue
      :value="props.qrLink"
      :level="level"
      :render-as="renderAs"
      :background="background"
      :foreground='foreground'
      :margin="margin"
      :gradient="gradient"
      :gradient-type="gradientType"
      :gradient-start-color="gradientStartColor"
      :gradient-end-color="gradientEndColor"
      :image-settings='imageSettings'
      :size="props.size"
  />
</template>
<script setup lang="ts">
import {defineProps, ref} from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs, GradientType, ImageSettings } from 'qrcode.vue'

const props = defineProps<{
  qrLink: string;
  size: number;
}>();

const level = ref<Level>('M')
const renderAs = ref<RenderAs>('svg')
const background = ref('#151715')
const foreground = ref('#ffffff')
const margin = ref(1)

const imageSettings = ref<ImageSettings>({
  src: 'https://github.com/scopewu.png',
  width: 34,
  height: 34,
  x: 7,
  y: 7,
  excavate: true,
})

const gradient = ref(true)
const gradientType = ref<GradientType>('linear')
const gradientStartColor = ref('#ffffff')
const gradientEndColor = ref('#c2f8b9')
</script>

<style scoped lang="sass">

</style>