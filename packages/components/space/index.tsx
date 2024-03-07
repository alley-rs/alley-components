import { For } from "solid-js";
import type { JSX } from "solid-js";
import { addClassNames } from "~/utils";
import "./index.scss";
import type { BaseOnClickComponentProps } from "~/interface";

const baseClassName = "space";

export interface SpaceProps extends BaseOnClickComponentProps<HTMLDivElement> {
  wrap?: boolean;
  direction?: "vertical" | "horizontal";
  gap?: number | string;
  block?: boolean;
  align?: "start" | "end" | "center" | "baseline";
  justify?:
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
}

const Space = (props: SpaceProps) => {
  const classNames = () =>
    addClassNames(
      baseClassName,
      props.class,
      props.wrap ? `${baseClassName}-wrap` : undefined,
      `${baseClassName}-${props.direction || "horizontal"}`,
      props.block ? `${baseClassName}-block` : undefined,
      props.align ? `${baseClassName}-align-${props.align}` : undefined,
      props.justify ? `${baseClassName}-justify-${props.justify}` : undefined,
    );

  const style = (): JSX.CSSProperties => ({
    ...props.style,
    "--gap": props.gap
      ? typeof props.gap === "number"
        ? `${props.gap}px`
        : props.gap
      : 0,
  });

  return (
    <div class={classNames()} style={style()} onClick={props.onClick}>
      <For
        each={Array.isArray(props.children) ? props.children : [props.children]}
      >
        {(item) => <div class={`${baseClassName}-item`}>{item}</div>}
      </For>
    </div>
  );
};

export default Space;
