# 羊小羊的工具库 🛠

本项目目标是给老师同学们提供一些课堂上常用的小工具，如

- 随机抽指定范围内的数
- 随机分组点名
- 转盘
- 骰子
- 特殊处理 Excel / Word 等文件

## 主要技术栈 💡

使用 `Create-React-App v5` 脚手架创建。

- `React 17`, `React Router v6`
- `TypeScript v4`
- `Antd v4`
- `Styled-Components`
- `i18next`, 国际化（简体中文/英语/繁体中文）

### 自动部署 🕹

为了实现 build 项目以后自动部署到 GitHub Pages，已在 scripts 的 build 里通过 `react-scripts build && rm -rf docs && mv build docs` 实现。

因此项目在运行 `npm run build` 后会自动 build 到 `docs` 文件夹，push 后即可自动部署到 GitHub Pages。

## 项目体验 🖥

在线浏览： [https://chuyang-fe.github.io/tools-for-teachers/](https://chuyang-fe.github.io/tools-for-teachers/)

## ToDo Lists 📜

- [ ] 侧边栏选中问题(如回退、路由改变等)
- [ ] UX: 左上角新增网站图标，点击后返回首页
- [ ] 解决 hard code，如路由地址、侧边栏菜单地址
- [ ] i18n (包括 README.md)
- [ ] 404 page 设计
- [ ] UI enhancement
- [ ] mobile 移动端适配
