import { FC, useState } from "react";
import { Modal } from "antd";

interface ModalProps {
  button: React.ReactNode;
  content: (onClose: any) => React.ReactNode;
  width?: number;
  height?: number;
  title: string;
}

const ModalCommon: FC<ModalProps> = ({
  button,
  content,
  width = 700,
  height = 500,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {<div onClick={showModal}>{button}</div>}
      {isModalOpen && (
        <Modal
          open
          centered
          footer={false}
          width={width}
          height={height}
          title={title}
          closable={{ "aria-label": "Custom Close Button" }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {content(handleCancel)}
        </Modal>
      )}
    </>
  );
};

export default ModalCommon;
