import { AiOutlineDown, AiOutlineUp } from "solid-icons/ai";
import { Tooltip, Button, Flex, Alert } from "../../packages";

const Tooltips = () => (
  <>
    <Alert
      showIcon
      type="warning"
      message="本页面演示了圆形按钮的错误用法，不可将文字传入圆形按钮。可在控制台中查看警告信息。"
    />
    <Flex gap={16} style={{ "margin-top": "40px" }} justify="round">
      <Tooltip text="这是一条文字提示" placement="top">
        <Button shape="circle" icon={<AiOutlineUp />}>
          上
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="bottom">
        <Button shape="circle" size="small" icon={<AiOutlineDown />}>
          下
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="left">
        <Button shape="circle" size="large">
          左
        </Button>
      </Tooltip>

      <Tooltip text="这是一条文字提示" placement="right">
        <Button type="primary">右</Button>
      </Tooltip>
    </Flex>
  </>
);

export default Tooltips;
