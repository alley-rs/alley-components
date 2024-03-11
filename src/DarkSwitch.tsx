import { BiRegularSun, BiSolidMoon } from "solid-icons/bi";
import { FloatButton } from "../packages";
import useDark from "../packages/hooks/useDark";

const DarkSwitchButton = () => {
  const [isDark, setIsDark] = useDark();

  const icon = () => (!isDark() ? <BiSolidMoon /> : <BiRegularSun />);

  return (
    <FloatButton
      icon={icon()}
      onClick={() => setIsDark((prev) => !prev)}
      tooltip={`切换为${isDark() ? "亮" : "暗"}色`}
    />
  );
};

export default DarkSwitchButton;
