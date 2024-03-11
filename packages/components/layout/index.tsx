import type { BaseNoChildrenComponentProps } from "~/interface";
import "./index.scss";
import { children, lazy, type JSX } from "solid-js";
import { addClassNames } from "~/utils";

const LazyFlex = lazy(() => import("~/components/flex"));

const baseClassName = "alley-layout";

export interface LayoutProps extends BaseNoChildrenComponentProps {
  menu: JSX.Element;
  content: JSX.Element;
  contentPadding?: string | number;
}

const Layout = (props: LayoutProps) => {
  const classes = () => addClassNames(baseClassName, props.class);

  const style = () => ({
    ...props.style,
    "--alley-layout-content-padding": props.contentPadding
      ? typeof props.contentPadding === "string"
        ? props.contentPadding
        : `${props.contentPadding}px`
      : "20px",
  });

  const resolvedMenu = children(() => props.menu);
  const resolvedContent = children(() => props.content);

  return (
    <LazyFlex class={classes()} style={style()}>
      <div class={`${baseClassName}-menu`}>{resolvedMenu()}</div>
      <div class={`${baseClassName}-content`}>
        <div class={`${baseClassName}-content-wrapper`}>
          {resolvedContent()}
        </div>
      </div>
    </LazyFlex>
  );
};

export default Layout;
