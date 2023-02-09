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
  <div class="xy-center">
    <n-result
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
    >
      <template #footer>
        <n-button>放轻松</n-button>
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
