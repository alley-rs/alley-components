import type { JSX } from "solid-js";
import type { ButtonProps } from "../button";

export interface FloatButtonProps extends Omit<ButtonProps, "ref"> {
  ref?: HTMLDivElement | ((e: HTMLDivElement) => void);
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
