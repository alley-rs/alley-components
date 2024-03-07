import type { JSX } from "solid-js";
import { mergeProps } from "solid-js";
import { addClassNames } from "~/utils";
import type { BaseSizeComponentProps } from "~/interface";
import "./index.scss";

const baseClassName = "alley-spinner";

export interface SpinnerProps extends BaseSizeComponentProps {
  label?: string;
  emptyColor?: string; // 空区域颜色
  color?: string; // 标识颜色
  thickness?: string; // 标识粗细
  speed?: string; // 动画速度
}

const Spinner = (props: SpinnerProps) => {
  const merged = mergeProps(
    {
      label: "加载中...",
      thickness: "2px",
      speed: "0.45s",
      emptyColor: "transparent",
    },
    props,
  );

  const classes = () =>
    addClassNames(
      baseClassName,
      props.size && `${baseClassName}-${props.size}`,
      merged.class,
    );

  const style = (): JSX.CSSProperties => ({
    ...merged.style,
    color: merged.color,
    "--alley-spinner-thickness": merged.thickness,
    "--alley-spinner-empty-color": merged.emptyColor,
    "--alley-spinner-animation-speed": merged.speed,
  });

  return <div class={classes()} style={style()} />;
};

export default Spinner;
