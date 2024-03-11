import { lazy } from "solid-js";

const LazyMenu = lazy(() => import("~/components/menu"));

const AppMenu = () => {
  return (
    <LazyMenu
      style={{ width: "160px" }}
      defaultSelectedIndex={0}
      items={[
        {
          children: "按钮",
        },
        "divider",
        {
          children: "输入框",
        },
      ]}
    />
  );
};

export default AppMenu;
