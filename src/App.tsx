import { createSignal } from "solid-js";
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
  Spinner,
  Tooltip,
  FloatButton,
  Typography,
  Card,
} from "../packages";
import DarkSwitch from "./DarkSwitch";

const { Title, Text } = Typography;

const App = () => {
  const [count, setCount] = createSignal(10);

  return (
    <>
      <Space direction="vertical" gap={16} style={{ padding: "10px" }}>
        <Flex direction="horizontal" justify="between">
          <Space gap={8} align="center">
            <InputNumber value={count()} onChange={setCount} />
            <Input value="some words" />
            <Input disabled />
            <Link
              href="https://github.com/alley-rs/alley-components"
              target="_blank"
            >
              链接
            </Link>
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

        <Button block filter>
          块按钮
        </Button>

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

        <Alert
          message="信息"
          description="点击也没啥用"
          type="info"
          showIcon
          isClosable
        />

        <Progress percent={74.5} />

        <Space gap={20}>
          <CircleProgress percent={74.5} size="small" />
          <CircleProgress percent={74.5} />
          <CircleProgress percent={74.5} size="large" />
        </Space>

        <Space gap={20}>
          <Spinner size="small" color="var(--alley-green-5)" />
          <Spinner />
          <Spinner size="large" color="var(--alley-red-5)" />
        </Space>

        <Space gap={16}>
          <Tooltip text="这是一条文字提示" placement="top">
            <Button shape="circle">上</Button>
          </Tooltip>

          <Tooltip text="这是一条文字提示" placement="bottom">
            <Button shape="circle" size="small">
              下
            </Button>
          </Tooltip>

          <Tooltip text="这是一条文字提示" placement="left">
            <Button shape="circle" size="large">
              左
            </Button>
          </Tooltip>

          <Tooltip text="这是一条文字提示" placement="right">
            <Button>右</Button>
          </Tooltip>
        </Space>

        <FloatButton.Group
          options={[{ onClick: () => { } }]}
        ></FloatButton.Group>
      </Space>

      <Title>一级标题</Title>
      <Title level={2}>二级标题</Title>
      <Title level={3}>三级标题</Title>
      <Title level={4}>四级标题</Title>
      <Title level={5}>五级标题</Title>

      <Space direction="vertical">
        <Text>默认文本</Text>
        <Text type="secondary">二级文本</Text>
        <Text type="success">Ant Design (success)</Text>
        <Text type="warning">Ant Design (warning)</Text>
        <Text type="danger">Ant Design (danger)</Text>
        <Text disabled>Ant Design (disabled)</Text>
        <Text mark>Ant Design (mark)</Text>
        <Text code>Ant Design (code)</Text>
        <Text keyboard>Ant Design (keyboard)</Text>
        <Text underline>Ant Design (underline)</Text>
        <Text delete>Ant Design (delete)</Text>
        <Text strong>Ant Design (strong)</Text>
        <Text italic>Ant Design (italic)</Text>
      </Space>

      <Flex
        gap={20}
        style={{ padding: "20px", "background-color": "rgb(240, 242, 245)" }}
      >
        <Card title="卡片标题" padding={10} style={{ width: "300px" }}>
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>

        <Card
          title="卡片标题"
          extra="更多"
          padding={20}
          style={{ width: "300px" }}
        >
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>

        <Card
          title="卡片标题"
          extra={
            <Link
              href="https://github.com/alley-rs/alley-components"
              target="_blank"
            >
              更多
            </Link>
          }
          style={{ width: "300px" }}
        >
          <p>卡片内容</p>
          <p>卡片内容</p>
          <p>卡片内容</p>
        </Card>
      </Flex>
    </>
  );
};

export default App;
