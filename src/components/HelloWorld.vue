<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "LoginPage",
  setup() {
    return {}
  },
})
</script>

<template>
  <h1 class="msg">{{ msg }}</h1>
  <h1 class="count">{{ count }}</h1>
</template>

<style lang="scss" scoped>
.msg {
  color: #888;
  background: $test-color;
}
</style>
