import "./index.scss";
import { addClassNames } from "~/utils/class";
import type { BaseOnClickComponentProps } from "~/interface";

export interface RowProps extends BaseOnClickComponentProps<HTMLDivElement> {
  gutter?: number;
}

const baseClassName = "row";

const Row = (props: RowProps) => {
  const className = () => addClassNames(baseClassName, props.class || "");

  const style = () =>
    props.gutter
      ? {
          ...props.style,
          "row-gap": `${props.gutter}px`,
        }
      : props.style;

  return (
    <div class={className()} style={style()} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Row;
