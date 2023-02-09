<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { APIAuthLogin, APIAuthAuthcode } from "@/api/login/login"
import {
  useMessage,
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  NButton,
  NCard,
} from "naive-ui"
import { useRouter } from "vue-router"

interface ModelType {
  account: string | null
  password: string | null
  capcode: string | null
}

export default defineComponent({
  name: "LoginPage",
  components: {
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NButton,
    NCard,
  },
  setup() {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const loginLoading = ref<boolean>(false)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      account: null,
      password: null,
      capcode: null,
    })
    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }
    const rules: FormRules = {
      account: [
        {
          required: true,
          message: "请输入密码",
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: ["input", "blur"],
        },
      ],
      capcode: [
        {
          required: true,
          message: "请输入验证码",
          trigger: ["input", "blur"],
        },
      ],
    }
    window.$message = useMessage()
    const router = useRouter()
    const capCodeImg = ref<any>("")
    onMounted(() => {
      method.getCapCode()
    })
    const method = {
      login(): void {
        loginLoading.value = true
        APIAuthLogin({
          account: modelRef.value.account as string,
          password: modelRef.value.password as string,
          VerificationCode: modelRef.value.capcode as string,
        }).then((res) => {
          if (res.code === 0 && res.data.token) {
            window.localStorage.setItem("NestJS_Token", res.data.token)
            window?.$message.success("登录成功")
            setTimeout(() => {
              router.push("/index")
            }, 300)
          }
          loginLoading.value = false
        })
      },
      getCapCode() {
        APIAuthAuthcode({}).then((res) => {
          capCodeImg.value = res
          console.log("res", res)
        })
      },
    }
    return {
      ...method,
      formRef,
      capCodeImg,
      rPasswordFormItemRef,
      model: modelRef,
      loginLoading,
      rules,
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            method.login()
          } else {
            // console.log(errors)
          }
        })
      },
    }
  },
})
</script>

<template>
  <div class="login_wrap">
    <n-card title="LoginCard" hoverable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="account" label="账号">
          <n-input v-model:value="model.account" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="capcode" label="图片验证码">
          <n-input
            v-model:value="model.capcode"
            type="text"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="12">
            <n-popover trigger="hover">
              <template #trigger>
                <div
                  class="codesrap"
                  @click="getCapCode"
                  v-html="capCodeImg"
                ></div>
              </template>
              <span>点击重新获取图片验证码</span>
            </n-popover>
          </n-col>
          <n-col :span="12">
            <div class="cardfooter">
              <n-button
                :disabled="
                  model.account === null ||
                  model.password === null ||
                  model.capcode === null
                "
                type="info"
                :loading="loginLoading"
                @click="handleValidateButtonClick"
              >
                登录/注册
              </n-button>
              <!-- <n-button
                :disabled="model.account === null || model.password === null"
                type="info"
                :loading="loginLoading"
                @click="handleValidateButtonClick"
              >
                注册
              </n-button> -->
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>

<style lang="scss" scoped>
.login_wrap {
  width: 100%;
  height: 100%;
  .codesrap {
    width: 100px;
    height: 34px;
    // img {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  .n-card {
    max-width: 400px;
    margin-left: 65vw;
    margin-top: 25vh;
    cursor: pointer;
  }
  .cardfooter {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
