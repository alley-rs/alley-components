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
            defaultSelectedIndex={0}
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
        <FloatButton />
      </FloatButton.Group>
    </>
  );
};

export default App;
