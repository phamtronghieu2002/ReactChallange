import { useAppDispatch, useAppSelector } from "@/app/hook";
import FormCommon, { FieldProps } from "@/components/commons/Form/Form";
import ModalCommon from "@/components/commons/Modal/Modal";
import { createEmployee, updateEmployee } from "@/slices/employeeSlice";
import { updateProfile } from "@/slices/userSlice";
import { getPhoneNumber } from "@/untils/data";
import { Button } from "antd";
import { FC, FunctionComponent, ReactNode, useRef } from "react";
interface ModalEditProfileProps {
    data?: any;

    button: ReactNode;
}

const ModalEditProfile: FC<ModalEditProfileProps> = ({
    data,
    button,
}) => {
    return (
        <ModalCommon
            title="Edit Profile"
            button={button}
            content={(onClose: any) => (
                <FormEditProfile data={data} onClose={onClose} />
            )}
        />
    );
};

interface FormCreateEmployeeProps {
    onClose: any;
    data: any;

}

const FormEditProfile: FunctionComponent<FormCreateEmployeeProps> = ({
    onClose,
    data = {},

}) => {
    const submitRef = useRef<HTMLButtonElement>(null);

    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.employee);

    const handleSubmit = async (value: any) => {
        const phoneNumber = `+${getPhoneNumber(value.phoneNumber)}`;

        const res = await dispatch(
            updateEmployee({
                employeeId: data.employeeId,
                data: { ...value, phoneNumber },
            })
        );


        if (res.payload.success) {
            dispatch(updateProfile(res.payload.data))
            onClose?.();
        }
    };

    const formField: FieldProps[] = [
        {
            name: "name",
            label: "Employee Name",
            type: "input",
            rules: [{ message: "please input Employee name !" }],
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            type: "phone",
            rules: [{ required: false, message: "please input your phone number!" }],
        },

        {
            name: "email",
            label: "Email",
            type: "input",
            rules: [{ message: "please input your email!" }],
        },
        {
            name: "address",
            label: "Adress",
            type: "textArea",
            rules: [{ message: "please input your address!" }],
        },
        {
            name: "department",
            label: "Department",
            type: "input",
            rules: [{ message: "please input your department!" }],
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

export default ModalEditProfile;
