import { Show, createSignal, mergeProps, onMount } from "solid-js";
import type { JSXElement } from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import Ripple from "./ripple";
import type {
  BaseOnClickComponentProps,
  BaseSizeComponentProps,
} from "~/interface";
import Spinner from "../spinner";

type ButtonType = "default" | "plain";
type ButtonShape = "square" | "circle";

interface Filter {
  scale: number;
}

export interface ButtonProps
  extends BaseOnClickComponentProps<HTMLButtonElement>,
  BaseSizeComponentProps {
  icon?: JSXElement;
  block?: boolean;
  disabled?: boolean;
  shape?: ButtonShape;
  type?: ButtonType;
  filter?: boolean | Filter;
  danger?: boolean;
  isLoading?: boolean;
}

const baseClassName = "alley-button";

const Button = (props: ButtonProps) => {
  // ref 用来获取 compact 样式
  let ref: HTMLButtonElement | undefined;

  const merged = mergeProps({ filter: { scale: 1.1 } }, props);

  const style = () =>
    !merged.filter || merged.filter === true
      ? merged.style
      : {
        "--filter-scale": merged.filter.scale,
        ...merged.style,
      };

  // 保存 compact 样式
  const [classList, setClassList] = createSignal<string[]>([]);

  onMount(() => {
    const arr: string[] = [];
    ref!.classList.forEach((v) => arr.push(v));

    setClassList(arr);
  });

  const className = () => {
    // 之前有 compact 样式时只修改 disabled
    if (
      classList().length &&
      classList().includes(`${baseClassName}-compact-item`)
    ) {
      if (!merged.disabled && classList().includes("disabled")) {
        setClassList((prev) => {
          const idx = prev.indexOf("disabled");

          return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        });
      } else if (merged.disabled && !classList().includes("disabled")) {
        setClassList((prev) => [...prev, "disabled"]);
      }

      return classList().join(" ");
    }

    const classListStr = addClassNames(
      baseClassName,
      merged.class,
      merged.block && "block",
      (merged.isLoading || merged.disabled) && "disabled",
      merged.shape,
      merged.type,
      merged.size && `${baseClassName}-${merged.size}`,
      merged.filter && `${baseClassName}-filter`,
      merged.danger && `${baseClassName}-danger`,
    );

    return classListStr;
  };

  const children =
    merged.icon && merged.children ? (
      <>
        {merged.icon}&nbsp;{merged.children}
      </>
    ) : (
      merged.icon || merged.children
    );

  return (
    <button
      ref={ref}
      class={className()}
      onClick={merged.onClick}
      disabled={merged.isLoading || merged.disabled}
      style={style()}
    >
      <Show when={!merged.isLoading} fallback={<Spinner size={merged.size} />}>
        {children}
        <Show when={merged.type !== "plain"}>
          <Ripple
            color={
              merged.danger
                ? "var(--alley-color-button-ripple-danger)"
                : undefined
            }
          />
        </Show>
      </Show>
    </button>
  );
};

export default Button;
