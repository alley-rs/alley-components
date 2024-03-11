import { Flex, Card, Link } from "../../packages";

const Cards = () => (
  <Flex
    gap={20}
    align="center"
    style={{ padding: "20px", "background-color": "rgb(240, 242, 245)" }}
  >
    <Card title="卡片标题" padding={10} style={{ width: "300px" }}>
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </Card>

    <Card title="卡片标题" extra="更多" padding={20} style={{ width: "300px" }}>
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
);

export default Cards;
