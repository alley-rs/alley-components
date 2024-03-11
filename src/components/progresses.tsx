import { Progress, Space, Button, CircleProgress, Flex } from "../../packages";
import { createSignal } from "solid-js";

const Progresses = () => {
  const [percent, setPercent] = createSignal(50);

  return (
    <Flex direction="vertical" gap={36}>
      <Progress percent={percent()} />

      <Space gap={40} justify="center">
        <CircleProgress percent={percent()} size="small" />
        <CircleProgress percent={percent()} />
        <CircleProgress percent={percent()} size="large" />
      </Space>

      <Space gap={16} justify="center">
        <Button
          onClick={() => setPercent((prev) => prev - 2.5)}
          disabled={percent() === 0}
        >
          -
        </Button>

        <Button
          onClick={() => setPercent((prev) => prev + 2.5)}
          disabled={percent() === 100}
        >
          +
        </Button>
      </Space>
    </Flex>
  );
};

export default Progresses;
