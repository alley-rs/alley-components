import { VsChevronDown, VsChevronUp } from "solid-icons/vs";
import { addClassNames } from "~/utils";
import "./index.scss";
import type { BaseSizeComponentProps } from "~/interface";
import { useContext } from "solid-js";
import { SpaceCompactContext } from "../space/compact";

export interface InputNumberProps
  extends BaseSizeComponentProps<HTMLInputElement> {
  max?: number;
  min?: number;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

const baseClassName = "alley-input-number";

const InputNumber = (props: InputNumberProps) => {
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
      props.class,
    );
  };

  return (
    <div class={className()}>
      <div class={`${baseClassName}-handler-wrap`}>
        <span
          class={`${baseClassName}-handler ${baseClassName}-handler-up`}
          onClick={() => {
            const val = props.value ? props.value + 1 : 1;

            if (props.max !== undefined)
              props.onChange?.(val > props.max ? props.max : val);
            else props.onChange?.(val);
          }}
        >
          <span class={`${baseClassName}-handler-up-inner`}>
            <VsChevronUp />
          </span>
        </span>
        <span
          class={`${baseClassName}-handler ${baseClassName}-handler-down`}
          onClick={() => {
            const val = props.value ? props.value - 1 : 0;

            if (props.min !== undefined)
              props.onChange?.(val < props.min ? props.min : val);
            else props.onChange?.(val);
          }}
        >
          <span class={`${baseClassName}-handler-down-inner`}>
            <VsChevronDown />
          </span>
        </span>
      </div>
      <div class={`${baseClassName}-input-wrap`}>
        <input
          id={props.id}
          ref={props.ref}
          class={`${baseClassName}-input`}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onInput={(e) => {
            const val = e.target.value.trim();
            const n = val ? validNumber(e.target.value) : 0;

            if (props.min !== undefined && n < props.min)
              props.onChange?.(props.min);
            else if (props.max !== undefined && n > props.max)
              props.onChange?.(props.max);
            else props.onChange?.(n);
          }}
        />
      </div>
    </div>
  );
};

const validNumber = (value: string): number => {
  const n = Number.parseInt(value);

  return n;
};

export default InputNumber;
