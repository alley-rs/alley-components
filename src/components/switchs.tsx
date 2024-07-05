import { createSignal } from "solid-js";
import { Flex, Label, Space, Switch } from "../../packages";
import { BiRegularCheck, BiRegularX } from "solid-icons/bi";

const Switchs = () => {
  const [checked, setChecked] = createSignal(false);

  return (
    <Flex direction="vertical" gap={16}>
      <Space>
        <Label>无图标</Label>
        <Switch checked={checked()} setChecked={setChecked} />
      </Space>

      <Space>
        <Label>有图标</Label>
        <Switch
          checked={checked()}
          setChecked={setChecked}
          checkedChild={<BiRegularCheck />}
          uncheckedChild={<BiRegularX />}
        />
      </Space>

      <Space>
        <Label>禁用</Label>
        <Switch
          checked={checked()}
          setChecked={setChecked}
          checkedChild={<BiRegularCheck />}
          uncheckedChild={<BiRegularX />}
          disabled
        />
      </Space>
    </Flex>
  );
};

export default Switchs;
