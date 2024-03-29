import {
  Space,
  Flex,
  InputNumber,
  Input,
  Divider,
  Button,
  Label,
} from "../../packages";
import { createSignal } from "solid-js";

const Inputs = () => {
  const [count, setCount] = createSignal(10);

  return (
    <Flex direction="vertical" gap={16}>
      <Divider>数字输入框</Divider>

      <Flex wrap="wrap" gap={16} align="center">
        <Space align="center">
          <Label>正常</Label>
          <InputNumber value={count()} onChange={setCount} />
        </Space>

        <Space align="center">
          <Label>小尺寸</Label>
          <InputNumber size="small" value={count()} onChange={setCount} />
        </Space>

        <Space align="center">
          <Label>大尺寸</Label>
          <InputNumber value={count()} onChange={setCount} />
        </Space>

        <Space align="center">
          <Label>禁用</Label>
          <InputNumber disabled value={count()} onChange={setCount} />
        </Space>

        <Space align="center">
          <Label>紧凑模式</Label>
          <Space.Compact>
            <InputNumber value={count()} onChange={setCount} />
            <Button>OK</Button>
          </Space.Compact>
        </Space>

        <Space align="center">
          <Label>紧凑模式（小）</Label>
          <Space.Compact size="small">
            <InputNumber value={count()} onChange={setCount} />
            <Button>OK</Button>
          </Space.Compact>
        </Space>

        <Space align="center">
          <Label>紧凑模式（大）</Label>
          <Space.Compact size="large">
            <InputNumber value={count()} onChange={setCount} />
            <Button>OK</Button>
          </Space.Compact>
        </Space>
      </Flex>

      <Divider>文本输入框</Divider>

      <Flex wrap="wrap" gap={16} align="center">
        <Space align="center">
          <Label>正常</Label>
          <Input value="some words" />
        </Space>

        <Space align="center">
          <Label>小尺寸</Label>
          <Input size="small" value="some words" />
        </Space>

        <Space align="center">
          <Label>大尺寸</Label>
          <Input size="large" value="some words" />
        </Space>

        <Space align="center">
          <Label>禁用</Label>
          <Input value="some words" disabled />
        </Space>

        <Space align="center">
          <Label>紧凑模式</Label>
          <Space.Compact>
            <Input />
            <Button>OK</Button>
          </Space.Compact>
        </Space>

        <Space align="center">
          <Label>紧凑模式（小）</Label>
          <Space.Compact size="small">
            <Input />
            <Button>OK</Button>
          </Space.Compact>
        </Space>

        <Space align="center">
          <Label>紧凑模式（大）</Label>
          <Space.Compact size="large">
            <Input />
            <Button>OK</Button>
          </Space.Compact>
        </Space>
      </Flex>
    </Flex>
  );
};

export default Inputs;
