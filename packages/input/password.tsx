import { Show, createSignal, lazy } from "solid-js";
import type { InputProps } from "./interface";
import { addClassNames } from "../utils/class";
import { AiFillEye, AiFillEyeInvisible } from "solid-icons/ai";

const LazyButton = lazy(() => import("../button"));

const baseClassName = "alley-input";

interface PasswordProps extends InputProps { }

const Password = (props: PasswordProps) => {
  const [showPassword, setShowPassword] = createSignal(false);

  const classes = () => {
    return addClassNames(
      baseClassName,
      props.size && `${baseClassName}-${props.size}`,
      props.disabled && `${baseClassName}-disabled`,
    );
  };

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <LazyButton
        type="plain"
        onClick={() => setShowPassword((prev) => !prev)}
        icon={
          <Show when={!showPassword()} fallback={<AiFillEyeInvisible />}>
            <AiFillEye />
          </Show>
        }
        style={{
          position: "absolute",
          right: "6px",
          top: "8px",
          "z-index": 10,
        }}
      />

      <input
        type={showPassword() ? "text" : "password"}
        class={classes()}
        placeholder={props.placeholder}
        value={props.value ?? ""}
        onChange={(e) => props.onChange?.(e.target.value)}
        disabled={props.disabled}
        style={props.style}
        autofocus={props.autofocus}
        onFocus={props.onFocus}
        onClick={props.onClick}
      />
    </div>
  );
};

export default Password;
