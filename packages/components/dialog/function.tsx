import { render } from "solid-js/web";
import type { DialogProps } from ".";
import Dialog from ".";

export const showDialog = (props: Omit<DialogProps, "show" | "onClose">) => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const destroy = () => {
    render(() => null, div);
    div.remove();
  };

  const onClose = () => {
    destroy();
  };

  render(() => <Dialog {...props} show={true} onClose={onClose} />, div);

  return destroy;
};
