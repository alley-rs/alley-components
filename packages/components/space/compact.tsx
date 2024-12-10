import { addClassNames } from "~/utils";
import type { BaseSizeComponentProps } from "~/interface";
import "./index.scss";
import { SpaceCompactContext } from "./context";

const baseClassName = "space-compact";

export interface SpaceCompactProps
  extends BaseSizeComponentProps<HTMLDivElement> {
  prefixCls?: string;
  direction?: "horizontal" | "vertical";
  block?: boolean;
  rootClassName?: string;
  flex?: number;
}

const Compact = (props: SpaceCompactProps) => {
  const classes = () =>
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
    <div ref={props.ref} id={props.id} class={classes()} style={style()}>
      <SpaceCompactContext.Provider
        value={{ childClass: `${baseClassName}-item`, size: props.size }}
      >
        {props.children}
      </SpaceCompactContext.Provider>
    </div>
  );
};

export default Compact;
