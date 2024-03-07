import type { JSXElement } from "solid-js";
import type { BaseSizeComponentProps } from "~/interface";

export interface InputProps extends BaseSizeComponentProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  onFocus?: (e: FocusEvent & { target: HTMLInputElement }) => void;
  onClick?: (
    e: MouseEvent & {
      currentTarget: HTMLInputElement;
      target: JSXElement;
    },
  ) => void;
}
