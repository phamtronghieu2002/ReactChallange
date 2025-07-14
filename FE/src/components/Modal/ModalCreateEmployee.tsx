import { useAppDispatch, useAppSelector } from "@/app/hook";
import FormCommon, { FieldProps } from "@/components/commons/Form/Form";
import ModalCommon from "@/components/commons/Modal/Modal";
import { createEmployee, updateEmployee } from "@/slices/employeeSlice";
import { getPhoneNumber } from "@/untils/data";
import { Button } from "antd";
import { FC, FunctionComponent, ReactNode, useRef } from "react";
interface ModalCreateEmployeeProps {
  data?: any;
  mode: "add" | "update";
  button: ReactNode;
  title?:string;
}

const ModalCreateEmployee: FC<ModalCreateEmployeeProps> = ({
  data,
  mode = "add",
  button,
  title="Create Employee"
}) => {
  return (
    <ModalCommon
      title={title}
      button={button}
      content={(onClose: any) => (
        <FormCreateEmployee data={data} onClose={onClose} mode={mode} />
      )}
    />
  );
};

interface FormCreateEmployeeProps {
  onClose: any;
  data: any;
  mode: "add" | "update";

}

const FormCreateEmployee: FunctionComponent<FormCreateEmployeeProps> = ({
  onClose,
  data = {},
  mode,
}) => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.employee);

  const handleSubmit = async (value: any) => {
    const phoneNumber = `+${getPhoneNumber(value.phoneNumber)}`;
    const actions = () => {
      switch (mode) {
        case "update":
          return dispatch(
            updateEmployee({
              employeeId: data.employeeId,
              data: { ...value, phoneNumber },
            })
          );

        default:
          return dispatch(createEmployee({ ...value, phoneNumber }));
      }
    };

    const res = await actions();

    if (res.payload.success) onClose?.();
  };

  const formField: FieldProps[] = [
    {
      name: "name",
      label: "Employee Name",
      type: "input",
      rules: [{ required: true, message: "please input Employee name !" }],
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "phone",
      rules: [{ required: true, message: "please input your phone number!" }],
    },

    {
      name: "email",
      label: "Email",
      type: "input",
      rules: [{ required: true, message: "please input your email!" }],
    },

    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        {
          title: "Employee",
          value: "Employee",
        },
      ],

      rules: [{ required: true }],
    },
    {
      name: "address",
      label: "Adress",
      type: "textArea",
      rules: [{ required: true, message: "please input your address!" }],
    },
    {
      name: "department",
      label: "Department",
      type: "input",
      rules: [{ required: true, message: "please input your department!" }],
    },
  ];

  return (
    <div>
      <FormCommon
        initData={data}
        onSubmit={handleSubmit}
        ref={submitRef}
        chunkSize={2}
        fields={formField}
      />
      ;
      <div className="flex justify-end">
        <Button loading={loading} onClick={() => submitRef?.current?.click()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ModalCreateEmployee;
