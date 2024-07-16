import { createEffect, createSignal, For } from "solid-js";
import "./index.scss";
import { addClassNames } from "~/utils/class";
import type { BaseComponentProps } from "~/interface";

export interface DropdownProps extends BaseComponentProps<HTMLDivElement> {
  open?: boolean;
  menu: MenuItemProps[];
  top?: number;
  left?: number;
}

const baseClassName = "dropdown";

const Dropdown = (props: DropdownProps) => {
  const [isOpen, setOpen] = createSignal(props.open);

  const style = () => ({
    top: `${props.top ?? 30}px`,
    left: `${props.left ?? 280}px`,
  });

  createEffect(() => {
    if (props.open !== undefined) setOpen(props.open);
  });

  const className = () =>
    addClassNames(
      baseClassName,
      !isOpen() && `${baseClassName}-hidden`,
      props.class || "",
    );

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      ref={props.ref}
      id={props.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div class={className()} style={style()}>
        <div class={`${baseClassName}-menu`}>
          <For each={props.menu}>
            {(item) => (
              <MenuItem
                {...item}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
              />
            )}
          </For>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <li class={`${baseClassName}-menu-item`}>
      <span class={`${baseClassName}-menu-title-content`}>
        <a onClick={props.onClick}>{props.label}</a>
      </span>
    </li>
  );
};

export default Dropdown;
