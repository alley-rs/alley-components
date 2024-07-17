import { Show, lazy, type JSX } from "solid-js";
import type { BaseNoChildrenComponentProps } from "~/interface";
import { addClassNames } from "~/utils";
import { baseClassName } from ".";

const LazyFlex = lazy(() => import("~/components/flex"));

export interface MenuItemProps
  extends BaseNoChildrenComponentProps<HTMLLIElement> {
  icon?: JSX.Element;
  children: JSX.Element;
  selected?: boolean;
  onClick: () => void;
}

const MenuItem = (props: MenuItemProps) => {
  const classes = () =>
    addClassNames(
      `${baseClassName}-item`,
      props.class,
      props.selected && `${baseClassName}-item-selected`,
    );
  const style = () => props.style;

  return (
    <li
      ref={props.ref}
      id={props.id}
      class={classes()}
      style={style()}
      onClick={props.onClick}
    >
      <Show when={props.icon} fallback={props.children}>
        <LazyFlex>
          {props.icon}
          {props.children}
        </LazyFlex>
      </Show>
    </li>
  );
};

export type MenuItemType = typeof MenuItem;

export default MenuItem;
