import { addClassNames } from "~/utils";
import "./index.scss";
import type { InputProps } from "./interface";
import { mergeProps, useContext } from "solid-js";
import { SpaceCompactContext } from "../space/compact";

const baseClassName = "alley-input";

const Input = (props: InputProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const merged = mergeProps({ autocomplete: "off" }, props);

  const size = () => spaceCompactItemSize ?? merged.size;

  const className = () => {
    return addClassNames(
      baseClassName,
      size() && `${baseClassName}-${size()}`,
      merged.disabled && `${baseClassName}-disabled`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
    );
  };

  return (
    <input
      {...merged}
      type="text"
      class={className()}
      onChange={(e) => merged.onChange?.(e.target.value)}
      onInput={(e) => merged.onInput?.(e.target.value)}
    />
  );
};

export default Input;
