import "./index.scss";
import { TbHome } from "solid-icons/tb";
import type { FloatButtonProps } from "./interface";
import { children, lazy, splitProps, useContext } from "solid-js";
import { FloatGroupContext } from "./group";
import { addClassNames } from "~/utils";

const LazyButton = lazy(() => import("../button"));
const LazyTooltip = lazy(() => import("../tooltip"));

const FloatButton = (props: FloatButtonProps) => {
  const context = useContext(FloatGroupContext);
  const [divProps, buttonProps] = splitProps(props, [
    "ref",
    "id",
    "right",
    "bottom",
    "tooltip",
  ]);

  const classes = () =>
    addClassNames("float-button", context?.class, props.class);

  const icon = children(() => props.icon ?? <TbHome />);

  const button = children(() => (
    <LazyButton {...buttonProps} icon={icon()} shape="circle" />
  ));

  return (
    <div
      ref={divProps.ref}
      id={divProps.id}
      class={classes()}
      style={{
        "--right": `${divProps.right ?? 20}px`,
        "--bottom": `${divProps.bottom ?? 20}px`,
      }}
    >
      {divProps.tooltip ? (
        <LazyTooltip text={divProps.tooltip}>{button()}</LazyTooltip>
      ) : (
        button()
      )}
    </div>
  );
};

export default FloatButton;
