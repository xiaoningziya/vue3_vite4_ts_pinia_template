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
  <div class="xy-center">
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
      size="large"
    >
      <template #footer>
        <n-button>找点乐子吧</n-button>
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
