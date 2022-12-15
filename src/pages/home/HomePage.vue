<script lang="ts">
import { ref } from "vue"
const count = ref(0)
// eslint-disable-next-line no-console
console.log("VITE_APP_WEB_URL", import.meta.env.VITE_APP_WEB_URL)
</script>

<template>
  <h1>home.vue</h1>
</template>

<style lang="scss" scoped>
h1 {
  color: $test-color;
}
</style>
