<script setup lang="ts">
import { ref, version as vueVersion } from 'vue'
// import { AInput } from 'ant-design-vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-input v-model="msg" />

  <p></p>
</template>
