import { VsChevronDown, VsChevronUp } from "solid-icons/vs";
import { addClassNames } from "~/utils";
import "./index.scss";
import type { BaseSizeComponentProps } from "~/interface";
import { children, type JSX, Show, useContext } from "solid-js";
import { SpaceCompactContext } from "../space/context";

export interface InputNumberProps
  extends BaseSizeComponentProps<HTMLInputElement> {
  max?: number;
  min?: number;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  addonBefore?: JSX.Element;
  addonAfter?: JSX.Element;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
}

const baseClassName = "alley-input-number";

const InputNumber = (props: InputNumberProps) => {
  const { childClass: spaceCompactItemClass, size: spaceCompactItemSize } =
    useContext(SpaceCompactContext) ?? {};

  const size = () => spaceCompactItemSize ?? props.size;

  const className = () => {
    return addClassNames(
      baseClassName,
      `${baseClassName}-css-var`,
      size() && `${baseClassName}-${size()}`,
      props.disabled && `${baseClassName}-disabled`,
      spaceCompactItemClass,
      spaceCompactItemClass && `${baseClassName}-${spaceCompactItemClass}`,
      props.class,
    );
  };

  const single = children(() => (
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
            const val = props.value !== undefined ? props.value - 1 : 0;

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
  ));

  return (
    <Show when={props.addonBefore || props.addonAfter} fallback={single()}>
      <div
        class={`${baseClassName}-group-wrapper ${baseClassName}-group-wrapper-outlined ${baseClassName}-css-var`}
      >
        <div class={`${baseClassName}-wrapper ${baseClassName}-group`}>
          <Show when={props.addonBefore}>
            <div class={`${baseClassName}ant-input-number-group-addon`}>
              {props.addonBefore}
            </div>
          </Show>
          {single()}
          <Show when={props.addonAfter}>
            <div class={`${baseClassName}-group-addon`}>{props.addonAfter}</div>
          </Show>
        </div>
      </div>
    </Show>
  );
};

const validNumber = (value: string): number => {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? 0 : n;
};

export default InputNumber;
