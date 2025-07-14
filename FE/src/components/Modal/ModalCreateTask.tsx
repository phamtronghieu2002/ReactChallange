import { useAppDispatch, useAppSelector } from "@/app/hook";
import FormCommon, { FieldProps } from "@/components/commons/Form/Form";
import ModalCommon from "@/components/commons/Modal/Modal";
import { getEmployees } from "@/slices/employeeSlice";
import { createTask } from "@/slices/taskSlice";

import { Button } from "antd";
import { FC, FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
interface ModalCreateTaskProps {
    data?: any;
    button: ReactNode;
}

const ModalCreateTask: FC<ModalCreateTaskProps> = ({
    data,
    button,
}) => {
    return (
        <ModalCommon
            title="Create Tasks"
            button={button}
            content={(onClose: any) => (
                <FormCreateTask data={data} onClose={onClose} />
            )}
        />
    );
};

interface FormCreateTaskProps {
    onClose: any;
    data: any;

}

const FormCreateTask: FunctionComponent<FormCreateTaskProps> = ({
    onClose,
    data = {},

}) => {
    const submitRef = useRef<HTMLButtonElement>(null);

    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.task);
    const { data: employees } = useAppSelector((state) => state.employee);

    const handleSubmit = async (data: any) => {

        console.log(data)
        const res = await dispatch(
            createTask(data)
        );


        if (res.payload.success) {
            onClose?.();
        }
    };


    const fetchAllEmployees = async () => {
        await dispatch(getEmployees());
    }

    useEffect(() => {
        fetchAllEmployees()
    }, []);

    const formField: FieldProps[] = [
        {
            name: "title",
            label: "Title",
            type: "input",
            rules: [{ required: true, message: "please input Employee name !" }],
        },
        {
            name: "employeeId",
            label: "Employee",
            type: "select",
            options: employees.map((employee) => ({
                title: employee.name || employee.username,
                value: employee.employeeId,
            })),

            rules: [{ required: true, message: "please input your employee!" }],
        },
        {
            name: "description",
            label: "Description",
            type: "textArea",
            rules: [{ required: true, message: "please input your phone number!" }],
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

export default ModalCreateTask;
