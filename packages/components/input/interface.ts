import type { JSX } from "solid-js";
import type { BaseSizeComponentProps } from "~/interface";

type InputTag = Omit<
  JSX.HTMLElementTags["input"],
  "size" | "style" | "onChange" | "onInput" | "prefix"
>;

export interface InputProps
  extends BaseSizeComponentProps<HTMLInputElement>,
    InputTag {
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  autocomplete?: "on" | "off";
  prefix?: JSX.Element;
  suffix?: JSX.Element;
}
