import { For, createSignal } from "solid-js";
import { Alert, Button, Flex, Toast } from "~/index";
import { Placement } from "~/interface";

const placements: { placement: Placement; text: string }[] = [
  { placement: "top-left", text: "左上" },
  { placement: "top", text: "顶中" },
  { placement: "top-right", text: "右上" },
  { placement: "left", text: "左中" },
  { placement: "center", text: "正中" },
  { placement: "right", text: "右中" },
  { placement: "bottom-left", text: "左下" },
  { placement: "bottom", text: "底中" },
  { placement: "bottom-right", text: "右下" },
];

const Toasts = () => {
  const signals = placements.map(() => createSignal(false));

  return (
    <Flex
      direction="vertical"
      gap={24}
      align="center"
      justify="center"
      style={{ height: "100%", width: "100%" }}
    >
      <Alert
        type="info"
        message="适用于不应使用系统通知的简单的提示消息"
        showIcon
      />
      <Flex gap={20}>
        <For each={placements.slice(0, 3)}>
          {(item, index) => (
            <Button onClick={() => signals[index()][1](true)}>
              {item.text}
            </Button>
          )}
        </For>
      </Flex>

      <Flex gap={20}>
        <For each={placements.slice(3, 6)}>
          {(item, index) => (
            <Button onClick={() => signals[index() + 3][1](true)}>
              {item.text}
            </Button>
          )}
        </For>
      </Flex>

      <Flex gap={20}>
        <For each={placements.slice(6)}>
          {(item, index) => (
            <Button onClick={() => signals[index() + 6][1](true)}>
              {item.text}
            </Button>
          )}
        </For>
      </Flex>

      <For each={signals}>
        {(item, index) => (
          <Toast
            message="已清空"
            placement={placements[index()].placement}
            open={item[0]()}
            onClose={() => item[1]((prev) => !prev)}
          />
        )}
      </For>
    </Flex>
  );
};

export default Toasts;
