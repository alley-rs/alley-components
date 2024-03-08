import {
  Alert,
  Button,
  Input,
  Space,
  InputNumber,
  Flex,
  Link,
  SpaceCompact,
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

      <SpaceCompact>
        <Input />
        <Button>OK</Button>
      </SpaceCompact>

      <SpaceCompact size="small">
        <Input />
        <Button>OK</Button>
      </SpaceCompact>

      <Alert message="点击也没啥用" type="info" showIcon isClosable />
      <Alert message="点击也没啥用" type="warning" showIcon isClosable />
      <Alert message="点击也没啥用" type="error" showIcon isClosable />
      <Alert message="点击也没啥用" type="success" showIcon isClosable />
    </Space>
  );
};

export default App;
