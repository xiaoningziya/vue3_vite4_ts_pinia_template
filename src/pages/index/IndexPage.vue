<script lang="ts">
import { h, ref, defineComponent } from "vue"
import { darkTheme, NConfigProvider, NButton, NCard, NSpace } from "naive-ui"
import type { GlobalTheme } from "naive-ui"
import { NIcon, NLayout, NLayoutSider, NMenu } from "naive-ui"
import type { MenuOption } from "naive-ui"
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5"

export default defineComponent({
  name: "IndexPage",
  components: {
    NLayout,
    NLayoutSider,
    NMenu,
    NSpace,
  },
  setup() {
    const menuOptions: MenuOption[] = [
      {
        label: "NestJS 提供服务",
        key: "NestJS",
        children: [
          {
            type: "group",
            label: "MySql",
            key: "MySql",
            children: [
              {
                label: "注册表",
                key: "user",
              },
              {
                label: "登录表",
                key: "user_token",
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
              },
            ],
          },
        ],
      },
    ]
    return {
      theme: ref<GlobalTheme | null>(null),
      darkTheme,
      collapsed: ref(false),
      menuOptions,
      renderMenuLabel(option: MenuOption) {
        if ("href" in option) {
          return h(
            "a",
            { href: option.href, target: "_blank" },
            option.label as string
          )
        }
        return option.label as string
      },
      renderMenuIcon(option: MenuOption) {
        // 渲染图标占位符以保持缩进
        // if (option.key === "sheep-man") return true
        // 返回 falsy 值，不再渲染图标及占位符
        // if (option.key === "food") return null
        return h(NIcon, null, { default: () => h(BookmarkOutline) })
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
            :default-expand-all="true"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
        <n-layout class="main_content">
          <span>内容</span>
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
.n-layout,
.main_content {
  height: 100vh;
}
</style>
