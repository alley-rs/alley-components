import type { BaseOnClickComponentProps } from "~/interface";
import "./index.scss";
import type { JSX } from "solid-js";
import { createMemo, mergeProps, Show } from "solid-js";
import { classList } from "~/utils";
import { AiOutlineClose } from "solid-icons/ai";

type ReadonlyArrayElementType<T> = T extends readonly (infer U)[] ? U : never;

export interface TagProps extends BaseOnClickComponentProps<HTMLDivElement> {
  color?: ReadonlyArrayElementType<typeof PresetColors> | string;
  icon?: JSX.Element;
  bordered?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

const baseClassName = "alley-tag";

const PresetColors = [
  "default",
  "success",
  "processing",
  "warning",
  "error",
  "magenta",
  "volcano",
  "red",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
] as const;

const Tag = (props: TagProps) => {
  let tagRef: HTMLDivElement | undefined;

  const merged = mergeProps({ bordered: true, color: "default" }, props);

  const isPreset = createMemo(
    () => (PresetColors as readonly string[]).indexOf(merged.color) > -1,
  );

  const classes = () =>
    classList({
      base: baseClassName,
      others: {
        ...(merged.class && { [merged.class]: true }),
        [`${baseClassName}-borderless`]: !merged.bordered,
        [`${baseClassName}-closable`]: merged.closable,
        [isPreset()
          ? `${baseClassName}-${merged.color}`
          : `${baseClassName}-has-color`]: true,
      },
    });

  const style = () => ({
    ...(!isPreset() && {
      "background-color": merged.color,
    }),
  });

  const onClose = () => {
    tagRef?.remove();

    merged.onClose?.();
  };

  return (
    <div
      ref={tagRef}
      classList={classes()}
      style={style()}
      onClick={merged.onClick}
    >
      <Show when={merged.icon}>
        <span class="alley-anticon">{merged.icon}</span>
      </Show>

      <span>{merged.children}</span>

      <Show when={merged.closable}>
        <span
          class="alley-anticon alley-anticon-close alley-tag-close-icon"
          onClick={onClose}
        >
          <AiOutlineClose />
        </span>
      </Show>
    </div>
  );
};

export default Tag;
