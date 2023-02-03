<script lang="ts">
import { defineComponent } from "vue"
import { NMessageProvider, useMessage } from "naive-ui"

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Error404",
  // setup() {
  //   window.$message = useMessage()
  // },
})
</script>

<template>
  <div>
    <h1>404</h1>
    <h2>您访问的页面不存在</h2>
  </div>
</template>
