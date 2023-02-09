<script lang="ts">
import { h, ref, defineComponent } from "vue"
import { RouterView } from "vue-router"
import {
  darkTheme,
  NConfigProvider,
  NButton,
  NCard,
  NSpace,
  useMessage,
} from "naive-ui"
import type { GlobalTheme } from "naive-ui"
import { NIcon, NLayout, NLayoutSider, NMenu } from "naive-ui"
import type { MenuOption } from "naive-ui"
import {
  BookmarkOutline,
  CaretDownOutline,
  PersonAddOutline,
  DocumentTextOutline,
  CubeOutline,
} from "@vicons/ionicons5"
import router from "@/router"
import { APILoginOut } from "@/api/login/login"

export default defineComponent({
  name: "IndexPage",
  components: {
    NLayout,
    NLayoutSider,
    NMenu,
    NSpace,
    RouterView,
    NCard,
  },
  setup() {
    window.$message = useMessage()
    const menuOptions: MenuOption[] = [
      {
        label: "NestJS 提供服务",
        key: "NestJS",
        setIcon: BookmarkOutline,
        children: [
          {
            type: "group",
            label: "MySql",
            key: "MySql",
            children: [
              {
                label: "注册表",
                key: "user",
                path: "/index/UserRegister",
                setIcon: PersonAddOutline,
              },
              {
                label: "登录表",
                key: "user_token",
                path: "/index/UserToken",
                setIcon: DocumentTextOutline,
              },
            ],
          },
          {
            type: "group",
            label: "Redis",
            key: "Redis",
            children: [
              {
                label: "登录表",
                key: "redis_0",
                path: "/index/RedisLogin",
                setIcon: CubeOutline,
              },
            ],
          },
        ],
      },
    ]
    const DefaultKey = ref<string>("user")
    const UserValue = ref("")
    const UserOptions: Array<{
      label: string
      value: string
    }> = [
      {
        label: "退出登录",
        value: "LoginOut",
      },
    ]
    const Methods = {
      userLoginOut() {
        APILoginOut({}).then((res) => {
          if (res.code === 0) {
            window.$message.info("用户退出，前往登录页面~")
            setTimeout(() => {
              router.push("/login")
            }, 800)
          }
        })
      },
      PopUserUpdate(value: any) {
        if (value === "LoginOut") {
          Methods.userLoginOut()
        }
      },
    }
    const onUpdateMenu = (key: string, item: MenuOption): void => {
      // console.log(111, key, item)
    }

    return {
      ...Methods,
      DefaultKey,
      UserValue,
      UserOptions,
      onUpdateMenu,
      theme: ref<GlobalTheme | null>(null),
      darkTheme,
      collapsed: ref(false),
      menuOptions,
      renderMenuLabel(option: MenuOption) {
        return h(
          "div",
          {
            onClick: (event: any) => {
              event?.stopPropagation()
              DefaultKey.value = option.key as string
              router.push(option.path as string)
            },
            // href: option.href, target: "_blank"
          },
          option.label as string
        )
      },
      renderMenuIcon(option: MenuOption) {
        // 渲染图标占位符以保持缩进
        // if (option.key === "sheep-man") return true
        // 返回 falsy 值，不再渲染图标及占位符
        // if (option.key === "food") return null
        return h(NIcon, null, {
          default: () => h(option.setIcon || BookmarkOutline),
        })
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) })
      },
    }
  },
})
</script>

<template>
  <div class="index_wrap">
    <n-space vertical>
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
      <!-- <n-switch v-model:value="collapsed" /> -->
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :height="1000"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            v-model:value="DefaultKey"
            :default-expand-all="true"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
            @on-update:value="onUpdateMenu"
          />
        </n-layout-sider>
        <n-layout class="main_content">
          <n-card hoverable class="card_main">
            <router-view></router-view>
          </n-card>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: $test-color;
}
.index_wrap {
  height: 100%;
}

.n-space {
  height: 100%;
}
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
.n-layout,
.main_content {
  height: calc(100vh - 80px);
  box-sizing: border-box;
  background: #f8f8f8;
}
.card_main {
  padding: 16px;
  // margin: 6px;
  margin-left: 16px;
  margin-right: 10px;
  width: calc(100% - 26px);
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
