import {
  createSignal,
  createEffect,
  onCleanup,
  Show,
  type JSX,
  mergeProps,
  children,
} from "solid-js";
import { Portal } from "solid-js/web";
import { addClassNames } from "~/utils";
import "./index.scss";

type TooltipPlacement = "top" | "bottom" | "left" | "right";
type SizeType = "small" | "medium" | "large";

export interface TooltipProps {
  class?: string;
  style?: JSX.CSSProperties;
  children?: JSX.Element;
  text: string;
  disabled?: boolean;
  placement?: TooltipPlacement;
  size?: SizeType;
  delay?: number;
  gap?: number;
  showArrow?: boolean;
  fontSize?: number | string;
}

const classPrefix = "alley-tooltip";

const Tooltip = (props: TooltipProps) => {
  const merged = mergeProps({ gap: 4, placement: "left", delay: 0 }, props);

  const [isVisible, setIsVisible] = createSignal(false);
  const [position, setPosition] = createSignal({ top: 0, left: 0 });

  const [actualPlacement, setActualPlacement] = createSignal<TooltipPlacement>(
    merged.placement as TooltipPlacement,
  );

  let containerRef: HTMLDivElement | undefined;
  let tooltipRef: HTMLDivElement | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const resolved = children(() => merged.children);

  const showTooltip = () => {
    if (merged.disabled) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setIsVisible(true), merged.delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const updatePosition = () => {
    if (!containerRef || !tooltipRef) return;

    const childElement = containerRef.firstElementChild as HTMLElement;
    // NOTE: 子元素只能是一个元素, 不能是一个数组
    const triggerRect = childElement
      ? childElement.getBoundingClientRect()
      : containerRef.getBoundingClientRect();
    const tooltipRect = tooltipRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let placement = merged.placement;
    let top = 0;
    let left = 0;

    const calculatePosition = () => {
      switch (placement) {
        case "top":
          top = triggerRect.top - tooltipRect.height - merged.gap;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          if (top < 0) placement = "bottom";
          break;
        case "bottom":
          top = triggerRect.bottom + merged.gap;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          if (top + tooltipRect.height > viewportHeight) placement = "top";
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - merged.gap;
          if (left < 0) placement = "right";
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + merged.gap;
          if (left + tooltipRect.width > viewportWidth) placement = "left";
          break;
      }
    };

    calculatePosition();
    // 如果位置改变，重新计算
    if (placement !== merged.placement) {
      calculatePosition();
    }

    // 水平方向的边界检查
    if (left < 0) left = 0;
    if (left + tooltipRect.width > viewportWidth)
      left = viewportWidth - tooltipRect.width;

    // 垂直方向的边界检查
    if (top < 0) top = 0;
    if (top + tooltipRect.height > viewportHeight)
      top = viewportHeight - tooltipRect.height;

    setPosition({ top, left });
    // 更新实际的 placement
    setActualPlacement(placement as TooltipPlacement);
  };

  createEffect(() => {
    // NOTE: 子元素未渲染时不计算位置, 避免因懒加载可能导致计算错误
    if (!resolved()) return;

    if (isVisible()) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    } else {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    }
  });

  onCleanup(() => {
    clearTimeout(timeoutId);
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition);
  });

  const tooltipClass = () =>
    addClassNames(
      classPrefix,
      merged.size ?? `${classPrefix}-${merged.size}`,
      `${classPrefix}-${actualPlacement()}`,
    );

  const arrowClass = () =>
    addClassNames(
      `${classPrefix}-arrow`,
      `${classPrefix}-arrow-${actualPlacement()}`,
    );

  return (
    <>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: "inline-block" }}
      >
        <div class={`${classPrefix}-container`} ref={containerRef}>
          {resolved()}
        </div>
      </div>

      <Show when={isVisible()}>
        <Portal>
          <div
            ref={tooltipRef}
            class={tooltipClass()}
            style={
              {
                ...merged.style,
                position: "fixed",
                top: `${position().top}px`,
                left: `${position().left}px`,
                [`--${classPrefix}-font-size`]:
                  merged.fontSize &&
                  (typeof merged.fontSize === "number"
                    ? `${merged.fontSize}px`
                    : merged.fontSize),
              } as JSX.CSSProperties
            }
          >
            <Show when={merged.showArrow}>
              <div class={arrowClass()} />
            </Show>

            {merged.text}
          </div>
        </Portal>
      </Show>
    </>
  );
};

export default Tooltip;
