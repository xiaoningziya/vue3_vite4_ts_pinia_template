1. 远程 Github 的仓库，生成一份本地的秘钥
   cd ~/.ssh
   cat ./id_rsa.pub

2. Github 新建一个项目文件夹,选择生成 README.md 文件,这样就可以直接用这个仓库了

3. 本地初始化项目
   cnpm init vite app -- --template

✔ Select a framework: › Vue
✔ Select a variant: › TypeScript

4. git clone 【Github 仓库的 ssh 远程地址】

5. 将刚才生成的项目文件和文件夹移动至 clone 下来的项目中

6. cd /项目
   cnpm i

7. eslint 安装
   cnpm i -D eslint

8. eslint 插件安装
   cnpm i -D eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier

9. typescript parser
   cnpm i -D @typescript-eslint/parser

10. 项目下新建 .eslintrc.js , 配置 eslint 校验规则

module.exports = {
root: true,
env: {
browser: true,
node: true,
es2021: true,
},
parser: 'vue-eslint-parser',
extends: [
'eslint:recommended',
'plugin:vue/vue3-recommended',
'plugin:@typescript-eslint/recommended',
'plugin:prettier/recommended',
// eslint-config-prettier 的缩写
'prettier',
],
parserOptions: {
ecmaVersion: 12,
parser: '@typescript-eslint/parser',
sourceType: 'module',
ecmaFeatures: {
jsx: true,
},
},
// eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier 的缩写
plugins: ['vue', '@typescript-eslint', 'prettier'],
rules: {
'@typescript-eslint/ban-ts-ignore': 'off',
'@typescript-eslint/no-unused-vars': 'off',
'@typescript-eslint/explicit-function-return-type': 'off',
'@typescript-eslint/no-explicit-any': 'off',
'@typescript-eslint/no-var-requires': 'off',
'@typescript-eslint/no-empty-function': 'off',
'@typescript-eslint/no-use-before-define': 'off',
'@typescript-eslint/ban-ts-comment': 'off',
'@typescript-eslint/ban-types': 'off',
'@typescript-eslint/no-non-null-assertion': 'off',
'@typescript-eslint/explicit-module-boundary-types': 'off',
'no-var': 'error',
'prettier/prettier': 'error',
// 禁止出现 console
'no-console': 'warn',
// 禁用 debugger
'no-debugger': 'warn',
// 禁止出现重复的 case 标签
'no-duplicate-case': 'warn',
// 禁止出现空语句块
'no-empty': 'warn',
// 禁止不必要的括号
'no-extra-parens': 'off',
// 禁止对 function 声明重新赋值
'no-func-assign': 'warn',
// 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
'no-unreachable': 'warn',
// 强制所有控制语句使用一致的括号风格
curly: 'warn',
// 要求 switch 语句中有 default 分支
'default-case': 'warn',
// 强制尽可能地使用点号
'dot-notation': 'warn',
// 要求使用 === 和 !==
eqeqeq: 'warn',
// 禁止 if 语句中 return 语句之后有 else 块
'no-else-return': 'warn',
// 禁止出现空函数
'no-empty-function': 'warn',
// 禁用不必要的嵌套块
'no-lone-blocks': 'warn',
// 禁止使用多个空格
'no-multi-spaces': 'warn',
// 禁止多次声明同一变量
'no-redeclare': 'warn',
// 禁止在 return 语句中使用赋值语句
'no-return-assign': 'warn',
// 禁用不必要的 return await
'no-return-await': 'warn',
// 禁止自我赋值
'no-self-assign': 'warn',
// 禁止自身比较
'no-self-compare': 'warn',
// 禁止不必要的 catch 子句
'no-useless-catch': 'warn',
// 禁止多余的 return 语句
'no-useless-return': 'warn',
// 禁止变量声明与外层作用域的变量同名
'no-shadow': 'off',
// 允许 delete 变量
'no-delete-var': 'off',
// 强制数组方括号中使用一致的空格
'array-bracket-spacing': 'warn',
// 强制在代码块中使用一致的大括号风格
'brace-style': 'warn',
// 强制使用骆驼拼写法命名约定
camelcase: 'warn',
// 强制使用一致的缩进
indent: 'off',
// 强制在 JSX 属性中一致地使用双引号或单引号
// 'jsx-quotes': 'warn',
// 强制可嵌套的块的最大深度 4
'max-depth': 'warn',
// 强制最大行数 300
// "max-lines": ["warn", { "max": 1200 }],
// 强制函数最大代码行数 50
// 'max-lines-per-function': ['warn', { max: 70 }],
// 强制函数块最多允许的的语句数量 20
'max-statements': ['warn', 100],
// 强制回调函数最大嵌套深度
'max-nested-callbacks': ['warn', 3],
// 强制函数定义中最多允许的参数数量
'max-params': ['warn', 3],
// 强制每一行中所允许的最大语句数量
'max-statements-per-line': ['warn', { max: 1 }],
// 要求方法链中每个调用都有一个换行符
'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
// 禁止 if 作为唯一的语句出现在 else 语句中
'no-lonely-if': 'warn',
// 禁止空格和 tab 的混合缩进
'no-mixed-spaces-and-tabs': 'warn',
// 禁止出现多行空行
'no-multiple-empty-lines': 'warn',
// 禁止出现;
semi: ['warn', 'never'],
// 强制在块之前使用一致的空格
'space-before-blocks': 'warn',
// 强制在 function 的左括号之前使用一致的空格
// 'space-before-function-paren': ['warn', 'never'],
// 强制在圆括号内使用一致的空格
'space-in-parens': 'warn',
// 要求操作符周围有空格
'space-infix-ops': 'warn',
// 强制在一元操作符前后使用一致的空格
'space-unary-ops': 'warn',
// 强制在注释中 // 或 /\* 使用一致的空格
// "spaced-comment": "warn",
// 强制在 switch 的冒号左右有空格
'switch-colon-spacing': 'warn',
// 强制箭头函数的箭头前后使用一致的空格
'arrow-spacing': 'warn',
'no-var': 'warn',
'prefer-const': 'warn',
'prefer-rest-params': 'warn',
'no-useless-escape': 'warn',
'no-irregular-whitespace': 'warn',
'no-prototype-builtins': 'warn',
'no-fallthrough': 'warn',
'no-extra-boolean-cast': 'warn',
'no-case-declarations': 'warn',
'no-async-promise-executor': 'warn',
},
globals: {
defineProps: 'readonly',
defineEmits: 'readonly',
defineExpose: 'readonly',
withDefaults: 'readonly',
},
}

