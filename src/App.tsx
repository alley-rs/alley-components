import { createSignal, lazy } from "solid-js";
import { FloatButton, Layout } from "../packages";
import { Dynamic } from "solid-js/web";
import DarkSwitchButton from "./DarkSwitch";

const children = [
  lazy(() => import("./components/buttons")),
  lazy(() => import("./components/inputs")),
  lazy(() => import("./components/tooltips")),
  lazy(() => import("./components/progresses")),
  lazy(() => import("./components/spinners")),
  lazy(() => import("./components/alerts")),
  lazy(() => import("./components/typographys")),
];

const LazyMenu = lazy(() => import("~/components/menu"));

const menus = ["按钮", "输入", "文字提示", "进度条", "加载中", "警告", "文本"];

const App = () => {
  const [index, setIndex] = createSignal(0);

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

      <FloatButton.Group>
        <FloatButton.BackTop visibilityHeight={100} />
        <DarkSwitchButton />
        <FloatButton />
      </FloatButton.Group>
    </>
  );
};

export default App;
