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

克隆本仓库并安装依赖后执行：

```bash
pnpm dev
```

在任意浏览器中打开`http://127.0.0.1:5173`可查看组件运行效果，如图：

![example](./docs/images/example.avif)