11. 项目下新建 .eslintignore , 并添加内容

# eslint 忽略检查 (根据项目需要自行添加)

node_modules
dist

12. 安装 prettier
    cnpm i -D prettier

13. 解决 eslint 和 prettier 冲突

解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效

14. 安装插件 eslint-config-prettier
    cnpm i -D eslint-config-prettier

15. 项目下新建 .prettier.js , 并配置 prettier 格式化规则
    module.exports = {
    tabWidth: 2,
    jsxSingleQuote: true,
    jsxBracketSameLine: true,
    printWidth: 100,
    singleQuote: true,
    semi: false,
    overrides: [
    {
    files: '*.json',
    options: {
    printWidth: 200,
    },
    },
    ],
    arrowParens: 'always',
    }
16. 项目下新建 .prettierignore , 并配置

# 忽略格式化文件 (根据项目需要自行添加)

node_modules
dist

16. package.json 配置
    {
    "script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prettier": "prettier --write ."
    }
    }

17. 配置完成后,可以运行以下命令测试下代码检查个格式化效果

# eslint 检查

npm run lint

# prettier 自动格式化

npm run prettier

18. 这里插入一个报错的解决，npm run dev 后报错（大概意思就是：没有权限对./node_modules 下的内容修改）

### 报错输出：

