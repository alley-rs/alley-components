import { For, createSignal } from "solid-js";
import { Button, Divider, Flex, Space } from "../../packages";
import { SizeType } from "~/interface";
import { AiOutlineDownload, AiOutlineSearch } from "solid-icons/ai";

const Types = () => {
  return (
    <Space align="center" gap={24}>
      <Button type="primary">主要</Button>
      <Button>默认</Button>
      <Button type="plain">文本</Button>
    </Space>
  );
};

const Icons = () => {
  return (
    <Space direction="vertical" align="center" gap={16}>
      <Space gap={24}>
        <Button icon={<AiOutlineSearch />} />
        <Button icon={<AiOutlineSearch />} shape="round" />
        <Button icon={<AiOutlineSearch />} shape="circle" />
        <Button icon={<AiOutlineSearch />}>搜索</Button>
        <Button icon={<AiOutlineSearch />} shape="round">
          搜索
        </Button>
      </Space>

      <Space gap={24}>
        <Button icon={<AiOutlineSearch />} type="primary" />
        <Button icon={<AiOutlineSearch />} shape="round" type="primary" />
        <Button icon={<AiOutlineSearch />} shape="circle" type="primary" />
        <Button icon={<AiOutlineSearch />} type="primary">
          搜索
        </Button>
        <Button icon={<AiOutlineSearch />} shape="round" type="primary">
          搜索
        </Button>
      </Space>
    </Space>
  );
};

const Sizes = () => {
  const [size, setSize] = createSignal<SizeType>("small");

  const controllers: { size: SizeType; text: string }[] = [
    { size: "large", text: "大" },
    { size: "middle", text: "默认" },
    { size: "small", text: "小" },
  ];

  return (
    <>
      <Space.Compact>
        <For each={controllers}>
          {(item) => (
            <Button
              onClick={() => setSize(item.size)}
              disabled={size() === item.size}
            >
              {item.text}
            </Button>
          )}
        </For>
      </Space.Compact>

      <Divider plain orientation="left">
        预览
      </Divider>

      <Flex wrap="wrap" align="center" gap={20}>
        <Button type="primary" size={size()}>
          主要
        </Button>
        <Button size={size()}>默认</Button>
        <Button type="plain" size={size()}>
          文本
        </Button>
        <Button icon={<AiOutlineDownload />} size={size()} type="primary" />
        <Button
          icon={<AiOutlineDownload />}
          size={size()}
          shape="circle"
          type="primary"
        />
        <Button
          icon={<AiOutlineDownload />}
          size={size()}
          shape="round"
          type="primary"
        />
        <Button
          icon={<AiOutlineDownload />}
          size={size()}
          shape="round"
          type="primary"
        >
          下载
        </Button>
        <Button icon={<AiOutlineDownload />} size={size()} type="primary">
          下载
        </Button>
      </Flex>
    </>
  );
};

const Disabled = () => {
  return (
    <Space direction="vertical" gap={16}>
      <Space gap={16}>
        <Button type="primary">主要</Button>
        <Button type="primary" disabled>
          主要
        </Button>
      </Space>

      <Space gap={16}>
        <Button>默认</Button>
        <Button disabled>默认</Button>
      </Space>

      <Space gap={16}>
        <Button type="plain">文本</Button>
        <Button type="plain" disabled>
          文本
        </Button>
      </Space>

      <Space gap={16}>
        <Button danger>危险</Button>
        <Button disabled danger>
          危险
        </Button>
      </Space>
    </Space>
  );
};

const Loading = () => {
  const [noIconLoading, setNoIconLoading] = createSignal(false);
  const [withIconLoading, setWithIconLoading] = createSignal(false);
  const [onlyIconLoading, setOnlyIconLoading] = createSignal(false);

  return (
    <Space direction="vertical" gap={16}>
      <Space gap={24} align="center">
        <Button isLoading>加载中</Button>
        <Button isLoading size="small" icon={<AiOutlineDownload />}>
          加载中
        </Button>
        <Button icon={<AiOutlineDownload />} isLoading />
      </Space>

      <Space gap={24} align="center">
        <Button
          isLoading={noIconLoading()}
          onClick={() => {
            setNoIconLoading(true);
            const tid = setTimeout(() => {
              setNoIconLoading(false);
              clearTimeout(tid);
            }, 2000);
          }}
        >
          下载
        </Button>
        <Button
          isLoading={withIconLoading()}
          icon={<AiOutlineDownload />}
          size="small"
          onClick={() => {
            setWithIconLoading(true);
            const tid = setTimeout(() => {
              setWithIconLoading(false);
              clearTimeout(tid);
            }, 2000);
          }}
        >
          下载
        </Button>
        <Button
          icon={<AiOutlineDownload />}
          isLoading={onlyIconLoading()}
          onClick={() => {
            setOnlyIconLoading(true);
            const tid = setTimeout(() => {
              setOnlyIconLoading(false);
              clearTimeout(tid);
            }, 2000);
          }}
        />
      </Space>
    </Space>
  );
};

const Buttons = () => {
  return (
    <Flex direction="vertical" gap={16}>
      <Divider>按钮类型</Divider>
      <Types />

      <Divider>图标按钮</Divider>
      <Icons />

      <Divider>按钮尺寸</Divider>
      <Sizes />

      <Divider>按钮禁用</Divider>
      <Disabled />

      <Divider>按钮加载中</Divider>
      <Loading />

      <Divider>块按钮</Divider>

      <Button block filter size="small">
        小块按钮
      </Button>

      <Button block filter>
        中块按钮（默认）
      </Button>

      <Button block filter size="large">
        大块按钮
      </Button>
    </Flex>
  );
};

export default Buttons;
