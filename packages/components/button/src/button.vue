<script setup>
import { props } from './button'

defineProps(props)
</script>

<template>
  <button
    class="m-button"
    :class="[
      `m-button__${type}`,
      `${size && `m-button--${size}`}`, // 若size存在，则返回`p-button--${size}`，否则返回空字符串
      { 'm-button--icon': icon }, // 若icon有值，则为true
      { 'is-plain': plain },
      { 'is-round': round },
      { 'is-disabled': disabled },
    ]"
  >
    <i
      v-if="icon" class="m-icon" :class="[
        `icon-${icon}`,
      ]"
    />
    <slot />
  </button>
</template>
