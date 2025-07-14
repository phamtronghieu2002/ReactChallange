import ModalCommon from "@/components/commons/Modal/Modal";
import { Button } from "antd";
import { FC, FunctionComponent, ReactNode } from "react";
interface ModalCreateEmployeeProps {
  cbSuscess: () => void;
  button: ReactNode;
  title: string;
  loading: boolean;
}

const ModalConfirm: FC<ModalCreateEmployeeProps> = ({
  cbSuscess,
  button,
  title,
  loading
}) => {
  return (
    <ModalCommon
      width={500}
      height={500}
      title={title}
      button={button}
      content={(onClose: any) => (
        <FormConfirm cbSuscess={cbSuscess} onClose={onClose}  loading={loading}/>
      )}
    />
  );
};

interface FormCreateEmployeeProps {
  onClose: any;
  loading?: boolean;
  cbSuscess: () => void;
}

const FormConfirm: FunctionComponent<FormCreateEmployeeProps> = ({
  onClose,
  loading,
  cbSuscess,
}) => {
  const handleClose = () => {
    onClose?.();
  };

  const handleOk = async () => {
    await cbSuscess();
    handleClose();
  };

  return (
    <div className="flex justify-end gap-3">
      <Button onClick={handleClose} className="text-red-600">
        Cancel
      </Button>
      <Button onClick={handleOk} loading={loading} type="primary">
        OK
      </Button>
    </div>
  );
};

export default ModalConfirm;
