<script lang="ts">
import { h, ref, defineComponent, reactive, onMounted } from "vue"
import {
  DataTableColumns,
  NButton,
  NTag,
  useDialog,
  useMessage,
} from "naive-ui"
import * as API from "@/api/user/user"
import router from "@/router"
type TableRow = {
  no: number
  KEY: string
  VALUE: string
  uuid: string
  account: string
  token: string
}

export default defineComponent({
  name: "RedisCode",
  components: {},
  setup() {
    const createColumns = ({
      offlineUser,
    }: {
      offlineUser: (row: TableRow) => void
    }): DataTableColumns<TableRow> => {
      return [
        {
          title: "序号",
          key: "no",
          fixed: "left",
          render(row, index) {
            return [
              h(
                NTag,
                {
                  type: "info",
                  size: "small",
                },
                {
                  default: () => {
                    const NUM =
                      pagination.pageSize * (pagination.page - 1) + index + 1
                    return `NO.${NUM}`
                  },
                }
              ),
            ]
          },
        },
        {
          title: "KEY",
          key: "KEY",
          minWidth: "80",
        },
        {
          title: "VALUE",
          key: "VALUE",
          minWidth: "80",
        },
      ]
    }
    const tableData = reactive({
      count: 0,
      list: [],
    })
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      itemCount: 0,
    })
    const loading = ref<boolean>(false)
    const Methods = {
      clearCapcode() {
        // loading.value = true
        const params = {}
        API.APIClearCapcodeList(params).then((res) => {
          if (res.code === 0) {
            message.success("已清空图片验证码")
            Methods.getTable()
          }
        })
      },
      getTable() {
        loading.value = true
        const params = {}
        API.APIGetCapcodeList(params).then((res) => {
          if (res.code === 0) {
            const { list, count } = res.data
            tableData.count = count
            tableData.list = list
            pagination.itemCount = count
          }
          loading.value = false
        })
      },
      offlineUser() {
        const params = {
          id: actionUser.content.uuid,
          account: actionUser.content.account,
        }
        API.APIOfflineUser(params).then((res) => {
          if (res.code === 0) {
            message.success(`用户『 ${actionUser.content.account} 』已下线`)
            Methods.getTable()
          }
        })
      },
      onUpdatePage(page: number): void {
        Methods.getTable()
      },
      handleConfirmOffline() {
        dialog.warning({
          title: "提示",
          content: `确定要清空所有图片验证码吗？`,
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            Methods.clearCapcode()
          },
          onNegativeClick: () => {
            // message.error("不确定")
          },
        })
      },
    }
    // watch(pagination, (newVal) => {
    //   console.log("newVal", newVal)
    // })
    onMounted(() => {
      Methods.getTable()
    })
    const actionUser = reactive({
      content: {
        uuid: "",
        account: "",
      },
    })
    const message = useMessage()
    const dialog = useDialog()
    return {
      ...Methods,
      loading,
      tableData,
      columns: createColumns({
        offlineUser(row: TableRow) {
          actionUser.content = row
          // Methods.handleConfirmOffline()
        },
      }),
      pagination: pagination,
    }
  },
})
</script>

<template>
  <div class="RedisCode_wrap">
    <div class="actionHeader">
      <n-button size="small" type="warning" @click="handleConfirmOffline">
        清空图片验证码
      </n-button>
    </div>
    <n-data-table
      :loading="loading"
      :columns="columns"
      :data="tableData.list"
      :pagination="false"
      :bordered="true"
    >
      <template #empty> <div>Redis暂不实现分页查询</div> </template>
    </n-data-table>
    <!-- <n-pagination
      v-model:page="pagination.page"
      class="pagination"
      :prefix="() => `共 ${pagination.itemCount} 条数据`"
      :item-count="pagination.itemCount"
      :on-update-page="onUpdatePage"
    /> -->
  </div>
</template>

<style lang="scss" scoped>
.RedisCode_wrap {
  .actionHeader {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
