<script setup>
import { computed, provide } from 'vue'
import { Props } from './collapse'

const props = defineProps(Props)
const opened = defineModel()
const accordion = computed(() => props.accordion)
provide('opened', opened)
provide('accordion', accordion)
</script>

<template>
  <div class="m-collapse">
    <slot />
  </div>
</template>

<style scoped>
</style>
