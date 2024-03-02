import { Show } from "solid-js";
import type { BaseComponentProps } from "../interface";
import { addClassNames } from "../utils";
import "./index.scss";

export interface LabelProps extends BaseComponentProps {
  colon?: boolean;
}

const baseClassName = "alley-label";

const Label = (props: LabelProps) => {
  const classes = () => addClassNames(baseClassName, props.class);
  const style = () => ({ ...props.style });

  return (
    <label class={classes()} style={style()}>
      {props.children}
      <Show when={props.colon}>：</Show>
    </label>
  );
};

export default Label;
