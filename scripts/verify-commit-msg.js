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
