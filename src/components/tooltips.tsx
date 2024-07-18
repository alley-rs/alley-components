import { AiOutlineDown, AiOutlineUp } from "solid-icons/ai";
import { Tooltip, Button, Flex, Alert, Divider } from "../../packages";

const Tooltips = () => (
  <>
    <Alert
      showIcon
      type="warning"
      message="本页面演示了圆形按钮的错误用法，不可将文字传入圆形按钮。可在控制台中查看警告信息。"
    />

    <Divider>即时显示</Divider>

    <Flex gap={16} style={{ "margin-top": "40px" }} justify="round">
      <Tooltip text="这是一条文字提示" placement="top" size="small">
        <Button shape="circle" icon={<AiOutlineUp />}>
          上
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="bottom">
        <Button shape="circle" size="small" icon={<AiOutlineDown />}>
          下
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="left" size="large">
        <Button shape="circle" size="large">
          左
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="right">
        <Button type="primary">右</Button>
      </Tooltip>
    </Flex>

    <Divider>延时显示</Divider>

    <Tooltip text="关闭" placement="right" delay={1000}>
      <Button shape="circle" size="large">
        X
      </Button>
    </Tooltip>
  </>
);

export default Tooltips;
