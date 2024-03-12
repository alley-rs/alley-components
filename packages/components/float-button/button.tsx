import "./index.scss";
import { TbHome } from "solid-icons/tb";
import type { FloatButtonProps } from "./interface";
import { children, lazy, useContext } from "solid-js";
import { FloatGroupContext } from "./group";
import { addClassNames } from "~/utils";

const LazyButton = lazy(() => import("../button"));
const LazyTooltip = lazy(() => import("../tooltip"));

const FloatButton = (props: FloatButtonProps) => {
  const context = useContext(FloatGroupContext);

  const classes = () =>
    addClassNames("float-button", context?.class, props.class);

  const icon = children(() => props.icon ?? <TbHome />);

  const button = children(() => (
    <LazyButton {...props} icon={icon()} shape="circle" />
  ));

  return (
    <div
      class={classes()}
      style={{
        "--right": `${props.right ?? 20}px`,
        "--bottom": `${props.bottom ?? 20}px`,
      }}
    >
      {props.tooltip ? (
        <LazyTooltip text={props.tooltip}>{button()}</LazyTooltip>
      ) : (
        button()
      )}
    </div>
  );
};

export default FloatButton;
