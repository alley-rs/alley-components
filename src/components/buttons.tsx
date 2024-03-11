import { Button, Divider, Flex } from "../../packages";

const Buttons = () => {
  return (
    <Flex direction="vertical" gap={16}>
      <Divider>按钮</Divider>

      <Flex justify="round">
        <Button danger>取消</Button>
        <Button isLoading>保存</Button>
        <Button>确认</Button>
        <Button size="small">小按钮</Button>
        <Button size="large">大按钮</Button>
        <Button type="plain">文本按钮</Button>
      </Flex>

      <Divider>块按钮</Divider>

      <Button block filter size="small">
        小块按钮
      </Button>

      <Button block filter>
        中块按钮（默认）
      </Button>

      <Button block filter size="large">
        大块按钮
      </Button>
    </Flex>
  );
};

export default Buttons;
