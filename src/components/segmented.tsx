import { createSignal } from "solid-js";
import Segmented from "~/components/segmented";
import { Divider, Space } from "~/index";

const Demo1 = () => {
  const [value, setValue] = createSignal("日");

  return (
    <>
      <Divider>普通</Divider>
      <Space gap={8} align="center" justify="center">
        <Segmented<string>
          options={["日", "周", "月", "季", "年"]}
          onChange={(value) => {
            console.log(value);
            setValue(value);
          }}
        />
        <span>值：{value()}</span>
      </Space>
    </>
  );
};

const Demo2 = () => {
  const [value, setValue] = createSignal(0);

  return (
    <>
      <Divider>标签与值不同</Divider>

      <Space gap={8} align="center">
        <Segmented
          options={[
            { label: "日", value: 0 },
            { label: "周", value: 1 },
            { label: "月", value: 2 },
            { label: "季", value: 3 },
            { label: "年", value: 4 },
          ]}
          onChange={(value) => setValue(value)}
        />
        <span>值：{value()}</span>
      </Space>
    </>
  );
};

const DemoSegmented = () => {
  return (
    <>
      <Demo1 />

      <Demo2 />
    </>
  );
};

export default DemoSegmented;
