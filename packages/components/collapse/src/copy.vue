<script setup>
import { computed, provide } from 'vue'
import { Props } from './collapse'

const props = defineProps(Props)

const emit = defineEmits(['update:modelValue', 'change'])
const opened = computed(() => props.modelValue)
const accordion = computed(() => props.accordion)

function change(newSelected) {
  emit('update:modelValue', newSelected)
}
provide('opened', opened)
provide('change', change)
provide('accordion', accordion)
</script>

<template>
  <div class="m-collapse">
    <slot />
  </div>
</template>

<style scoped>
</style>
