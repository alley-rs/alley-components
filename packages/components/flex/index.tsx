import type { JSX } from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import type { BaseComponentProps } from "~/interface";

type Position = "center" | "start" | "end";

export interface FlexProps extends BaseComponentProps<HTMLDivElement> {
  justify?: Position | "round" | "between";
  align?: Position;
  flex?: number;
  direction?: "horizontal" | "vertical";
  inline?: boolean;
  gap?: "small" | "middle" | "large" | number;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
}

const baseClassName = "alley-flex";

const Flex = (props: FlexProps) => {
  const className = () =>
    addClassNames(
      baseClassName,
      props.inline && `${baseClassName}-inline`,
      props.justify ? `${baseClassName}__justify-${props.justify}` : "",
      props.align ? `${baseClassName}__align-${props.align}` : "",
      props.direction
        ? `${baseClassName}__${props.direction}`
        : `${baseClassName}__horizontal`,
      props.gap !== undefined &&
      typeof props.gap === "string" &&
      `${baseClassName}-gap-${props.gap}`,
      props.wrap && `${baseClassName}-wrap-${props.wrap}`,
      props.class || "",
    );

  const style = (): JSX.CSSProperties | undefined => {
    const stl = { ...props.style };

    if (props.flex) stl.flex = props.flex;

    if (props.gap) {
      stl["row-gap"] = `${props.gap}px`;
      stl["column-gap"] = `${props.gap}px`;
    }

    return stl;
  };

  return (
    <div ref={props.ref} id={props.id} class={className()} style={style()}>
      {props.children}
    </div>
  );
};

export default Flex;
