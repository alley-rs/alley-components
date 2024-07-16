import { Show, type JSXElement } from "solid-js";
import "./index.scss";
import type { BaseComponentProps } from "~/interface";
import { addClassNames } from "~/utils";

export interface CardProps extends BaseComponentProps<HTMLDivElement> {
  title: JSXElement;
  extra?: JSXElement;
  onHeaderClick?: () => void;
  padding?: number | string;
}

const baseClassName = "alley-card";

const Card = (props: CardProps) => {
  const style = () => ({
    ...props.style,
    "--alley-card-padding": props.padding
      ? typeof props.padding === "number"
        ? `${props.padding}px`
        : props.padding
      : "var(--alley-padding-lg)",
  });

  const classes = () => addClassNames(baseClassName, props.class);

  return (
    <div ref={props.ref} id={props.id} class={classes()} style={style()}>
      <div class={`${baseClassName}-head`}>
        <div class={`${baseClassName}-head-wrapper`}>
          <Show
            when={props.extra}
            fallback={
              <div class={`${baseClassName}-head-title`}>{props.title}</div>
            }
          >
            <div class={`${baseClassName}-head-title`}>{props.title}</div>
            <div class={`${baseClassName}-head-extra`}>{props.extra}</div>
          </Show>
        </div>
      </div>

      <div class={`${baseClassName}-body`}>{props.children}</div>
    </div>
  );
};

export default Card;
