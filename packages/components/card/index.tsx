import { Show, type JSXElement } from "solid-js";
import "./index.scss";
import type { BaseComponentProps } from "~/interface";

export interface CardProps extends BaseComponentProps {
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

  return (
    <div
      class={props.class ? `${baseClassName} ${props.class}` : baseClassName}
      style={style()}
    >
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