> vue3_vite4_ts_pinia_template@0.0.0 dev
> vite
> VITE v4.0.1 ready in 139 ms
> ➜ Local: http://localhost:5173/
> ➜ Network: use --host to expose
> ➜ press h to show help
> node:fs:1382
> handleErrorFromBinding(ctx);
> ^
> Error: EACCES: permission denied, mkdir '/Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/node_modules/.vite/deps_temp'

    at Object.mkdirSync (node:fs:1382:3)
    at runOptimizeDeps (file:///Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/node_modules/_vite@4.0.1@vite/dist/node/chunks/dep-2285ba4f.js:43767:14)
    at Timeout._onTimeout (file:///Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/node_modules/_vite@4.0.1@vite/dist/node/chunks/dep-2285ba4f.js:43175:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {

errno: -13,
syscall: 'mkdir',
code: 'EACCES',
path: '/Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/node_modules/.vite/deps_temp'
}

### 解决方案

注意：当前处于项目的./node_modules 同级
要开启权限的电脑用户名：ningyanzhe
要开启权限的文件夹目录：./node_modules
sudo chown -R ningyanzhe ./node_modules

19. Mac 在使用 cnpm 下载依赖的时候报错

### 报错内容

Error: EACCES: permission denied, open '/Users/ningyanzhe/.npminstall_tarball/manifests/a/5/5/a550c0bee4bca5e253b571caa6986447.json'
npminstall version: 6.6.1
npminstall args: /usr/local/bin/node /usr/local/lib/node_modules/cnpm/node_modules/npminstall/bin/install.js --fix-bug-versions --china --userconfig=/Users/ningyanzhe/.cnpmrc --disturl=https://npmmirror.com/mirrors/node --registry=https://registry.npmmirror.com

### 解决方案

将 ningyanzhe 这个用户 在 /Users/ningyanzhe 这个目录下的所有操作权限打开（危险：此操作包括照片、下载、通讯录等）
sudo chown -R ningyanzhe /Users/ningyanzhe

20. 项目中 cnpm i 安装依赖 ，提示了以下警告 ，留到后面解决
    peerDependencies WARNING vite@^4.0.0 requires a peer of @types/node@>= 14 but none was installed
    peerDependencies WARNING vite@^4.0.0 requires a peer of less@_ but none was installed
    peerDependencies WARNING vite@^4.0.0 requires a peer of sass@_ but none was installed
    peerDependencies WARNING vite@^4.0.0 requires a peer of stylus@_ but none was installed
    peerDependencies WARNING vite@^4.0.0 requires a peer of sugarss@_ but none was installed
    peerDependencies WARNING vite@^4.0.0 requires a peer of terser@^5.4.0 but none was installed
    deprecate vue@3.2.45 › @vue/compiler-sfc@3.2.45 › magic-string@0.25.9 › sourcemap-codec@^1.4.8 Please use @jridgewell/sourcemap-codec instead

21. Linux/ Mac 修改文件权限的方法

    1. 更改文件和目录的拥有者：chown
       语法：chown -R 文件的新拥有者 文件名
       -R：对目录及该目录下的所有文件和子目录都进行相同的操作，即递归更改目录的所有者
    2. 改变文件和目录的存取权限：chmod
       只能是文件所有者和特权用户才能使用
       语法：chmod 【-R】 权限值 文件名 1 文件名 2
       -R ：对目录及该目录下的所有文件和子目录都进行相同的操作；

22. npm run lint 报错
### 报错内容
Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/ningyanzhe/Desktop/PublicProject/vue3*vite4_ts_pinia_template/.eslintrc.js from /Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/node_modules/*@eslint_eslintrc@1.3.3@@eslint/eslintrc/dist/eslintrc.cjs not supported.
.eslintrc.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead rename .eslintrc.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in /Users/ningyanzhe/Desktop/PublicProject/vue3_vite4_ts_pinia_template/package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead)
### 解决方案
.eslintrc.js 重命名为 .eslintrc.cjs

23. VSCode安装插件 ESLint 这个插件辅助快速修复等IDE能力

24. ESlint不要分号，Prettier强制分号结尾的问题，解决如下（这里统一不要分号）
在package.json中加入如下代码配置（如果没有效果，重启一下编辑器和选择项目）
"prettier": {
   "semi": false
}

25. 新建.npmrc文件，指定项目依赖的来源（yarn 会读取.npmrc的配置文件，所以不必为yarn再设置一次）

26. 配置 Git hooks 的 commit-msg
### 安装 yorkie ，此包是尤大fork自 husky，他们的功能基本是一样的
cnpm install yorkie --save-dev
### package.json 增加以下配置
"gitHooks": {
   "commit-msg": "node scripts/verify-commit-msg.js"
},
### 新建文件/scripts/verify-commit-msg.js
const chalk = require("chalk")
const msgPath = process.env.GIT_PARAMS
const msg = require("fs").readFileSync(msgPath, "utf-8").trim()
const commitRE =
  /^(build|chore|ci|docs|feat|fix|wip|perf|refactor|revert|style|test|temp|)(\(.+\))?: .{1,50}/
// 根据正则表达式校验提交的message是否符合团队规范
if (!(commitRE.test(msg) || msg.indexOf("Merge") === 0)) {
  // eslint-disable-next-line no-console
  console.error(`${chalk.bgRed.white(" ERROR ")}
  [${chalk.red(msg)}] 是 ${chalk.red("无效的提交消息格式")}
  ${chalk.red("自动生成更新日志需要正确的提交消息格式 例如:")}

  ${chalk.green("feat(test1.js): 增加测试本条message的文件test1.js")}
  ${chalk.green("feat(test2.js): 增加测试本条message的文件test2.js")}
  ${chalk.green("fix(test1.js): 删除冗余文件test1.js")}
  ${chalk.green("fix(test2.js): 删除冗余文件test2.js")}
  ${chalk.green("Closes #1,2")}`)
  // 以非0值退出，放弃提交
  process.exit(1)
}

27. 配置 Git hooks 的 pre-commit
### 安装
cnpm i -D lint-staged
### package.json配置修改
"gitHooks": {
   "pre-commit": "lint-staged",
   "commit-msg": "node scripts/verify-commit-msg.js"
},
"lint-staged": {
   "*.{ts,tsx,vue,js,jsx}": [
   "npm run lint",
   "prettier --write",
   "git add"
   ]
},

28. stylelint 配置
### 安装vscode IDE支持
Stylelint
### 下载相关依赖
cnpm i -D stylelint
cnpm i -D stylelint-config-standard // stylelint的推荐配置
cnpm i -D stylelint-order // 用来在格式化css文件时对代码的属性进行排序
cnpm i -D stylelint-config-css-modules // css-module的方案来处理样式文件
cnpm i -D stylelint-less // 对于less文件的检查
cnpm i -D stylelint-scss // 对于scss文件的检查
### package新增命令
"scripts": {
   "style-lint": "stylelint src/**/*.{css,sass,scss,less,vue}",
   "style-lint:fix": "stylelint src/**/*.{css,sass,scss,less,vue} --fix",
},
### commit检测配置（package.json）
"lint-staged": {
   "*.{ts,tsx,vue,js,jsx}": [
      "npm run lint",
      "prettier --write",
      "git add"
   ],
   "*.{css,sass,scss,less,vue}": [
      "npm run style-lint"
   ]
},
### 新建 .stylelintignore 文件
/src/assets/iconfont
### 新建 .stylelintrc.js 文件
module.exports = {
  processors: [],
  plugins: ['stylelint-order'],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules"
  ],
  rules: {
    "selector-class-pattern": [ // 命名规范 -
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        "message": "Expected class selector to be kebab-case"
      }
    ],
    "string-quotes":"single", // 单引号
    "at-rule-empty-line-before": null,
    "at-rule-no-unknown":null,
    "at-rule-name-case": "lower",// 指定@规则名的大小写
    "length-zero-no-unit": true,  // 禁止零长度的单位（可自动修复）
    "shorthand-property-no-redundant-values": true, // 简写属性
    "number-leading-zero": "never", // 小数不带0
    "declaration-block-no-duplicate-properties": true, // 禁止声明快重复属性
    "no-descending-specificity": true, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    "selector-max-id": 0, // 限制一个选择器中 ID 选择器的数量
    "max-nesting-depth": 3,
    "indentation": [2, {  // 指定缩进  warning 提醒
      "severity": "warning"
    }],
    "order/properties-order": [ // 规则顺序
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "float",
      "width",
      "height",
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      "line-height",
      'letter-spacing',
      'word-spacing',
      "color",
      "text-align",
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      "background",
      "background-color",
      "border",
      "border-radius",
      'content',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'transform',
    ],
  }
}

