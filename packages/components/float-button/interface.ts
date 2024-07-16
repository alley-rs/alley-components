import type { JSX } from "solid-js";
import type { ButtonProps } from "../button";

export interface FloatButtonProps extends ButtonProps {
  tooltip?: string;
  right?: number;
  bottom?: number;
}

export interface FloatGroupProps {
  id?: string;
  right?: number;
  bottom?: number;
  children: JSX.Element;
}
