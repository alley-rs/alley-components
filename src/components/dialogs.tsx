import { createSignal } from "solid-js";
import Dialog from "~/components/dialog";
import { showDialog } from "~/components/dialog/function";
import { Button, Space, Typography } from "~/index";

const Dialogs = () => {
  const [hasTitle, setHasTitle] = createSignal(false);
  const [noTitle, setNoTitle] = createSignal(false);

  const handleShowDialog = () => {
    showDialog({
      title: "函数式对话框",
      type: "success",
      size: "small",
      children: <p>这是通过函数调用的对话框</p>,
      showCloseIcon: true,
    });
  };

  return (
    <>
      <Space gap={8}>
        <Button onClick={() => setHasTitle(true)}>有标题</Button>
        <Button onClick={() => setNoTitle(true)}>无标题</Button>
        <Button onClick={() => handleShowDialog()}>函数式</Button>
      </Space>

      <Dialog showCloseIcon show={noTitle()} onClose={() => setNoTitle(false)}>
        <Typography>默认点击遮罩时可以关闭</Typography>
      </Dialog>

      <Dialog
        showCloseIcon
        maskClosable={false}
        show={hasTitle()}
        onClose={() => setHasTitle(false)}
        title="对话框"
      >
        <Typography>禁止点击遮罩时关闭以防止误触</Typography>
      </Dialog>
    </>
  );
};

export default Dialogs;
