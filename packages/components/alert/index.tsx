import { Show, children, createSignal, mergeProps, lazy } from "solid-js";
import type { JSX } from "solid-js";
import type { BaseNoChildrenComponentProps } from "~/interface";
import { addClassNames } from "~/utils";
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
  extends Omit<BaseNoChildrenComponentProps<HTMLDivElement>, "onClick"> {
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

  const merged = mergeProps({ closeSpeed: 240 }, props);

  const classes = () =>
    addClassNames(
      baseClassName,
      merged.class,
      `${baseClassName}-${merged.type}`,
      merged.description && `${baseClassName}-with-description`,
    );

  const style = () => ({
    ...merged.style,
    [`--${baseClassName}-close-speed`]: `${merged.closeSpeed ?? 500}ms`,
  });

  const handleClose = (
    e: MouseEvent & { currentTarget: HTMLButtonElement },
  ) => {
    e.currentTarget.parentElement?.classList.add(`${baseClassName}-closing`);
    const tid = setTimeout(() => {
      setClosed(true);
      clearTimeout(tid);
    }, merged.closeSpeed);
    merged.onClose?.(e);
  };

  return (
    <Show when={!closed()}>
      <div id={merged.id} ref={merged.ref} class={classes()} style={style()}>
        <Show when={merged.showIcon || merged.icon}>
          <IconNode
            type={merged.type}
            description={merged.description}
            icon={merged.icon}
          />
        </Show>

        <div class={`${baseClassName}-content`}>
          <Show when={merged.message}>
            <div class={`${baseClassName}-message`}>{merged.message}</div>
          </Show>
          <Show when={merged.description}>
            <div class={`${baseClassName}-description`}>
              {merged.description}
            </div>
          </Show>
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
