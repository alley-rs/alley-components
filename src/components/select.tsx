import { AiFillApi } from "solid-icons/ai";
import Select from "~/components/select";

const SelectDemo = () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <Select
      options={options}
      placeholder="请选择"
      defaultValue="1"
      position="bottom"
      prefix="demo"
      suffixIcon={<AiFillApi />}
      onChange={(value) => console.log("Selected:", value)}
      style={{ width: "200px" }}
    />
  );
};

export default SelectDemo;
