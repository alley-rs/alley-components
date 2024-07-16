import { AiFillFilePdf, AiFillHdd } from "solid-icons/ai";
import { lazy } from "solid-js";
import { Alert, Button, Flex, Typography } from "~/index";

const { Text } = Typography;

const LazyList = lazy(() => import("~/components/list"));
const LazyListItem = lazy(() => import("~/components/list/item"));

const List = () => {
  const items = [
    "苹果",
    "沙果",
    "木瓜海棠",
    "野樱莓",
    "枇杷",
    "欧楂",
    "山楂",
    "梨",
  ];

  return (
    <Flex direction="vertical">
      <Alert
        showIcon
        type="info"
        message={
          <>
            懒加<Text code>List</Text>时，<Text code>ListItem</Text>
            也需要懒加载，否则会报错
          </>
        }
      />

      <LazyList
        dataSource={items}
        renderItem={(item) => (
          <LazyListItem
            avatar={<AiFillFilePdf />}
            title={item}
            description={`${item}的描述文字`}
            extra={<Button type="plain" shape="circle" icon={<AiFillHdd />} />}
          />
        )}
      />
    </Flex>
  );
};

export default List;
