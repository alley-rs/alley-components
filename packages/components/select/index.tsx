import {
  children,
  createEffect,
  createSignal,
  For,
  mergeProps,
  onCleanup,
  Show,
  type JSX,
} from "solid-js";
import "./index.scss";
import type { BaseNoChildrenComponentProps, SizeType } from "~/interface";
import { classList } from "~/utils";
import { AiOutlineDown, AiOutlineUp } from "solid-icons/ai";
import { Portal } from "solid-js/web";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends BaseNoChildrenComponentProps<HTMLDivElement> {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  position?: "top" | "bottom";
  size?: SizeType;
  prefix?: JSX.Element;
  suffixIcon?: JSX.Element;
  onChange?: (value: string) => void;
}

const baseClass = "alley-select";

const Select = (props: SelectProps) => {
  let ref: HTMLDivElement | undefined;

  const merged = mergeProps({ position: "bottom" }, props);

  const [selectedValue, setSelectedValue] = createSignal(
    merged.defaultValue || "",
  );
  const [isOpen, setIsOpen] = createSignal(false);
  const [dropdownStyle, setDropdownStyle] = createSignal(merged.style);

  const updateStyle = () => {
    const rect = ref!.getBoundingClientRect();
    setDropdownStyle((prev) => ({
      ...(prev ?? {}),
      top: `${rect.top + rect.height + 4}px`,
      left: `${rect.left}px`,
    }));
  };

  createEffect(() => {
    if (isOpen()) {
      updateStyle();
      window.addEventListener("resize", updateStyle);
      window.addEventListener("scroll", updateStyle);
    } else {
      window.removeEventListener("resize", updateStyle);
      window.removeEventListener("scroll", updateStyle);
    }
  });

  onCleanup(() => {
    window.removeEventListener("resize", updateStyle);
    window.removeEventListener("scroll", updateStyle);
  });

  const classes = () =>
    classList({
      base: baseClass,
      others: {
        [`${baseClass}-${merged.size}`]: !!merged.size,
        [`${baseClass}-open`]: isOpen(),
      },
    });

  const toggleDropdown = () => setIsOpen(!isOpen());
  const selectOption = (option: SelectOption) => {
    setSelectedValue(option.value);
    merged.onChange?.(option.value);
    setIsOpen(false);
  };

  const selectedLabel = children(() => {
    const selectedOption = merged.options.find(
      (option) => option.value === selectedValue(),
    );
    return selectedOption ? (
      <span>{selectedOption.label}</span>
    ) : (
      <span class={`${baseClass}-placeholder`}>{merged.placeholder}</span> || ""
    );
  });

  return (
    <div ref={ref} classList={classes()} style={merged.style}>
      <div class={`${baseClass}-selector`} onClick={toggleDropdown}>
        <Show when={merged.prefix}>
          <div class={`${baseClass}-prefix`}>{merged.prefix}</div>
        </Show>
        {selectedLabel()}
      </div>

      <span class={`${baseClass}-arrow`}>
        <Show when={!merged.suffixIcon} fallback={merged.suffixIcon}>
          <Show when={isOpen()} fallback={<AiOutlineDown />}>
            <AiOutlineUp />
          </Show>
        </Show>
      </span>

      <Show when={isOpen()}>
        <Portal>
          <div
            classList={{
              [`${baseClass}-dropdown`]: true,
              [`${baseClass}-${merged.position}`]: true,
            }}
            style={dropdownStyle()}
          >
            <ul>
              <For each={merged.options}>
                {(option) => (
                  <li
                    classList={{
                      [`${baseClass}-item-option`]: true,
                      [`${baseClass}-item-option-selected`]:
                        option.value === selectedValue(),
                    }}
                    onClick={() => selectOption(option)}
                  >
                    {option.label}
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Portal>
      </Show>
    </div>
  );
};

export default Select;
