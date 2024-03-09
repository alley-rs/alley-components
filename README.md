# Alley Components

solidjs 简单组件库。

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
