import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "solid-icons/ai";
import Tag from "~/components/tag";
import { Divider, Label } from "~/index";

const Tags = () => {
  return (
    <>
      <Divider>默认颜色</Divider>
      <Tag>标签 1</Tag>
      <Tag bordered={false}>标签 2</Tag>
      <Tag bordered={false} closable>
        标签 3
      </Tag>

      <Divider>内置颜色</Divider>
      <div>
        <Label>有边框：</Label>
        <Tag color="success">success</Tag>
        <Tag color="processing">processing</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </div>

      <div style={{ "margin-top": "10px" }}>
        <Label>无边框：</Label>
        <Tag color="success" bordered={false}>
          success
        </Tag>
        <Tag color="processing" bordered={false}>
          processing
        </Tag>
        <Tag color="error" bordered={false}>
          error
        </Tag>
        <Tag color="warning" bordered={false}>
          warning
        </Tag>
        <Tag color="magenta" bordered={false}>
          magenta
        </Tag>
        <Tag color="red" bordered={false}>
          red
        </Tag>
        <Tag color="volcano" bordered={false}>
          volcano
        </Tag>
        <Tag color="orange" bordered={false}>
          orange
        </Tag>
        <Tag color="gold" bordered={false}>
          gold
        </Tag>
        <Tag color="lime" bordered={false}>
          lime
        </Tag>
        <Tag color="green" bordered={false}>
          green
        </Tag>
        <Tag color="cyan" bordered={false}>
          cyan
        </Tag>
        <Tag color="blue" bordered={false}>
          blue
        </Tag>
        <Tag color="geekblue" bordered={false}>
          geekblue
        </Tag>
        <Tag color="purple" bordered={false}>
          purple
        </Tag>
      </div>

      <Divider>自定义颜色</Divider>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>

      <Divider>自定义图标</Divider>
      <Tag icon={<AiOutlineTwitter />} color="#55acee">
        Twitter
      </Tag>
      <Tag icon={<AiOutlineYoutube />} color="#cd201f">
        Youtube
      </Tag>
      <Tag icon={<AiOutlineFacebook />} color="#3b5999">
        Facebook
      </Tag>
      <Tag icon={<AiOutlineLinkedin />} color="#55acee">
        LinkedIn
      </Tag>
    </>
  );
};

export default Tags;
