import {
  Show,
  children,
  createEffect,
  createMemo,
  lazy,
  mergeProps,
  useContext,
} from "solid-js";
import type { JSXElement } from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import Ripple from "./ripple";
import type {
  BaseOnClickComponentProps,
  BaseSizeComponentProps,
} from "~/interface";
import { SpaceCompactContext } from "../space/compact";

const LazySpace = lazy(() => import("~/components/space"));
const LazySpinner = lazy(() => import("~/components/spinner"));

type ButtonType = "default" | "plain" | "primary";
type ButtonShape = "square" | "circle" | "round";

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
  rippleDuration?: number;
}

const baseClassName = "alley-button";

const Button = (props: ButtonProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const merged = mergeProps({ filter: true }, props);

  createEffect(() => {
    if (merged.shape === "circle") {
      if (!merged.icon)
        console.warn("圆形按钮仅适用于显示单图标，传入文字时可能会变形");
      else if (merged.children)
        console.warn("圆形按钮仅可显示一个图标，文字将会被省略");
    }
  });

  const disabled = createMemo(() => merged.isLoading || merged.disabled);
  const iconOnly = createMemo(
    () => merged.shape === "circle" || (merged.icon && !merged.children),
  );

  const size = () => spaceCompactItemSize ?? props.size;

  const spaceGap = createMemo(() =>
    size() === "small" ? 4 : size() === "large" ? 8 : 6,
  );

  const style = () =>
    !merged.filter || merged.filter === true
      ? merged.style
      : {
          "--filter-scale": merged.filter.scale,
          ...merged.style,
        };

  const className = () =>
    addClassNames(
      baseClassName,
      merged.class,
      merged.block && `${baseClassName}-block`,
      disabled() && `${baseClassName}-disabled`,
      merged.shape && `${baseClassName}-${merged.shape}`,
      merged.type && `${baseClassName}-${merged.type}`,
      size() && `${baseClassName}-${size()}`,
      iconOnly() && `${baseClassName}-icon-only`,
      merged.filter && `${baseClassName}-filter`,
      merged.danger && `${baseClassName}-danger`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
    );

  const resolved = children(() =>
    merged.icon && merged.children ? (
      <Show when={merged.shape !== "circle"} fallback={merged.icon}>
        <LazySpace align="center" gap={spaceGap()}>
          {merged.isLoading ? null : merged.icon}
          {merged.children}
        </LazySpace>
      </Show>
    ) : (
      merged.icon ||
      (typeof merged.children === "string"
        ? merged.children.length === 2 && isChineseChars(merged.children)
          ? addSpace(merged.children)
          : merged.children
        : merged.children)
    ),
  );

  const ripple = children(() => (
    <Show when={merged.type !== "plain"}>
      <Ripple
        color={
          merged.danger ? "var(--alley-color-button-ripple-danger)" : undefined
        }
        duration={merged.rippleDuration}
      />
    </Show>
  ));

  return (
    <button
      class={className()}
      onClick={merged.onClick}
      disabled={disabled()}
      style={style()}
    >
      <Show
        when={!merged.isLoading}
        fallback={
          <Loading size={merged.size} gap={spaceGap()} iconOnly={!!iconOnly()}>
            {resolved()}
          </Loading>
        }
      >
        {resolved()}

        {ripple()}
      </Show>
    </button>
  );
};

interface LoadingProps extends BaseSizeComponentProps {
  iconOnly: boolean;
  gap: number;
}

const Loading = (props: LoadingProps) => {
  const resolved = children(() => props.children);

  return (
    <Show when={!props.iconOnly} fallback={<LazySpinner size={props.size} />}>
      <LazySpace gap={props.gap} align="center">
        <LazySpinner size={props.size} />
        {resolved()}
      </LazySpace>
    </Show>
  );
};

const addSpace = (text: string): string => text[0] + " " + text[1];

const isChineseChars = (text: string): boolean => {
  const regex = /^[\u4E00-\u9FA5]+$/;

  return regex.test(text);
};

export default Button;
