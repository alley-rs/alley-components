import { Show, children, createSignal, mergeProps, lazy } from "solid-js";
import { type JSX } from "solid-js";
import type { BaseNoChildrenComponentProps } from "../interface";
import { addClassNames } from "../utils";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiFillInfoCircle,
  AiOutlineClose,
} from "solid-icons/ai";
import type { IconTypes } from "solid-icons";
import { Dynamic } from "solid-js/web";
import type { ButtonProps } from "../button";
import "./index.scss";

const LazyButton = lazy(() => import("../button"));

const baseClassName = "alley-alert";

interface IconNodeProps {
  type: AlertProps["type"];
  icon: AlertProps["icon"];
  description: AlertProps["description"];
}

const defaultIconMap: Record<AlertProps["type"], IconTypes> = {
  success: AiFillCheckCircle,
  info: AiFillInfoCircle,
  error: AiFillCloseCircle,
  warning: AiFillExclamationCircle,
};

const IconNode = (props: IconNodeProps) => {
  return (
    <span class={`${baseClassName}-icon`}>
      <Show
        when={props.icon}
        fallback={<Dynamic component={defaultIconMap[props.type]} />}
      >
        {props.icon}
      </Show>
    </span>
  );
};

interface CloseIconProps {
  isClosable?: boolean;
  closeIcon: AlertProps["closeIcon"];
  handleClose: AlertProps["onClose"];
}

const CloseIconNode = (props: CloseIconProps) => {
  const mergedCloseIcon = children(() => props.closeIcon ?? <AiOutlineClose />);

  return (
    <Show when={props.isClosable}>
      <LazyButton
        class={`${baseClassName}-close-icon`}
        onClick={props.handleClose}
        icon={mergedCloseIcon()}
        danger
        size="small"
        type="plain"
      />
    </Show>
  );
};

export interface AlertProps
  extends Omit<BaseNoChildrenComponentProps, "onClick"> {
  afterClose?: () => void;
  description?: JSX.Element;
  icon?: JSX.Element;
  message: JSX.Element;
  showIcon?: boolean;
  closeIcon?: JSX.Element;
  type: "success" | "info" | "warning" | "error";
  onClose?: ButtonProps["onClick"];
  isClosable?: boolean;
  closeSpeed?: number; // 删除动画时长，单位毫秒，默认 500ms
}

const Alert = (props: AlertProps) => {
  const [closed, setClosed] = createSignal(false);

  const merged = mergeProps({ closeSpeed: 500 }, props);

  const classes = () =>
    addClassNames(
      baseClassName,
      `${baseClassName}-${merged.type}`,
      merged.class,
    );

  const style = () => ({
    ...merged.style,
    [`--${baseClassName}-close-speed`]: `${merged.closeSpeed}ms` ?? "500ms",
  });

  const handleClose = (
    e: MouseEvent & { currentTarget: HTMLButtonElement },
  ) => {
    e.currentTarget.parentElement?.classList.add(`${baseClassName}-closing`);
    setTimeout(() => {
      setClosed(true);
    }, merged.closeSpeed);
    merged.onClose?.(e);
  };

  return (
    <Show when={!closed()}>
      <div class={classes()} style={style()}>
        <Show when={merged.showIcon || merged.icon}>
          <IconNode
            type={merged.type}
            description={merged.description}
            icon={merged.icon}
          />
        </Show>

        <div class={`${baseClassName}-content`}>
          <Show when={merged.message}>{merged.message}</Show>
          <Show when={merged.description}>{merged.description}</Show>
        </div>

        <CloseIconNode
          isClosable={merged.isClosable}
          closeIcon={merged.closeIcon}
          handleClose={handleClose}
        />
      </div>
    </Show>
  );
};

export default Alert;
