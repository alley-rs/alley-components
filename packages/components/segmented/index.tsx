import { For, createMemo, createSignal, type JSXElement } from "solid-js";
import "./index.scss";
import type { BaseNoChildrenComponentProps } from "~/interface";
import { addClassNames, classList } from "~/utils";

export type SegmentedValue = string | number;

export interface SegmentedLabeledOption<ValueType = SegmentedValue> {
  class?: string;
  disabled?: boolean;
  label: JSXElement;
  value: ValueType;
  /**
   * html `title` property for label
   */
  title?: string;
}

export type SegmentedOptions<T = SegmentedValue> = (
  | T
  | SegmentedLabeledOption<T>
)[];

export interface SegmentedProps<T = SegmentedValue>
  extends BaseNoChildrenComponentProps<HTMLDivElement> {
  options: SegmentedOptions<T>;
  onChange: (value: T) => void;
  disabled?: boolean;
}

const baseClassName = "alley-segmented";

const Segmented = <T extends SegmentedValue>(props: SegmentedProps<T>) => {
  const segmentedOptions = createMemo(() => normalizeOptions(props.options));

  const [currentValue, setCurrentValue] = createSignal(
    segmentedOptions()[0].value,
  );

  const classes = () => addClassNames(baseClassName, props.class);

  const handleChange = (value: T) => {
    if (props.disabled) return;

    // @ts-ignore
    setCurrentValue(value);
    props.onChange(value);
  };

  return (
    <div ref={props.ref} id={props.id} class={classes()}>
      <div class={`${baseClassName}-group`}>
        <For each={segmentedOptions()}>
          {(item) => (
            <SegmentedItem
              checked={item.value === currentValue()}
              disabled={!!props.disabled || !!item.disabled}
              value={item.value}
              label={item.label}
              onChange={handleChange}
            />
          )}
        </For>
      </div>
    </div>
  );
};

const normalizeOptions = <T extends SegmentedValue>(
  options: SegmentedOptions<T>,
) => {
  return options.map((option) => {
    if (typeof option === "object" && option !== null) {
      return option;
    }

    return {
      label: option.toString(),
      title: option.toString(),
      value: option,
    };
  });
};

interface SegmentedItemProps<T> {
  disabled?: boolean;
  onChange: (value: T) => void;
  checked: boolean;
  value: T;
  label: JSXElement;
}

const SegmentedItem = <T extends SegmentedValue>(
  props: SegmentedItemProps<T>,
) => {
  const handleClick = () => {
    if (props.disabled || props.checked) return;

    props.onChange(props.value);
  };

  return (
    <label
      classList={classList({
        base: `${baseClassName}-item`,
        others: {
          [`${baseClassName}-item-disabled`]: props.disabled,
          [`${baseClassName}-item-selected`]: props.checked,
        },
      })}
      onClick={handleClick}
    >
      <div class={`${baseClassName}-item-label`}>{props.label}</div>
    </label>
  );
};

export default Segmented;
