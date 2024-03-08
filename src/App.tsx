import {
  Alert,
  Button,
  Input,
  Space,
  InputNumber,
  Flex,
  Link,
  Switch,
} from "../packages";

const App = () => {
  return (
    <Flex direction="vertical">
      <Space gap={8} align="center">
        <InputNumber value={10} />
        <Input value="some words" />
        <Input disabled />
        <Switch checked setChecked={() => { }} />
        <Link href="#">链接</Link>
      </Space>

      <Space gap={8}>
        <Button danger>取消</Button>
        <Button isLoading>保存</Button>
        <Button>确认</Button>
        <Button size="small">小按钮</Button>
        <Button size="large">大按钮</Button>
      </Space>

      <Alert message="点击也没啥用" type="info" showIcon isClosable />
    </Flex>
  );
};

export default App;
