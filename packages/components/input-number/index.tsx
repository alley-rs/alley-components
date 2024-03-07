import { createSignal, onMount } from "solid-js";
import { VsChevronDown, VsChevronUp } from "solid-icons/vs";
import { addClassNames } from "~/utils";
import "./index.scss";
import type { BaseSizeComponentProps } from "~/interface";

export interface InputNumberProps extends BaseSizeComponentProps {
  max?: number;
  min?: number;
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

const baseClassName = "alley-input-number";

const InputNumber = (props: InputNumberProps) => {
  // ref 用来获取 compact 样式
  let ref: HTMLInputElement | undefined;

  // 保存 compact 样式
  const [classList, setClassList] = createSignal<string[]>([]);

  onMount(() => {
    const arr: string[] = [];
    ref!.classList.forEach((v) => arr.push(v));

    setClassList(arr);
  });

  const className = () => {
    // 之前有 compact 样式时只修改 disabled
    if (
      classList().length &&
      classList().includes(`${baseClassName}-compact-item`)
    ) {
      const disabledClass = `${baseClassName}-disabled`;
      if (!props.disabled && classList().includes(disabledClass)) {
        setClassList((prev) => {
          const idx = prev.indexOf(disabledClass);

          return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        });
      } else if (props.disabled && !classList().includes(disabledClass)) {
        setClassList((prev) => [...prev, disabledClass]);
      }

      return classList().join(" ");
    }

    return addClassNames(
      baseClassName,
      props.size && `${baseClassName}-${props.size}`,
      props.disabled && `${baseClassName}-disabled`,
      props.class,
    );
  };

  return (
    <div class={className()} ref={ref}>
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
  const n = parseInt(value);

  return n;
};

export default InputNumber;
