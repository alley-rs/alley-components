import {
  children,
  createEffect,
  createSignal,
  type JSX,
  lazy,
  mergeProps,
  Show,
} from "solid-js";
import "./index.scss";
import type { BaseNoChildrenComponentProps, SizeType } from "~/interface";
import { addClassNames } from "~/utils";
import { Portal } from "solid-js/web";
import { AiOutlineClose } from "solid-icons/ai";

const LazyButton = lazy(() => import("../button"));
const Title = lazy(() => import("../typography/title"));

const baseClass = "alley-dialog";

type DialogType = "info" | "success" | "warning" | "error";

export interface DialogProps
  extends BaseNoChildrenComponentProps<HTMLDivElement> {
  show?: boolean;
  onClose: () => void;
  title?: JSX.Element;
  size?: SizeType;
  type?: DialogType;
  children: JSX.Element;
  showCloseIcon?: boolean;
  foot?: JSX.Element;
  showMask?: boolean;
  hideScrollbar?: boolean;
  maskClosable?: boolean;
}

const Dialog = (props: DialogProps) => {
  const merged = mergeProps(
    { showMask: true, hideScrollbar: true, maskClosable: true },
    props,
  );

  const [isVisible, setIsVisible] = createSignal(merged.show || false);

  createEffect(() => {
    setIsVisible(merged.show || false);
  });

  const handleClose = () => {
    setIsVisible(false);
    merged.onClose();
  };

  const classes = () =>
    addClassNames(
      baseClass,
      merged.hideScrollbar && `${baseClass}-hide-scrollbar`,
      merged.size && `${baseClass}-${merged.size}`,
      merged.class,
    );
  const style = () => merged.style;

  const resolved = children(() => merged.children);

  return (
    <Show when={isVisible()}>
      <Portal>
        <div class={classes()} style={style()}>
          <div
            class={`${baseClass}-mask`}
            onClick={merged.maskClosable ? handleClose : undefined}
          />

          <div class={`${baseClass}-wrapper`}>
            <Show when={merged.showCloseIcon}>
              <LazyButton
                class={`${baseClass}-close-button`}
                onClick={handleClose}
                icon={<AiOutlineClose />}
                type="plain"
                shape="circle"
                danger
                size="small"
              />
            </Show>

            <div class={`${baseClass}-header`}>
              <Show when={merged.title}>
                <Title level={5}>{merged.title}</Title>
              </Show>
            </div>
            <div class={`${baseClass}-content`}>{resolved()}</div>
            <Show when={merged.foot}>
              <div>{merged.foot}</div>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default Dialog;
