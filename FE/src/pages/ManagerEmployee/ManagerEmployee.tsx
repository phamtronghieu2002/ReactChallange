import { useAppDispatch, useAppSelector } from "@/app/hook";
import TableCommon from "@/components/commons/Table/Table";
import ModalConfirm from "@/components/Modal/ModalConfirm";
import ModalCreateEmployee from "@/components/Modal/ModalCreateEmployee";
import { deleteEmployee, getEmployees } from "@/slices/employeeSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { FC, useEffect } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

interface ManagerEmployeeProps {}

const ManagerEmployee: FC<ManagerEmployeeProps> = () => {
  const { data, loading } = useAppSelector((state) => state.employee);

  const dispatch = useAppDispatch();

  const handleGetDataEmployee = async () => {
    await dispatch(getEmployees());
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "address",
      render: (_: any, record: any) => (
        <>
          <Tag color={record.status ? "blue" : "red"}>
            {record.status ? "actived" : "not active"}
          </Tag>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <div className="flex gap-5">
            <ModalConfirm
              loading={loading}
              title="Do you want to remove Employee ?"
              button={
                <Button className="flex items-center justify-center w-[40px] p-0">
                  <CiTrash color="red" size={20} />
                </Button>
              }
              cbSuscess={() => {
                dispatch(deleteEmployee(record?.employeeId));
              }}
            />
            <ModalCreateEmployee
              title="Edit employee"
              data={record}
              button={
                <Button className="flex items-center justify-center w-[40px] p-0">
                  <CiEdit color="yellow" size={20} />
                </Button>
              }
              mode="update"
            />
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    handleGetDataEmployee();
  }, []);

  return (
    <div>
      <TableCommon
        search={{
          onSearch: (value) => {},
          placeholder: "Search by manager",
        }}
        columns={columns}
        loading={loading}
        actions={
          <ModalCreateEmployee
            button={
              <Button type="primary" icon={<PlusOutlined />}>
                Add Employee
              </Button>
            }
            mode="add"
          />
        }
        dataSource={data}
      />
    </div>
  );
};

export default ManagerEmployee;
