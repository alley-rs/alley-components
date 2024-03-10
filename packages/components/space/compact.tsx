import { createContext } from "solid-js";
import { addClassNames } from "~/utils";
import type { BaseSizeComponentProps, SizeType } from "~/interface";
import "./index.scss";

interface SpaceCompactContextType {
  childClass: string;
  size?: SizeType;
}

export const SpaceCompactContext = createContext<SpaceCompactContextType>();

const baseClassName = "space-compact";

export interface SpaceCompactProps extends BaseSizeComponentProps {
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
    <div class={classes()} style={style()}>
      <SpaceCompactContext.Provider
        value={{ childClass: `${baseClassName}-item`, size: props.size }}
      >
        {props.children}
      </SpaceCompactContext.Provider>
    </div>
  );
};

export default Compact;
