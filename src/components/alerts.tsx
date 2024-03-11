import { Alert, Divider, Flex } from "../../packages";

const Alerts = () => (
  <Flex direction="vertical" gap={24}>
    <Flex direction="vertical">
      <Divider>信息</Divider>
      <Alert message="点击也没啥用" type="info" showIcon isClosable />
    </Flex>

    <Flex direction="vertical">
      <Divider>警告</Divider>
      <Alert message="点击也没啥用" type="warning" showIcon isClosable />
    </Flex>

    <Flex direction="vertical">
      <Divider>错误</Divider>
      <Alert message="点击也没啥用" type="error" showIcon isClosable />
    </Flex>

    <Flex direction="vertical">
      <Divider>成功</Divider>
      <Alert message="点击也没啥用" type="success" showIcon isClosable />
    </Flex>

    <Flex direction="vertical">
      <Divider>信息-有描述</Divider>
      <Alert
        message="信息"
        description="点击也没啥用"
        type="info"
        showIcon
        isClosable
      />
    </Flex>
  </Flex>
);

export default Alerts;