29. 配置 husky
### Github
https://github.com/typicode/husky
### 下载
cnpm i -D husky
### 添加两个文件
npx husky add .husky/pre-commit
npx husky add .husky/commit-msg
### .husky/pre-commit 添加内容
npm run lint
npm run style-lint
### .husky/commit-msg 添加内容
node scripts/verify-commit-msg.js

30. stylelint 报错
### 报错内容
When linting something other than CSS, you should install an appropriate syntax, e.g. "postcss-html", and use the "customSyntax" option
### 解决方案
> 下载
cnpm install --save-dev postcss-html stylelint-config-standard-vue
> 配置stylelintrc.cjs
"extends": "stylelint-config-standard-vue"
"customSyntax": "postcss-html",

31. `githooks对于lint的配置后面还有修改，以最终结果为准`

32. 配置文件引用别名 alias
> vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
> tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
      "@/*":["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}

33. 配置 css 预处理器 scss
配置全局 scss 样式文件
`cnpm i -D dart-sass`
`cnpm i -D sass`
在 src/assets 下新增 style 文件夹，用于存放全局样式文件
新建 main.scss, 设置一个用于测试的颜色变量 :
```
$test-color: red;
```
如何将这个全局样式文件全局注入到项目中呢？配置 Vite 即可：
css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/style/mian.scss";'
      }
    }
},
组件中使用:
不需要任何引入可以直接使用全局scss定义的变量
```
.test{
  color: $test-color;
}
``` 

