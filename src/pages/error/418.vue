<script lang="ts">
import { defineComponent } from "vue"
import { NMessageProvider, useMessage } from "naive-ui"

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Error418",
  // setup() {
  //   window.$message = useMessage()
  // },
})
</script>

<template>
  <div class="xy-center">
    <n-result status="418" title="418 我是个杯具" description="一切尽在不言中">
      <template #footer>
        <n-button>接受真相就是这么简单</n-button>
      </template>
    </n-result>
  </div>
</template>
<style scoped>
.xy-center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70%;
}
</style>
