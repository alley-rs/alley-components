import type { Component } from "solid-js";
import Button from "./button";
import Group from "./group";
import type { FloatButtonProps } from "./interface";
import BackTop from "./back-top";

interface FloatButtonType extends Component<FloatButtonProps> {
  Group: typeof Group;
  BackTop: typeof BackTop;
}

const FloatButton = Button as FloatButtonType;

FloatButton.Group = Group;
FloatButton.BackTop = BackTop;

export default FloatButton;
