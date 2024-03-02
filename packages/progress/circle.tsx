import { Show, createEffect, mergeProps } from "solid-js";
import "./circle.scss";
import { addClassNames } from "../utils";
import type { SizeType } from "../interface";

export interface CircleProgressProps {
  percent: number;
  trackWidth?: number;
  trackColor?: string;
  fillColor?: string;
  size?: SizeType | number;
  showLabel?: boolean;
  text?: {
    undone: string;
    done: string;
  };
  onDone?: () => void;
}

const baseClassName = "alley-progress-circle";

const CircleProgress = (props: CircleProgressProps) => {
  const merged = mergeProps(
    { trackWidth: 6, trackColor: "#2b2b2b", fillColor: "var(--color-primary)" },
    props,
  );

  createEffect(() => {
    merged.percent === 100 && merged.onDone?.();
  });

  const classes = () => addClassNames(baseClassName);

  const size = () => {
    if (typeof merged.size === "number")
      return {
        "--size": `${merged.size}px`,
        "--track-width": `${merged.trackWidth}px`,
      };

    switch (merged.size) {
      case "small":
        return {
          "--size": "20px",
          "--track-width": "3px",
          "--font-size": "0",
        };
      case "large":
        return {
          "--size": "140px",
          "--track-width": `16px`,
          "--font-size": "24px",
        };
      default:
        return {
          "--size": "50px",
          "--track-width": "6px",
          "--font-size": "10px",
        };
    }
  };

  const style = () => ({
    ...size(),
    "--percent": merged.percent.toString(),
    "--track-color": merged.trackColor,
    "--fill-color":
      merged.percent === 100 ? "var(--color-success)" : merged.fillColor,
  });

  return (
    <div class={classes()} style={style()}>
      <div class={`${baseClassName}-content`}>
        <svg class={`${baseClassName}-svg`}>
          <circle class={`${baseClassName}-track`} fill="transparent" />
          <circle class={`${baseClassName}-fill`} fill="transparent" />
        </svg>

        <div class={`${baseClassName}-info`}>{`${merged.percent}%`}</div>
      </div>

      <Show when={merged.text}>
        <div class={`${baseClassName}-text`}>
          {merged.percent < 100 ? merged.text?.undone : merged.text?.done}
        </div>
      </Show>
    </div>
  );
};

export default CircleProgress;
