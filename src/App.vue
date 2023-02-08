<script lang="ts">
import { defineComponent } from "vue"
import { NMessageProvider, useMessage } from "naive-ui"

export default defineComponent({
  name: "LoginPage",
  components: {
    NMessageProvider,
  },
  // setup() {
  //   window.$message = useMessage()
  // },
})
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <router-view></router-view>
    </n-dialog-provider>
  </n-message-provider>
</template>
