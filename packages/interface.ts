import type { JSX } from "solid-js";

export type SizeType = "small" | "middle" | "large";
export type Direction = "left" | "center" | "right" | "top" | "bottom";
export type Placement =
  | ("top-left" | "top-right" | "bottom-left" | "bottom-right")
  | Direction;

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

export interface BaseDirectionComponentProps extends BaseComponentProps {
  direction?: Direction;
}

export interface BasePlacementComponentProps extends BaseComponentProps {
  placement?: Placement;
}
