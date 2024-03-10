import { Match, Switch, mergeProps } from "solid-js";
import type { BaseComponentProps } from "~/interface";
import { addClassNames } from "~/utils";
import { baseClassName } from ".";
import "./title.scss";

export interface TitleProps extends BaseComponentProps {
  level?: 1 | 2 | 3 | 4 | 5;
}

const Title = (props: TitleProps) => {
  const merged = mergeProps({ level: 1 }, props);

  const classes = () => addClassNames(baseClassName, props.class);

  return (
    <Switch>
      <Match when={merged.level === 1}>
        <h1 class={classes()}>{merged.children}</h1>
      </Match>

      <Match when={merged.level === 2}>
        <h2 class={classes()}>{merged.children}</h2>
      </Match>

      <Match when={merged.level === 3}>
        <h3 class={classes()}>{merged.children}</h3>
      </Match>

      <Match when={merged.level === 4}>
        <h4 class={classes()}>{merged.children}</h4>
      </Match>

      <Match when={merged.level === 5}>
        <h5 class={classes()}>{merged.children}</h5>
      </Match>
    </Switch>
  );
};

export default Title;
