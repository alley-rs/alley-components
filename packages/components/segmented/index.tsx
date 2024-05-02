import { For, createMemo, createSignal, type JSXElement } from "solid-js";
import "./index.scss";
import { BaseNoChildrenComponentProps } from "~/interface";
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
  extends BaseNoChildrenComponentProps {
  options: SegmentedOptions<T>;
  onChange: (value: T) => void;
  disabled?: boolean;
}

const baseClassName = "alley-segmented";

const Segmented = (props: SegmentedProps) => {
  const segmentedOptions = createMemo(() => normalizeOptions(props.options));

  const [currentValue, setCurrentValue] = createSignal(
    segmentedOptions()[0].value,
  );

  const classes = () => addClassNames(baseClassName, props.class);

  const handleChange = (value: SegmentedValue) => {
    if (props.disabled) return;

    setCurrentValue(value);
    props.onChange(value);
  };

  return (
    <div class={classes()}>
      <div class={`${baseClassName}-group`}>
        <For each={segmentedOptions()}>
          {(item) => (
            <SegmentedItem
              checked={item.value === currentValue()}
              disabled={!!props.disabled || !!item.disabled}
              value={item.value}
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

interface SegmentedItemProps {
  disabled?: boolean;
  onChange: (value: string | number) => void;
  checked: boolean;
  value: string | number;
}

const SegmentedItem = (props: SegmentedItemProps) => {
  const handleClick = () => {
    if (props.disabled) return;

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
      <div class={`${baseClassName}-item-label`}>{props.value}</div>
    </label>
  );
};

export default Segmented;
