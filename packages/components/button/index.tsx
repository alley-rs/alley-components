import { Show, mergeProps, useContext } from "solid-js";
import type { JSXElement } from "solid-js";
import { addClassNames } from "~/utils/class";
import "./index.scss";
import Ripple from "./ripple";
import type {
  BaseOnClickComponentProps,
  BaseSizeComponentProps,
} from "~/interface";
import Spinner from "../spinner";
import { SpaceCompactContext } from "../space/compact";

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
  rippleDuration?: number;
}

const baseClassName = "alley-button";

const Button = (props: ButtonProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const merged = mergeProps({ filter: { scale: 1.1 } }, props);

  const size = () => spaceCompactItemSize ?? props.size;

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
      merged.block && "block",
      (merged.isLoading || merged.disabled) && "disabled",
      merged.shape,
      merged.type,
      size() && `${baseClassName}-${size()}`,
      merged.filter && `${baseClassName}-filter`,
      merged.danger && `${baseClassName}-danger`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
    );

  const children =
    merged.icon && merged.children ? (
      <>
        {merged.icon}&nbsp;{merged.children}
      </>
    ) : (
      merged.icon ||
      (typeof merged.children === "string"
        ? merged.children.length === 2 && isChineseChars(merged.children)
          ? addSpace(merged.children)
          : merged.children
        : merged.children)
    );

  return (
    <button
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
            duration={merged.rippleDuration}
          />
        </Show>
      </Show>
    </button>
  );
};

const addSpace = (text: string): string => text[0] + " " + text[1];

const isChineseChars = (text: string): boolean => {
  const regex = /^[\u4E00-\u9FA5]+$/;

  return regex.test(text);
};

export default Button;
