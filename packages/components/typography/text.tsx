import {
  children,
  createMemo,
  createSignal,
  lazy,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import type { BaseComponentProps } from "~/interface";
import { addClassNames } from "~/utils";
import { baseClassName } from ".";
import "./text.scss";
import type { TooltipProps } from "../tooltip";

const Tooltip = lazy(() => import("../tooltip"));

interface EllipsisConfig {
  rows?: number;
  tooltip?: TooltipProps;
}

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
  ellipsis?: EllipsisConfig;
}

const Text = (props: TextProps) => {
  const [ref, setRef] = createSignal<HTMLSpanElement | null>(null);
  const [isEllipsis, setIsEllipsis] = createSignal(false);

  const classes = createMemo(() =>
    addClassNames(
      props.class,
      baseClassName,
      props.type && `${baseClassName}-${props.type}`,
      props.disabled && `${baseClassName}-disabled`,
      props.code && `${baseClassName}-code`,
      props.keyboard && `${baseClassName}-${props.keyboard}`,
      props.underline && `${baseClassName}-${props.underline}`,
      props.delete && `${baseClassName}-${props.delete}`,
      props.strong && `${baseClassName}-${props.strong}`,
      props.italic && `${baseClassName}-${props.italic}`,
      props.ellipsis && `${baseClassName}-ellipsis`,
    ),
  );

  const updateEllipsis = () => {
    const element = ref();
    if (props.ellipsis && element) {
      const lineHeight = Number.parseInt(getComputedStyle(element).lineHeight);
      const rows = props.ellipsis.rows || 1;
      const maxHeight = rows * lineHeight;

      if (element.scrollHeight > maxHeight) {
        element.style.maxHeight = `${maxHeight}px`;
        element.style.overflow = "hidden";
        element.style.textOverflow = "ellipsis";
        element.style.display = "-webkit-box";
        element.style.webkitBoxOrient = "vertical";
        element.style.webkitLineClamp = rows.toString();
        setIsEllipsis(true);
      } else {
        element.style.maxHeight = "";
        element.style.overflow = "";
        element.style.textOverflow = "";
        element.style.display = "";
        element.style.webkitBoxOrient = "";
        element.style.webkitLineClamp = "";
        setIsEllipsis(false);
      }
    }
  };

  onMount(() => {
    const element = ref();
    if (element) {
      updateEllipsis();

      const resizeObserver = new ResizeObserver(() => {
        updateEllipsis();
      });

      resizeObserver.observe(element);

      onCleanup(() => {
        resizeObserver.disconnect();
      });
    }
  });

  const TextContent = children(() => (
    <span
      ref={setRef}
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
  ));

  return (
    <Show
      when={props.ellipsis?.tooltip && isEllipsis()}
      fallback={<TextContent />}
    >
      <Tooltip {...props.ellipsis!.tooltip!}>
        <TextContent />
      </Tooltip>
    </Show>
  );
};

export default Text;
