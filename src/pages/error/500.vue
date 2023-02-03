<script lang="ts">
import { defineComponent } from "vue"
import { NMessageProvider, useMessage } from "naive-ui"

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Error500",
  // setup() {
  //   window.$message = useMessage()
  // },
})
</script>

<template>
  <div>
    <h1>500</h1>
    <h2>服务崩溃了</h2>
  </div>
</template>
