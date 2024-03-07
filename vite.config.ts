import { defineConfig } from "vite";
import path from "path";
import solid from "vite-plugin-solid";
import typescript from "@rollup/plugin-typescript";
import externalGlobals from "rollup-plugin-external-globals";

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

export default defineConfig({
  plugins: [
    solid(),
    typescript({
      target: "es2020",
      rootDir: resolve("packages/"),
      declaration: true,
      declarationDir: resolve("lib"),
      exclude: resolve("node_modules/**"),
      allowSyntheticDefaultImports: true,
    }),
  ],

  optimizeDeps: {
    exclude: ["solid-js", "solid-icons"],
  },

  build: {
    cssCodeSplit: true,
    // 打包输出的目录
    outDir: "lib",
    // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
    // cssTarget: "chrome61",
    lib: {
      // 组件库源码的入口文件
      entry: resolve("packages/index.ts"),
      // 组件库名称
      // name: "alley-components",
      // 文件名称, 打包结果举例: my-packages.umd.cjs
      // fileName: "alley",
      // formats: ["es", "umd"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "solid-js",
        "solid-js/web",
        "solid-icons/ai",
        "solid-icons/vs",
        "solid-icons/tb",
        "tslib",
      ],
      // plugins: [
      //   externalGlobals({
      //     "solid-js": "solid-js",
      //     "solid-icons": "solid-icons",
      //   }),
      // ],
      input: ["packages/index.ts"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          dir: "lib",
          preserveModulesRoot: "packages",
        },
        // {
        //   format: "cjs",
        //   entryFileNames: "[name].js",
        //   preserveModules: true,
        //   dir: "lib",
        //   preserveModulesRoot: "",
        // },
      ],
      // output: {
      // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      // globals: {
      //   react: "react",
      //   "react-dom": "react-dom",
      // },
      // },
    },
  },
});
