import { mergeProps, type JSX } from "solid-js";

type TextAreaTag = Omit<
  JSX.HTMLElementTags["textarea"],
  "size" | "onChange" | "onInput" | "prefix"
>;

export interface TextAreaProps extends TextAreaTag {
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  autocomplete?: "on" | "off";
}

const TextArea = (props: TextAreaProps) => {
  const merged = mergeProps({ autocomplete: "off" }, props);

  return (
    <textarea
      {...merged}
      class="alley-input"
      onChange={(e) => merged.onChange?.(e.target.value)}
      onInput={(e) => merged.onInput?.(e.target.value)}
    />
  );
};

export default TextArea;
