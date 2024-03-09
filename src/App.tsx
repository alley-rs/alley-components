import {
  Alert,
  Button,
  Input,
  Space,
  InputNumber,
  Flex,
  Link,
  Progress,
  CircleProgress,
} from "../packages";
import DarkSwitch from "./DarkSwitch";

const App = () => {
  return (
    <Space direction="vertical" gap={16} style={{ padding: "10px" }}>
      <Flex direction="horizontal" justify="between">
        <Space gap={8} align="center">
          <InputNumber value={10} />
          <Input value="some words" />
          <Input disabled />
          <Link href="#">链接</Link>
        </Space>

        <DarkSwitch />
      </Flex>

      <Space gap={8}>
        <Button danger>取消</Button>
        <Button isLoading>保存</Button>
        <Button>确认</Button>
        <Button size="small">小按钮</Button>
        <Button size="large">大按钮</Button>
        <Button type="plain">文本按钮</Button>
      </Space>

      <Space.Compact>
        <Input />
        <Button>OK</Button>
      </Space.Compact>

      <Space.Compact size="small">
        <Input />
        <Button>OK</Button>
      </Space.Compact>

      <Alert message="点击也没啥用" type="info" showIcon isClosable />
      <Alert message="点击也没啥用" type="warning" showIcon isClosable />
      <Alert message="点击也没啥用" type="error" showIcon isClosable />
      <Alert message="点击也没啥用" type="success" showIcon isClosable />

      <Progress percent={74.5} />
      <CircleProgress percent={74.5} />
    </Space>
  );
};

export default App;
