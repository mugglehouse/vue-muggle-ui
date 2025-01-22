<script setup>
import { ref } from 'vue'

const active = ref(0)
function nextStep() {
  active.value++
  if (active.value > 4)
    active.value = 0
}
</script>

<template>
  <div>
    <m-steps :active="active">
      <m-step title="first" description="变形课" />
      <m-step title="second" description="魔药课" />
      <m-step title="third" description="神奇动物保护课" />
      <m-step title="fourth" description="飞行课" />
      <m-step title="fifth" description="黑魔法防御课" />
    </m-steps>
    <br>
    <m-button type="primary" size="mini" @click="nextStep">
      next
    </m-button>
  </div>
</template>

<style scoped>

</style>
