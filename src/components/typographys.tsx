import { Typography, Space } from "../../packages";

const { Title, Text } = Typography;

const Typographys = () => (
  <Space direction="vertical" gap={24}>
    <Title>一级标题</Title>
    <Title level={2}>二级标题</Title>
    <Title level={3}>三级标题</Title>
    <Title level={4}>四级标题</Title>
    <Title level={5}>五级标题</Title>
    <Text>默认文本</Text>
    <Text type="secondary">二级文本</Text>
    <Text type="success">成功文本</Text>
    <Text type="warning">警告文本</Text>
    <Text type="danger">错误文本</Text>
    <Text disabled>禁用文本</Text>
    <Text mark>标记文本</Text>
    <Text code>代码文本 code</Text>
    <Text keyboard>键盘文本</Text>
    <Text underline>下划线文本</Text>
    <Text delete>删除线文本</Text>
    <Text strong>加粗文本</Text>
    <Text italic>斜体文本</Text>
  </Space>
);

export default Typographys;
