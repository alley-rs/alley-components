import { addClassNames } from "~/utils/class";
import "./index.scss";
import Flex, { FlexProps } from "../flex";
import type { BaseComponentProps } from "~/interface";

type Span =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

export interface ColProps extends BaseComponentProps {
  gutter?: number;
  span?: Span;
  align?: FlexProps["align"];
  justify?: FlexProps["justify"];
}

const baseClassName = "col";

const Col = (props: ColProps) => {
  const className = () =>
    addClassNames(
      baseClassName,
      props.span ? `${baseClassName}-${props.span}` : "",
      props.class || "",
    );

  const style = () =>
    props.gutter
      ? {
        ...props.style,
        "padding-left": props.gutter + "px",
        "padding-right": props.gutter + "px",
      }
      : props.style;

  return (
    <div class={className()} style={style()}>
      <Flex
        inline
        style={{ height: "100%", "max-width": "100%", width: "100%" }}
        align={props.align}
        justify={props.justify}
      >
        {props.children}
      </Flex>
    </div>
  );
};

export default Col;
