# Alley Components

一个专门为桌面软件写的 solidjs 简单组件库。

本框架应用于使用 [tauri](https://github.com/tauri-apps/tauri)、[electron](https://github.com/electron/electron) 开发的桌面软件，所以当前未实现`message`、`notification`、`modal`等反馈组件，这些组件可通过桌面开发框架调用系统 API 或创建多窗口实现。

参考了一些 React 组件库的实现，包括：

- antd
- mui

## 1 安装

```bash
pnpm i alley-components
```

## 2 使用

本组件库专为本组织内的桌面程序开发，非全功能组件，请谨慎在其他项目中使用，否则会面临功能缺失的问题。

所有的组件在使用时都会自动导入其对应的样式，但这些独立的样式文件中会使用到全局的样式变量，为了避免组件样式的正常渲染，建议在`index.tsx`或`App.tsx`中导入全局 css 文件：

```tsx
import "alley-components/lib/index.css"
```

### 2.1 按需加载

本项目只打包为 ESM 格式，天生支持按需加载，在使用时正常导入即可，如：

```tsx
import { Button } from "alley-components"
```

### 2.2 懒加载

本项目本身体积就很小，但你也可以使用懒加载，同样以`Button`组件为例：

```tsx
import { lazy } from "solid-js"

const LazyButton = lazy(() => import("alley-components/lib/components/button"))
```

懒加载能够将`Button`组件单独打包到一个 js 文件中，避免打包产物体积过大。

## 3 示例和开发

查看在线运行效果：[codesandbox](https://codesandbox.io/p/github/alley-rs/alley-components/main?import=true&layout=%257B%2522sidebarPanel%2522%253A%2522GIT%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cltku0veu00063b5u4kc7ozxh%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cltku0veu00023b5uw0otkrk4%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cltku0veu00043b5uqoq7kpb3%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cltku0veu00053b5usrf0m56h%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cltku0veu00023b5uw0otkrk4%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cltku0vet00013b5u51pgs4gx%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522cltku0veu00023b5uw0otkrk4%2522%252C%2522activeTabId%2522%253A%2522cltku0vet00013b5u51pgs4gx%2522%257D%252C%2522cltku0veu00053b5usrf0m56h%2522%253A%257B%2522id%2522%253A%2522cltku0veu00053b5usrf0m56h%2522%252C%2522activeTabId%2522%253A%2522cltku53im00n73b5uqi0tau52%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522id%2522%253A%2522cltku53im00n73b5uqi0tau52%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%252C%2522cltku0veu00043b5uqoq7kpb3%2522%253A%257B%2522id%2522%253A%2522cltku0veu00043b5uqoq7kpb3%2522%252C%2522activeTabId%2522%253A%2522cltku0xks003h3b5u6xaqrewy%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cltku0veu00033b5uuvzzygh3%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522cltku0wwa0033deem7qufc6jv%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522cltku0xks003h3b5u6xaqrewy%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522CSB_RUN_OUTSIDE_CONTAINER%253D1%2520devcontainer%2520templates%2520apply%2520--template-id%2520%255C%2522ghcr.io%252Fdevcontainers%252Ftemplates%252Ftypescript-node%255C%2522%2520--template-args%2520%27%257B%257D%27%2520--features%2520%27%255B%255D%27%2522%252C%2522id%2522%253A%2522cltku3ynd00d23b5ueyuqqw5d%2522%252C%2522mode%2522%253A%2522permanent%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)。

克隆本仓库并安装依赖后执行：

```bash
pnpm dev
```

在任意浏览器中打开`http://127.0.0.1:5173`可查看组件运行效果，如图：

![example](./docs/images/example.avif)
