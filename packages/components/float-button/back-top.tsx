import { AiOutlineVerticalAlignTop } from "solid-icons/ai";
import FloatButton from "./button";
import {
  Show,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  useContext,
} from "solid-js";
import type { FloatButtonProps } from "./interface";
import { FloatGroupContext } from "./group";
import { addClassNames } from "~/utils";

interface BackTopProps extends FloatButtonProps {
  visibilityHeight?: number;
  afterClick?: () => void;
}

const BackTop = (props: BackTopProps) => {
  const context = useContext(FloatGroupContext);

  const classes = () => addClassNames(context?.class, props.class);

  const merged = mergeProps({ visibilityHeight: 400 }, props);

  const [isScrollingToTop, setIsScrollingToTop] = createSignal(false);
  const [visible, setVisible] = createSignal(merged.visibilityHeight === 0);

  const handleScroll = () => {
    if (isScrollingToTop()) {
      setVisible(false);
      setIsScrollingToTop(window.scrollY > 0);
    } else {
      setVisible(window.scrollY > merged.visibilityHeight);
    }
  };

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    setIsScrollingToTop(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    merged.afterClick?.();
  };

  return (
    <Show when={visible()}>
      <FloatButton
        id={merged.id}
        class={classes()}
        onClick={scrollToTop}
        icon={<AiOutlineVerticalAlignTop />}
        tooltip={merged.tooltip ?? "回到顶部"}
        right={merged.right}
        bottom={merged.bottom}
      />
    </Show>
  );
};

export default BackTop;
