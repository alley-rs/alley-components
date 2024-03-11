import { Tooltip, Button, Flex } from "../../packages";

const Alerts = () => (
  <Flex gap={16} style={{ "margin-top": "40px" }} justify="round">
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
  </Flex>
);

export default Alerts;
