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
  <div class="xy-center">
    <n-result
      status="500"
      title="500 服务器错误"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #footer>
        <n-button>散财消灾</n-button>
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
