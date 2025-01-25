<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script>

<template>
  <m-collapse v-model="activeNames">
    <m-collapse-item title="Champage Problem" name="1">
      <div>
        One for the Money, Two for the Show,I never was ready so I watch you go.
      </div>
    </m-collapse-item>
    <m-collapse-item title="All To Well" name="2">
      <div>
        And you were tossing me the car keys, Fuck the patriarchy Keychain on the ground
      </div>
    </m-collapse-item>
    <m-collapse-item title="Fortnight" name="3">
      <div>
        I was suppose to be sent away but they forgot to come and get me
      </div>
    </m-collapse-item>
    <m-collapse-item title="Enchanted" name="4">
      <div>
        Please don't be in love with someone else, please don't have somebody waiting on you
      </div>
    </m-collapse-item>
  </m-collapse>
</template>
