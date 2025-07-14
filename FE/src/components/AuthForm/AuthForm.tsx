import React, { FC } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Button, Form, Input } from "antd";
import PhoneInput from "antd-phone-input";
interface FieldProps {
  name: string;
  type: string;
  rules: any
  placeholder: string;
}

export interface AuthFormProps {
  loading?: boolean;
  onSubmit?: (data: any) => void;
  onBack?: () => void;
  fields: FieldProps[];
  buttonText?: string;
  headerTitle?: string;
  subHeaderTitle?: string;
  labelTitle?: string;
  footerTitle: React.ReactNode;
  validationField?: string;
}

const AuthForm: FC<AuthFormProps> = ({
  onSubmit,
  fields,
  headerTitle,
  subHeaderTitle,
  buttonText = "Submit",
  labelTitle,
  footerTitle,
  onBack,
  loading,
}) => {
  const handleFinish = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };
  return (
    <div className="auth-form-container  gap-7 flex flex-col w-[360px] border border-gray-300 rounded-lg p-6 shadow-md bg-white">
      {onBack && (
        <div className="actions flex gap-2 items-center">
          <span className="flex items-center justify-center w-6 h-6 hover:cursor-pointer hover:bg-gray-300 rounded-full">
            <IoMdArrowBack size={18} onClick={onBack} />
          </span>
          <span className="font-bold">Back</span>
        </div>
      )}
      <h1 className="font-bold text-2xl text-center">{headerTitle}</h1>
      <p className="text-center text-sm text-gray-400">{subHeaderTitle}</p>
      <Form onFinish={handleFinish}>
        {fields.map((field: FieldProps, index: number) => (
          <Form.Item key={index} name={field.name} rules={field.rules}>
            {field.type === "password" && (
              <Input.Password
                className="h-10"
                placeholder={field.placeholder}
              />
            )}

            {field.type == "phone" && <PhoneInput defaultValue="VN" enableSearch />}

            {field.type === "text" && (
              <Input className="h-10" placeholder={field.placeholder} />
            )}

            {field.type === "otp" && <Input.OTP className="h-10" />}
          </Form.Item>
        ))}

        <Form.Item className="mb-0">
          <Button
            disabled={loading}
            loading={loading}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
      <p className="text-sm text-center text-gray-500">{labelTitle}</p>
      {footerTitle}
    </div>
  );
};

export const FooterTitleWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex  gap-2 text-sm foot_form">{children}</div>;
};

export default AuthForm;
