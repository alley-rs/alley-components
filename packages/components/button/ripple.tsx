import { For, createEffect, mergeProps } from "solid-js";
import type { JSX, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";
import useTimeout from "~/utils/useTimeout";

interface RippleContainerProps {
  children: JSXElement;
  color?: string;
  duration: number;
  onMouseDown: (
    e: MouseEvent & { currentTarget: HTMLDivElement; target: Element },
  ) => void;
  onMouseUp: (e: MouseEvent & { currentTarget: HTMLDivElement }) => void;
  onMouseLeave: (e: MouseEvent & { currentTarget: HTMLDivElement }) => void;
}

const RippleContainer = (props: RippleContainerProps) => {
  const style = () => {
    const stl: JSX.CSSProperties = {
      "--alley-button-ripple-duration": `${props.duration}ms`,
    };

    if (props.color) stl["--alley-button-ripple-container"] = props.color;

    return stl;
  };

  return (
    <div
      class="alley-button-ripple-container"
      style={style()}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  );
};

interface RippleItem {
  x: number;
  y: number;
  size: number;
  type: "enter" | "exit";
}

interface RippleProps {
  duration?: number;
  color?: string;
}

// 设置单击时长
const clickDuration = 160;

const Ripple = (props: RippleProps) => {
  const merged = mergeProps({ duration: 550 }, props);

  let clickTimeout = useTimeout();
  let rippleArrayTimeout = useTimeout();

  const [rippleArray, setRippleArray] = createStore<RippleItem[]>([]);

  createEffect(() => {
    if (rippleArray.length === 0) return;

    if (clickTimeout) {
      // 单击使用定时器清理 ripple
      rippleArrayTimeout.start(merged.duration, () => {
        // setRippleArray([]);
      });
    }
  });

  const addRipple = (e: MouseEvent, type: RippleItem["type"] = "exit") => {
    const target = e.target as HTMLElement;
    const {
      width,
      height,
      x: rectX,
      y: rectY,
    } = target.getBoundingClientRect();

    const calculateRadius = () => {
      const pointRelativeY = max(
        e.clientY - rectY,
        height - (e.clientY - rectY),
      );
      const pointRelativeX = max(
        e.clientX - rectX,
        width - (e.clientX - rectX),
      );
      // 半径
      const radius = Math.sqrt(pointRelativeX ** 2 + pointRelativeY ** 2);

      return radius;
    };

    const radius = calculateRadius();

    // 直径
    const size = radius * 2;

    const x = e.clientX - rectX - size / 2;
    const y = e.clientY - rectY - size / 2;

    const ripple: RippleItem = {
      x,
      y,
      size,
      type,
    };

    setRippleArray((prev) => [...prev, ripple]);
  };

  const setLongClickRipple = (e: MouseEvent) => {
    // 只保留最后添加的 ripple
    addRipple(e, "enter");
  };

  const clearRippleArray = () => setRippleArray([]);

  return (
    <RippleContainer
      duration={merged.duration}
      color={merged.color}
      onMouseDown={(e) => {
        clickTimeout.start(clickDuration, () => {
          // 清理单击的 rippleArray 定时器，防止长按添加的 ripple 添加后被此定时器清理
          rippleArrayTimeout.clear();

          // 超时后清理 clickTimeout
          clickTimeout.reset();

          setLongClickRipple(e);
        });
      }}
      onMouseUp={(e) => {
        clickTimeout.clear();

        // 单击在鼠标抬起后添加退出动画
        if (clickTimeout.currentId) addRipple(e);
        else clearRippleArray();
      }}
      onMouseLeave={() => {
        clearRippleArray();
      }}
    >
      <For each={rippleArray}>
        {(item) => (
          <span
            class={`alley-button-ripple-${item.type}`}
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
          />
        )}
      </For>
    </RippleContainer>
  );
};

const max = (x: number, y: number) => (x > y ? x : y);

export default Ripple;
