import {
  For,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
} from "solid-js";
import type { JSXElement } from "solid-js";

interface RippleContainerProps {
  children: JSXElement;
  color: string;
  duration: number;
  onMouseDown: (e: MouseEvent & { currentTarget: HTMLDivElement }) => void;
}

const RippleContainer = (props: RippleContainerProps) => {
  const style = () => ({
    "--alley-button-ripple-container": props.color,
    "--alley-button-ripple-duration": `${props.duration}ms`,
  });

  return (
    <div
      class="alley-button-ripple-container"
      style={style()}
      onMouseDown={props.onMouseDown}
    >
      {props.children}
    </div>
  );
};

interface RippleItem {
  x: number;
  y: number;
  size: number;
}

interface RippleProps {
  duration?: number;
  color?: string;
}

const Ripple = (props: RippleProps) => {
  const merged = mergeProps({ duration: 1000 }, props);

  const [rippleArray, setRippleArray] = createSignal<RippleItem[]>([]);

  createEffect(() => {
    if (rippleArray().length === 0) return;
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setRippleArray([]);
      clearTimeout(timeoutId);
    }, merged.duration);

    onCleanup(() => clearTimeout(timeoutId));
  });

  const addRipple = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const {
      width,
      height,
      x: rectX,
      y: rectY,
    } = target.getBoundingClientRect();

    const size = width > height ? width : height;

    const x = e.clientX - rectX - size / 2;
    const y = e.clientY - rectY - size / 2;

    const ripple = { x, y, size };

    setRippleArray((prev) => [...prev, ripple]);
  };

  return (
    <RippleContainer
      duration={merged.duration ?? 500}
      color={merged.color ?? "var(--alley-color-button-ripple)"}
      onMouseDown={addRipple}
    >
      <For each={rippleArray()}>
        {({ x, y, size }) => (
          <span
            style={{
              top: `${y}px`,
              left: `${x}px`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        )}
      </For>
    </RippleContainer>
  );
};

export default Ripple;
