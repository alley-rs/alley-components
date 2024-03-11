import "./index.scss";
import { TbHome } from "solid-icons/tb";
import type { FloatButtonProps } from "./interface";
import { children, createEffect, lazy, useContext } from "solid-js";
import { FloatGroupContext } from "./group";
import { addClassNames } from "~/utils";

const LazyButton = lazy(() => import("../button"));
const LazyTooltip = lazy(() => import("../tooltip"));

const FloatButton = (props: FloatButtonProps) => {
  const context = useContext(FloatGroupContext);

  const classes = () =>
    addClassNames("float-button", context?.class, props.class);

  const icon = children(() => props.icon);

  const button = children(() => (
    <LazyButton
      icon={icon() ?? <TbHome />}
      onClick={props.onClick}
      shape="circle"
    />
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
