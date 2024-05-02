import Segmented from "~/components/segmented";

const DemoSegmented = () => {
  return (
    <Segmented
      options={["日", "周", "月", "季", "年"]}
      onChange={(value) => console.log(value)}
    />
  );
};

export default DemoSegmented;
