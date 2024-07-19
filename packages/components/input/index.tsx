import { addClassNames } from "~/utils";
import "./index.scss";
import type { InputProps } from "./interface";
import { mergeProps, Show, splitProps, useContext } from "solid-js";
import { SpaceCompactContext } from "../space/compact";

const baseClassName = "alley-input";

const Input = (props: InputProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const merged = mergeProps({ autocomplete: "off" }, props);
  const [extraProps, inputProps] = splitProps(merged, [
    "prefix",
    "suffix",
    "style",
    "classList",
  ]);

  const size = () => spaceCompactItemSize ?? inputProps.size;

  const containerClassName = () => {
    return addClassNames(
      baseClassName,
      size() && `${baseClassName}-${size()}`,
      inputProps.disabled && `${baseClassName}-disabled`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
    );
  };

  return (
    <span
      class={containerClassName()}
      classList={extraProps.classList}
      style={extraProps.style}
    >
      <input
        {...inputProps}
        type="text"
        class={`${baseClassName}-input`}
        onChange={(e) => inputProps.onChange?.(e.target.value)}
        onInput={(e) => inputProps.onInput?.(e.target.value)}
      />

      <Show when={extraProps.suffix}>
        <span class={`${baseClassName}-suffix`}>{extraProps.suffix}</span>
      </Show>
    </span>
  );
};

export default Input;
