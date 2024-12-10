import { createContext } from "solid-js";
import type { SizeType } from "~/interface";

interface SpaceCompactContextType {
  childClass: string;
  size?: SizeType;
}

export const SpaceCompactContext = createContext<SpaceCompactContextType>();
