import type { BaseComponentProps } from "~/interface";
import "./index.scss";
import Title from "./title";
import Text from "./text";
import { addClassNames } from "~/utils";

export interface TypographyProps extends BaseComponentProps<HTMLSpanElement> { }

export const baseClassName = "alley-typography";

const Typography = (props: TypographyProps) => {
  const classes = () => addClassNames(baseClassName, props.class);

  return (
    <span id={props.id} ref={props.ref} class={classes()} style={props.style}>
      {props.children}
    </span>
  );
};

Typography.Title = Title;
Typography.Text = Text;

export default Typography;
