import { createSignal, createEffect, onMount } from "solid-js";
import type { Accessor, Setter } from "solid-js";

const useDark = (): [Accessor<boolean>, Setter<boolean>] => {
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    // 设置默认主题色
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    // 监听系统颜色切换
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          setIsDark(true);
        } else {
          setIsDark(false);
        }
      });
  });

  // 手动切换主题色
  createEffect(() => {
    if (isDark()) window.document.documentElement.setAttribute("class", "dark");
    else window.document.documentElement.removeAttribute("class");
  });

  return [isDark, setIsDark];
};

export default useDark;
