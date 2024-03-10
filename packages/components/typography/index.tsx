import type { BaseComponentProps } from "~/interface";
import "./index.scss";
import Title from "./title";
import Text from "./text";

export interface TypographyProps extends BaseComponentProps { }

export const baseClassName = "alley-typography";

const Typography = (props: TypographyProps) => { };

Typography.Title = Title;
Typography.Text = Text;

export default Typography;
