import { BiRegularSun, BiSolidMoon } from "solid-icons/bi";
import { Col, Switch, Tooltip } from "../packages";
import useDark from "../packages/hooks/useDark";

const DarkSwitch = () => {
  const [isDark, setIsDark] = useDark();

  return (
    <Col span={2} align="end" style={{ position: "relative" }}>
      <Tooltip text={`切换为${isDark() ? "亮" : "暗"}色`} placement="left">
        <Switch
          checked={isDark()}
          setChecked={() => {
            setIsDark((pre) => {
              return !pre;
            });
          }}
          uncheckedChild={<BiRegularSun />}
          checkedChild={<BiSolidMoon />}
          class="dark-switch"
        />
      </Tooltip>
    </Col>
  );
};

export default DarkSwitch;
