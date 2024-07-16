import {
  children,
  createEffect,
  createSignal,
  mergeProps,
  type JSX,
} from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import type { BaseComponentProps, SizeType } from "~/interface";

export type TooltipPlacement = "top" | "left" | "right" | "bottom";
// | "top-left"
// | "top-right"
// | "bottom-left"
// | "bottom-right"
// | "left-top"
// | "left-bottom"
// | "right-top"
// | "right-bottom";

export interface TooltipProps extends BaseComponentProps {
  text: string;
  disabled?: boolean;
  placement?: TooltipPlacement;
  size?: SizeType;
  // destroy?: boolean; // 隐藏时是否删除 tooltip
}

const classPrefix = "tooltip";
const gap = 4;

const Tooltip = (props: TooltipProps) => {
  const mergedProps = mergeProps(
    { size: "middle", placement: "left" },
    props,
  ) as {
    text: string;
    disabled?: boolean;
    placement: TooltipPlacement;
    size: SizeType;
  } & BaseComponentProps;

  let tooltipRef: HTMLDivElement | undefined;

  const [isVisible, setIsVisible] = createSignal(false);

  const [positionStyles, setPositionStyles] = createSignal<JSX.CSSProperties>();

  const resolved = children(() => mergedProps.children);

  createEffect(() => {
    mergedProps.text && updatePostion();
  });

  const setPostion = (
    placement: TooltipPlacement,
    childRect: DOMRect,
    tooltipRect: DOMRect,
  ): JSX.CSSProperties => {
    const popoverHalfWidth = tooltipRect.width / 2;

    let arrowCenterX: number;
    let popoverLeft: number;
    let offsetX: number;

    switch (placement) {
      case "top":
        arrowCenterX = childRect.width / 2 + childRect.left;

        popoverLeft =
          arrowCenterX < popoverHalfWidth ? popoverHalfWidth : arrowCenterX;

        return {
          "--top": `${childRect.top - 2 * gap}px`,
          "--left": `${popoverLeft}px`,
        };

      case "bottom":
        arrowCenterX = childRect.width / 2 + childRect.left;

        if (arrowCenterX < popoverHalfWidth) {
          // 左侧溢出
          offsetX = popoverHalfWidth - arrowCenterX;
          popoverLeft = popoverHalfWidth;
        } else if (arrowCenterX + popoverHalfWidth > window.innerWidth) {
          // 右侧溢出
          offsetX = window.innerWidth - arrowCenterX - popoverHalfWidth;
          popoverLeft =
            offsetX > 0
              ? arrowCenterX
              : window.innerWidth - tooltipRect.width / 2;
          offsetX = offsetX < 0 ? offsetX : 0;
        } else {
          // 未溢出
          popoverLeft = arrowCenterX;
          offsetX = 0;
        }

        return {
          "--top": `${childRect.bottom + tooltipRect.height + 2 * gap}px`,
          "--left": `${popoverLeft}px`,
          "--offset-x": `${offsetX}px`,
        };

      case "left":
        return {
          "--left": `${childRect.left - tooltipRect.width - 5 - gap}px`,
          "--top": `${childRect.top + childRect.height / 2}px`,
        };

      case "right":
        return {
          "--left": `${childRect.right + gap + 5}px`,
          "--top": `${childRect.top + childRect.height / 2}px`,
        };
    }
  };

  const className = () =>
    addClassNames(
      classPrefix,
      mergedProps.class,
      `tooltip-${mergedProps.size}`,
    );

  const popoverClassName = () =>
    addClassNames(
      `${classPrefix}-popover`,
      `${classPrefix}-popover-${mergedProps.placement}`,
    );

  const arrowClassName = () =>
    addClassNames(
      `${classPrefix}-popover-arrow`,
      `${classPrefix}-popover-arrow-${mergedProps.placement}`,
    );

  const updatePostion = () => {
    // TODO: 下面的状态处理不是最佳方式，有待改进
    const child = resolved() as HTMLElement;

    if (!child) return;

    const childRect = child.getBoundingClientRect();

    const tooltipRect = tooltipRef?.getBoundingClientRect();

    if (!childRect || !tooltipRect) return;

    const positionStyle = setPostion(
      mergedProps.placement,
      childRect,
      tooltipRect,
    );

    setPositionStyles(positionStyle);
  };

  const showTooltip = () => {
    updatePostion();

    !mergedProps.disabled && setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const visibleStyle = () => ({
    ...mergedProps.style,
    "--visibility": isVisible() ? "visible" : "hidden",
  });

  const resolvedTextChild = children(() => (
    <div class={`${classPrefix}-text`}>{mergedProps.text}</div>
  ));

  return (
    <div class={className()} style={visibleStyle()}>
      <div
        style={{ display: "inline" }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {resolved()}
      </div>
      <div ref={tooltipRef} class={popoverClassName()} style={positionStyles()}>
        <div class={arrowClassName()} />
        {resolvedTextChild()}
      </div>
    </div>
  );
};

export default Tooltip;
