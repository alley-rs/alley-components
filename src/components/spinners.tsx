import { Label, Space, Spinner } from "../../packages";

const Spinners = () => {
  return (
    <Space gap={20} direction="vertical">
      <Space align="center">
        <Label>小-绿色</Label>
        <Spinner size="small" color="var(--alley-green-5)" />
      </Space>

      <Space align="center">
        <Label>中（默认尺寸和颜色）</Label>
        <Spinner />
      </Space>

      <Space align="center">
        <Label>大-红色</Label>
        <Spinner size="large" color="var(--alley-red-5)" />
      </Space>
    </Space>
  );
};

export default Spinners;
