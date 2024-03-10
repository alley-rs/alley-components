import { createContext } from "solid-js";
import type { FloatGroupProps } from "./interface";

export const FloatGroupContext = createContext<{ class: string }>();

const FloatGroup = (props: FloatGroupProps) => {
  return (
    <div
      class="float-button-group"
      style={{
        "--right": `${props.right ?? 20}px`,
        "--bottom": `${props.bottom ?? 20}px`,
      }}
    >
      <FloatGroupContext.Provider value={{ class: "group-item" }}>
        {props.children}
      </FloatGroupContext.Provider>
    </div>
  );
};

export default FloatGroup;
