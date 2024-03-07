import type { JSX } from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import type { BaseComponentProps } from "~/interface";

type Position = "center" | "start" | "end";

export interface FlexProps extends BaseComponentProps {
  justify?: Position | "round" | "between";
  align?: Position;
  flex?: number;
  direction?: "horizontal" | "vertical";
  inline?: boolean;
}

const baseClassName = "flex";

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
      props.class || "",
    );

  const style = (): JSX.CSSProperties | undefined =>
    props.flex
      ? { ...props.style, flex: `${props.flex} ${props.flex} auto` }
      : props.style;

  return (
    <div class={className()} style={style()}>
      {props.children}
    </div>
  );
};

export default Flex;
