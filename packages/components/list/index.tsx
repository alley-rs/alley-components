import { For, Show, type JSXElement } from "solid-js";
import ListItem from "./item";
import "./index.scss";
import { addClassNames } from "~/utils";

export interface ListProps<T> {
  id?: string;
  header?: JSXElement;
  class?: string;
  dataSource: T[];
  renderItem: (item: T, index: number) => JSXElement;
}

const baseClassName = "alley-list";

const List = <T extends any>(props: ListProps<T>) => {
  const classNames = () => addClassNames(baseClassName, props.class);

  return (
    <div id={props.id} class={classNames()}>
      <Show when={props.header}>
        <div class={`${baseClassName}-header`}>{props.header}</div>
      </Show>

      <ul>
        <For each={props.dataSource}>
          {(item, index) => props.renderItem(item, index())}
        </For>
      </ul>
    </div>
  );
};

List.Item = ListItem;

export default List;
