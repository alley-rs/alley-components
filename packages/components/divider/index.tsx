import { type JSX, Show, mergeProps } from "solid-js";
import { addClassNames } from "~/utils";
import "./index.scss";
import type { BaseComponentProps } from "~/interface";

const baseClassName = "alley-divider";

export interface DividerProps extends BaseComponentProps {
  type?: "vertical" | "horizontal";
  dashed?: boolean;
  orientation?: "left" | "right" | "center";
  orientationMargin?: number;
  plain?: boolean;
}

const Divider = (props: DividerProps) => {
  const merged = mergeProps(
    { type: "horizontal", orientation: "center" },
    props,
  );

  const classes = () =>
    addClassNames(
      baseClassName,
      `${baseClassName}-${merged.type}`,
      merged.dashed && `${baseClassName}-dashed`,
      merged.children && merged.plain && `${baseClassName}-plain`,
      merged.children && `${baseClassName}-with-text`,
      merged.children && `${baseClassName}-with-text-${merged.orientation}`,
      merged.orientationMargin &&
      `${baseClassName}-no-default-orientation-margin-${merged.orientation}`,
    );

  const style = () => {
    const stl = merged.style;

    return stl;
  };

  const textStyle = () => {
    const style: JSX.CSSProperties = {};

    if (merged.orientationMargin) {
      if (merged.orientation === "left") {
        style["margin-left"] = `${merged.orientationMargin}px`;
      } else {
        style["margin-right"] = `${merged.orientationMargin}px`;
      }
    }

    return style;
  };

  return (
    <div class={classes()} style={style()}>
      <Show when={merged.children}>
        <span class={`${baseClassName}-inner-text`} style={textStyle()}>
          {merged.children}
        </span>
      </Show>
    </div>
  );
};

export default Divider;
