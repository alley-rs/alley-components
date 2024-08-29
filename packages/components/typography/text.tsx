import { Match, Switch } from "solid-js";
import type { BaseComponentProps } from "~/interface";
import { addClassNames } from "~/utils";
import { baseClassName } from ".";
import "./text.scss";

export interface TextProps extends BaseComponentProps<HTMLSpanElement> {
  type?: "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
}

const Text = (props: TextProps) => {
  const classes = () =>
    addClassNames(
      props.class,
      baseClassName,
      props.type && `${baseClassName}-${props.type}`,
      props.disabled && `${baseClassName}-disabled`,
      props.code && `${baseClassName}-${props.code}`,
      props.keyboard && `${baseClassName}-${props.keyboard}`,
      props.underline && `${baseClassName}-${props.underline}`,
      props.delete && `${baseClassName}-${props.delete}`,
      props.strong && `${baseClassName}-${props.strong}`,
      props.italic && `${baseClassName}-${props.italic}`,
    );

  return (
    <span
      ref={props.ref}
      id={props.id}
      class={classes()}
      style={props.style}
      classList={props.classList}
    >
      <Switch fallback={props.children}>
        <Match when={props.mark}>
          <mark>{props.children}</mark>
        </Match>

        <Match when={props.code}>
          <code>{props.children}</code>
        </Match>

        <Match when={props.keyboard}>
          <kbd>{props.children}</kbd>
        </Match>

        <Match when={props.underline}>
          <u>{props.children}</u>
        </Match>

        <Match when={props.delete}>
          <del>{props.children}</del>
        </Match>

        <Match when={props.strong}>
          <strong>{props.children}</strong>
        </Match>

        <Match when={props.italic}>
          <i>{props.children}</i>
        </Match>
      </Switch>
    </span>
  );
};

export default Text;