34. 路由配置
> 下载依赖
cnpm i vue-router@4 -S
> 在 src 文件下新增 router 文件夹 => router.ts 文件,内容如下
```
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```
> 修改入口文件 mian.ts
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(router)

app.mount('#app')
```
> vue-router4.x 支持 typescript，配置路由的类型是 RouteRecordRaw，这里 meta 可以让我们有更多的发挥空间，这里提供一些参考：
```
title:string; 页面标题，通常必选。
icon?:string; 图标，一般配合菜单使用。
auth?:boolean; 是否需要登录权限。
ignoreAuth?:boolean; 是否忽略权限。
roles?:RoleEnum[]; 可以访问的角色
keepAlive?:boolean; 是否开启页面缓存
hideMenu?:boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
order?:number; 菜单排序。
frameUrl?:string; 嵌套外链。
```

35. 统一请求封装
> 下载依赖
```
# 安装 axios
yarn add axios
# 安装 nprogress 用于请求 loading
# 也可以根据项目需求自定义其它 loading
yarn add nprogress
# 类型声明，或者添加一个包含 `declare module 'nprogress'
yarn add @types/nprogress --dev
```
> 新增 service 文件夹，service 下新增 http.ts 文件以及 api 文件夹
> http.ts : 用于axios封装
```
//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
```
> api : 项目中接口做统一管理，按照模块来划分
> 在 api 文件下新增 login 文件夹,用于存放登录模块的请求接口,login 文件夹下分别新增 login.ts types.ts
> login.ts
```
import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
    login(params){
        return http.post('/login', params)
    }

}
export default loginApi
```
> types.ts
```
export interface ILoginParams {
    userName: string
    passWord: string | number
}
export interface ILoginApi {
    login: (params: ILoginParams)=> Promise<any>
}
```
> 除了自己手动封装 axios ,这里还推荐一个 vue3 的请求库: VueRequest,非常好用,下面来看看 VueRequest有哪些比较好用的功能吧!!!
```
🚀 所有数据都具有响应式
🔄 轮询请求
🤖 自动处理错误重试
🗄 内置请求缓存
💧 节流请求与防抖请求
🎯 聚焦页面时自动重新请求
⚙️ 强大的分页扩展以及加载更多扩展
📠 完全使用 Typescript 编写，具有强大的类型提示
⚡️ 兼容 Vite
🍃 轻量化
📦 开箱即用
```

36. 环境变量配置
> `vite 提供了两种模式：具有开发服务器的开发模式（development）和生产模式（production）`
> 项目根目录新建:.env.development :
```
NODE_ENV=development
VITE_APP_WEB_URL= 'YOUR WEB URL'
```
> 项目根目录新建:.env.production :
```
NODE_ENV=production
VITE_APP_WEB_URL= 'YOUR WEB URL'
```
> 组件中使用：
```
console.log(import.meta.env.VITE_APP_WEB_URL)
```
> 配置 package.json:
打包区分开发环境和生产环境
```
"build:dev": "vite build --mode development",
"build:pro": "vite build --mode production",
```