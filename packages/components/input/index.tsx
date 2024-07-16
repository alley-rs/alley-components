import { addClassNames } from "~/utils";
import "./index.scss";
import type { InputProps } from "./interface";
import { useContext } from "solid-js";
import { SpaceCompactContext } from "../space/compact";

const baseClassName = "alley-input";

const Input = (props: InputProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const size = () => spaceCompactItemSize ?? props.size;

  const className = () => {
    return addClassNames(
      baseClassName,
      size() && `${baseClassName}-${size()}`,
      props.disabled && `${baseClassName}-disabled`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
    );
  };

  return (
    <input
      type="text"
      id={props.id}
      class={className()}
      placeholder={props.placeholder}
      value={props.value ?? ""}
      onChange={(e) => props.onChange?.(e.target.value)}
      disabled={props.disabled}
      style={props.style}
      autofocus={props.autofocus}
      onFocus={props.onFocus}
      onClick={props.onClick}
    />
  );
};

export default Input;
