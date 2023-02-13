<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue"
// import NestToken from "@/common/token"
import { useMainStore } from "@/store/main"
import {
  APIAuthLogin,
  APIAuthAuthcode,
  APIUserRegister,
  APIAuthComparecode,
} from "@/api/login/login"
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
  account: string
  password: string
  capcode: string
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
    const MainStore = useMainStore()
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const submitLoading = ref<boolean>(false)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      account: "",
      password: "",
      capcode: "",
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
    const capCodeImg = ref<string>("")
    const capCodeKey = ref<string>("")
    const PageType = ref<number>(1)
    onMounted(() => {
      Methods.getCapCode()
    })
    watch(PageType, () => {
      Methods.getCapCode()
      Methods.resetForm()
    })
    const Methods = {
      resetForm() {
        modelRef.value.account = ""
        modelRef.value.password = ""
        modelRef.value.capcode = ""
      },
      changeType(val: number) {
        PageType.value = val
      },
      testCode() {
        submitLoading.value = true
        APIAuthComparecode({
          VerificationKey: capCodeKey.value,
          VerificationCode: modelRef.value.capcode as string,
        }).then((res) => {
          submitLoading.value = false
          if (res.code === 0) {
            PageType.value === 1 ? Methods.login() : Methods.register()
          } else {
            modelRef.value.capcode = ""
            Methods.getCapCode()
          }
        })
      },
      register() {
        submitLoading.value = true
        APIUserRegister({
          account: modelRef.value.account as string,
          password: modelRef.value.password as string,
        }).then((res) => {
          submitLoading.value = false
          if (res.code === 0) {
            window?.$message.success("账号注册完成，请登录")
            setTimeout(() => {
              PageType.value = 1
            }, 300)
          } else {
            Methods.getCapCode()
          }
        })
      },
      login(): void {
        submitLoading.value = true
        APIAuthLogin({
          account: modelRef.value.account as string,
          password: modelRef.value.password as string,
        }).then((res) => {
          submitLoading.value = false
          if (res.code === 0 && res.data.token) {
            // NestToken.setToken(res.data.token)
            MainStore.setToken(res.data.token)
            MainStore.setUserInfo(res.data.userInfo)
            window?.$message.success("登录成功")
            setTimeout(() => {
              router.push("/index")
            }, 300)
          } else {
            Methods.getCapCode()
          }
        })
      },
      getCapCode() {
        APIAuthAuthcode({}).then((res) => {
          if (res.code === 0) {
            capCodeImg.value = res.data.svg
            capCodeKey.value = res.data.key
          }
        })
      },
    }
    return {
      ...Methods,
      PageType,
      formRef,
      capCodeImg,
      rPasswordFormItemRef,
      model: modelRef,
      submitLoading,
      rules,
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            Methods.testCode()
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
    <n-card :title="PageType === 1 ? 'Login' : 'Register'" hoverable>
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
          <n-col :span="8">
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
          <n-col :span="8">
            <n-button
              v-if="PageType === 1"
              quaternary
              type="info"
              @click="changeType(2)"
            >
              还没账号 去注册
            </n-button>
            <n-button v-else quaternary type="info" @click="changeType(1)">
              已有账号 去登录
            </n-button>
          </n-col>
          <n-col :span="8">
            <div class="cardfooter">
              <n-button
                :disabled="
                  model.account === '' ||
                  model.password === '' ||
                  model.capcode === ''
                "
                type="info"
                :loading="submitLoading"
                @click="handleValidateButtonClick"
              >
                {{ PageType === 1 ? "登录" : "注册" }}
              </n-button>
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
