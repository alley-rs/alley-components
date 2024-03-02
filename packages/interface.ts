import type { JSX } from "solid-js";

export type SizeType = "small" | "middle" | "large";

export interface BaseComponentProps {
  class?: string;
  style?: JSX.CSSProperties;
  children?: JSX.Element;
}

export interface BaseOnClickComponentProps<T extends HTMLElement>
  extends BaseComponentProps {
  onClick?: (event: MouseEvent & { currentTarget: T }) => void;
}

export type BaseNoChildrenComponentProps = Omit<BaseComponentProps, "children">;

export interface BaseSizeComponentProps extends BaseComponentProps {
  size?: SizeType;
}

export interface DirectionSizeComponentProps extends BaseComponentProps {
  direction?: string;
}
