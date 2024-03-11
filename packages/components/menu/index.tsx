import { For, Show, createSignal } from "solid-js";
import type { JSX } from "solid-js";
import type { BaseNoChildrenComponentProps } from "~/interface";
import "./index.scss";
import { addClassNames } from "~/utils";
import MenuItem from "./menu-item";

export interface MenuItemOption extends BaseNoChildrenComponentProps {
  icon?: JSX.Element;
  children: JSX.Element;
  onClick?: () => void;
}

export const baseClassName = "alley-menu";

export interface MenuProps extends BaseNoChildrenComponentProps {
  items: (MenuItemOption | "divider")[];
  defaultSelectedIndex?: number;
}

const Menu = (props: MenuProps) => {
  const [selectedIndex, setSelectedIndex] = createSignal<number | undefined>(
    props.defaultSelectedIndex,
  );

  const classes = () => addClassNames(baseClassName, props.class);
  const style = () => props.style;

  const onMenuItemClick = (index: number) => {
    if (index === selectedIndex()) return;

    if (typeof props.items[index] === "object")
      (props.items[index] as MenuItemOption).onClick?.();

    setSelectedIndex(index);
  };

  return (
    <ul class={classes()} style={style()}>
      <For each={props.items}>
        {(item, index) => (
          <Show
            when={typeof item === "object"}
            fallback={<li class={`${baseClassName}-item-divider`} />}
          >
            <MenuItem
              icon={(item as MenuItemOption).icon}
              onClick={() => onMenuItemClick(index())}
              selected={selectedIndex() === index()}
            >
              {(item as MenuItemOption).children}
            </MenuItem>
          </Show>
        )}
      </For>
    </ul>
  );
};

export default Menu;
