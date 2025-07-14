import { getEmployeesByRole } from "@/apis/employeeAPIs";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { ROLES } from "@/contants/Role";
import { createConversation } from "@/slices/chatSlice";
import { Form, Select } from "antd";
import { FunctionComponent, useEffect, useState } from "react";

interface UserSelectProps { }

const UserSelect: FunctionComponent<UserSelectProps> = () => {

    const [employees, setEmployees] = useState<any[]>([])

    const { user } = useAppSelector((state) => state.user)
    const dispatch =useAppDispatch();
    const fetchEmployees = async () => {


        try {
            const role = user?.role == ROLES.Admin ? ROLES.Employee : ROLES.Admin
            const response = await getEmployeesByRole(role)
            setEmployees(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchEmployees()

    }, [])


    const handleSelectUser = async(employeeId: string) => {
            await dispatch(createConversation([employeeId,user?.employeeId]))
    }

    return (
        <div id="user_select" className="p-3 border-b-2">

            <Form
                layout="vertical"
            >

                <Form.Item
                    className="m-0"
                >

                    <Select

                        className="w-full"
                        showSearch
                        placeholder="Select User to chat"
                        optionFilterProp="label"
                        onChange={handleSelectUser}
                        options={employees.map((employee) => ({
                            label: employee.name,
                            value: employee.employeeId
                        }))}
                    />
                </Form.Item>
            </Form>



        </div>
    );
};

export default UserSelect;
