<script lang="ts">
import { defineComponent } from "vue"
import { NMessageProvider, useMessage } from "naive-ui"

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Error401",
  // setup() {
  //   window.$message = useMessage()
  // },
})
</script>

<template>
  <div>
    <h1>401</h1>
    <h2>无权限访问</h2>
  </div>
</template>
