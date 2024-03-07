import { children, createEffect } from "solid-js";
import { addClassNames } from "~/utils";
import type { BaseSizeComponentProps } from "~/interface";
import "./index.scss";

const baseClassName = "space-compact";

export interface SpaceCompactProps extends BaseSizeComponentProps {
  prefixCls?: string;
  direction?: "horizontal" | "vertical";
  block?: boolean;
  rootClassName?: string;
  flex?: number;
}

const Compact = (props: SpaceCompactProps) => {
  const childNodes = children(() => props.children);

  createEffect(() => {
    childNodes.toArray().forEach((e, i) => {
      if (!e) return;

      const node = e as HTMLElement;
      const componentName = node.classList[0] ?? node.tagName.toLowerCase();

      const sizeClassName = `${componentName}-${props.size}`;

      const classNames: string[] = [
        sizeClassName,
        `${componentName}-compact-item`,
      ];

      if (i === 0) classNames.push(`${componentName}-compact-first-item`);
      else if (i === childNodes.toArray().length - 1)
        classNames.push(`${componentName}-compact-last-item`);

      node.classList.add(...classNames);
    });
  });

  const clx = () =>
    addClassNames(
      baseClassName,
      props.block && `${baseClassName}-block`,
      props.direction === "vertical" && `${baseClassName}-vertical`,
    );

  const style = () => ({
    ...props.style,
    flex: props.flex,
  });

  return (
    <div class={clx()} style={style()}>
      {childNodes()}
    </div>
  );
};

export default Compact;
