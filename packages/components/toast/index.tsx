import {
  Show,
  children,
  createEffect,
  createSignal,
  lazy,
  mergeProps,
  onCleanup,
} from "solid-js";
import type { JSX } from "solid-js";
import type { BasePlacementComponentProps } from "~/interface";
import { classList, isType } from "~/utils";
import "./index.scss";
import { Portal } from "solid-js/web";
import type { AlertProps } from "../alert";

const LazyAlert = lazy(() => import("~/components/alert"));

const animationSpeed = 150;

interface AlertToastProps {
  alert: AlertProps;
}

interface MessageToastProps {
  message: JSX.Element;
  action?: JSX.Element;
}

interface BaseToastProps extends BasePlacementComponentProps {
  open?: boolean;
  autoHideDuration?: number;
  onClose: () => void; // 必需传入 onClose ，以在超时关闭后调用，否则 merged.open 将一直为 true
}

export type ToastProps =
  | (BaseToastProps & AlertToastProps)
  | (BaseToastProps & MessageToastProps);

const baseClassName = "alley-toast";

const Toast = (props: ToastProps) => {
  let closeTimeout: ReturnType<typeof setTimeout> | null = null;

  const merged = mergeProps(
    { placement: "bottom-left", autoHideDuration: 3000 },
    props,
  );

  const [classes, setClasses] = createSignal<Record<string, boolean>>(
    classList({
      base: baseClassName,
      others: {
        [`${baseClassName}-${merged.placement}`]: true,
      },
    }),
  );
  const wrapperClasses = classList({
    base: `${baseClassName}-wrapper`,
    others: {
      [`${baseClassName}-wrapper-alert`]: "alert" in merged,
    },
  });

  const [open, setOpen] = createSignal(merged.open);

  createEffect(() => {
    setOpen(merged.open);
  });

  const handleOpen = () => {
    setClasses((prev) => ({
      ...prev,
      [`${baseClassName}-opening`]: true,
    }));

    const animationTid = setTimeout(() => {
      setClasses((prev) => ({
        ...prev,
        [`${baseClassName}-opening`]: false,
      }));
      clearTimeout(animationTid);
    }, animationSpeed);
  };

  const runCloseAnimation = () => {
    const animationTid = setTimeout(() => {
      setOpen(false);

      setClasses((prev) => ({
        ...prev,
        [`${baseClassName}-closing`]: false,
      }));

      merged.onClose();

      clearTimeout(animationTid);
      closeTimeout && clearTimeout(closeTimeout);
      closeTimeout = null;
    }, animationSpeed - 50); // setOpen 是异步的，可能动画执行完成但 open() 尚未传递到组件会导致关闭时闪烁，定时器比动画时长缩短 50ms 以避免闪烁
  };

  const handleClose = () => {
    closeTimeout = setTimeout(() => {
      setClasses((prev) => ({ ...prev, [`${baseClassName}-closing`]: true }));
      runCloseAnimation();
    }, merged.autoHideDuration); // 默认 1 秒
  };

  onCleanup(() => closeTimeout && clearTimeout(closeTimeout));

  createEffect(() => {
    if (open()) {
      handleOpen();
      handleClose();
    } else {
      closeTimeout && clearTimeout(closeTimeout);
    }
  });

  const style = () => ({
    ...merged.style,
    "--alley-toast-open-animation-speed": `${animationSpeed / 2}ms`,
    "--alley-toast-close-animation-speed": `${animationSpeed}ms`,
  });

  const resolved = children(() =>
    isType<MessageToastProps>("message", merged) ? (
      <>
        <div class={`${baseClassName}-message`}>{merged.message}</div>
        <Show when={merged.action}>
          <div class={`${baseClassName}-action`}>{merged.action}</div>
        </Show>
      </>
    ) : (
      <LazyAlert class={`${baseClassName}-alert`} {...merged.alert} />
    ),
  );

  return (
    <Show when={open()}>
      <Portal>
        <div classList={classes()} style={style()}>
          <div classList={wrapperClasses}>{resolved()}</div>
        </div>
      </Portal>
    </Show>
  );
};

export default Toast;
