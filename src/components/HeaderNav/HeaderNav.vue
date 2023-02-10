<script setup lang="ts">
import { APILoginOut } from "@/api/login/login"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useEventBus } from "@vueuse/core"
import NestToken from "@/common/token"

const BUS = useEventBus<string>("EventBus")
const router = useRouter()
const UserOptions: Array<{
  label: string
  value: string
}> = [
  {
    label: "退出登录",
    value: "LoginOut",
  },
  {
    label: "更新密码",
    value: "UpdatePassword",
  },
  {
    label: "设置昵称",
    value: "SetNickname",
  },
  {
    label: "设置头像",
    value: "SetAvatar",
  },
]
const UserValue = ref("")
const userLoginOut = () => {
  APILoginOut({}).then((res) => {
    if (res.code === 0) {
      NestToken.clearToken()
      window.$message.info("用户退出，前往登录页面~")
      setTimeout(() => {
        router.push("/login")
      }, 800)
    }
  })
}
const userUpdatePassword = () => {
  BUS.emit("UpdatePassword")
}
const userSetNickname = () => {
  BUS.emit("SetNickname")
}
const PopUserUpdate = (value: any) => {
  console.log("点击用户菜单", value)
  if (value === "LoginOut") {
    userLoginOut()
    return
  }
  if (value === "UpdatePassword") {
    userUpdatePassword()
    return
  }
  if (value === "SetNickname") {
    userSetNickname()
  }
}
</script>
<template>
  <n-card class="HeaderNav">
    <template #cover>
      <div class="ContentNav">
        <n-popselect
          v-model:value="UserValue"
          :options="UserOptions"
          :on-update:value="PopUserUpdate"
          trigger="click"
        >
          <n-avatar
            bordered
            size="medium"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-popselect>
      </div>
    </template>
  </n-card>
</template>
<style lang="scss" scoped>
.HeaderNav {
  width: 100%;
  height: 60px;
  overflow: hidden;
  .ContentNav {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 24px;
    .n-avatar {
      cursor: pointer;
      border-color: lightseagreen;
    }
  }
}
</style>
