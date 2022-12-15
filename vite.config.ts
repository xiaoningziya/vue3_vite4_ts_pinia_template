import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import viteCompression from "vite-plugin-compression"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", //打包路径
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      // 别名配置
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      // 全局scss文件挂载
      scss: {
        additionalData: '@import "@/assets/style/main.scss";',
      },
    },
  },
  // 运行 代理 和 打包 配置
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    https: false,
    proxy: {},
  },
  // 生产环境去除 console debugger
  // build: {
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  // },
  esbuild: {
    pure: ["console.log", "debugger"],
  },
})
