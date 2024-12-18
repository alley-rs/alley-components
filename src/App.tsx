import { createSignal, lazy } from "solid-js";
import { Button, FloatButton, Layout, Toast } from "../packages";
import { Dynamic } from "solid-js/web";
import DarkSwitchButton from "./DarkSwitch";
import { AiOutlineClose, AiOutlineDelete } from "solid-icons/ai";

const children = [
  lazy(() => import("./components/buttons")),
  lazy(() => import("./components/inputs")),
  lazy(() => import("./components/tooltips")),
  lazy(() => import("./components/progresses")),
  lazy(() => import("./components/spinners")),
  lazy(() => import("./components/alerts")),
  lazy(() => import("./components/typographys")),
  lazy(() => import("./components/toast")),
  lazy(() => import("./components/list")),
  lazy(() => import("./components/segmented.tsx")),
  lazy(() => import("./components/switchs.tsx")),
  lazy(() => import("./components/dialogs.tsx")),
  lazy(() => import("./components/tags.tsx")),
  lazy(() => import("./components/select.tsx")),
];

const LazyMenu = lazy(() => import("~/components/menu"));

const menus = [
  "按钮",
  "输入",
  "文字提示",
  "进度条",
  "加载中",
  "警告",
  "文本",
  "轻提示",
  "列表",
  "分段控制器",
  "开关",
  "对话框",
  "标签",
  "选择器",
];

const App = () => {
  const [index, setIndex] = createSignal(0);

  const [toastOpen, setToastOpen] = createSignal(false);

  return (
    <>
      <Layout
        menu={
          <LazyMenu
            style={{ width: "160px" }}
            index={index()}
            items={menus.map((s, idx) => ({
              children: s,
              onClick: () => setIndex(idx),
            }))}
          />
        }
        content={<Dynamic component={children[index()]} />}
      />

      <Toast
        message="已清空"
        open={toastOpen()}
        onClose={() => setToastOpen(false)}
        action={
          <Button
            icon={<AiOutlineClose />}
            type="plain"
            shape="circle"
            onClick={() => setToastOpen(false)}
            danger
          />
        }
      />

      <FloatButton.Group>
        <FloatButton.BackTop visibilityHeight={100} />
        <DarkSwitchButton />
        <FloatButton
          danger
          icon={<AiOutlineDelete />}
          onClick={() => setToastOpen(true)}
        />
        <FloatButton onClick={() => setIndex(0)} tooltip="回到主页" />
      </FloatButton.Group>
    </>
  );
};

export default App;
