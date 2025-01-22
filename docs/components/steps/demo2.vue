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
      <m-step icon="smile" title="first" description="起床" />
      <m-step icon="electronics" title="second" description="工作" />
      <m-step icon="customer-service" title="third" description="听歌" />
      <m-step icon="work" title="fourth" description="下班" />
      <m-step icon="hide" title="fifth" description="睡觉" />
    </m-steps>
    <br>
    <m-button type="primary" size="mini" @click="nextStep">
      next
    </m-button>
  </div>
</template>

<style scoped>

</style>
