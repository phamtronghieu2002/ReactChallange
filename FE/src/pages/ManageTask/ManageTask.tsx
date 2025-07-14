import { useAppDispatch, useAppSelector } from "@/app/hook";
import usePermission from "@/app/usePermission";
import TableCommon from "@/components/commons/Table/Table";
import ModalCreateTask from "@/components/Modal/ModalCreateTask";
import { ROLES } from "@/contants/Role";
import { getAllTasks, getTaskByEmployeeId, updateStatusTask } from "@/slices/taskSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { FC, useEffect } from "react";

interface TaskProps { }

const ManageTask: FC<TaskProps> = () => {

  const { tasks, loading, statusLoading } = useAppSelector((state) => state.task);
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch();



  const handleGetTasks = async () => {
    await dispatch(getAllTasks());
  };


  const handleUpdateStatusTask = async (data: any) => {
    await dispatch(updateStatusTask({
      status: true,
      taskId: data.taskId
    }));
  };

  const handleGetTaskByEmployeeId = async () => {
    await dispatch(getTaskByEmployeeId(user?.employeeId ?? ""));
  };

  const columnActions = () => {

    return !usePermission(user?.role ?? ROLES.Admin) ? {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button
          loading={statusLoading}
          disabled={record.status}
          type="primary" onClick={() => handleUpdateStatusTask(record)}>
          Done
        </Button>
      )
    } : {}
  }


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400
    },
    {
      title: "Employee Assigned",
      dataIndex: "employee",
      key: "employeeId",
      render: (_: any, record: any) => (
        <>{record.employee?.name}</>
      )
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <>
          <Tag color={record.status ? "blue" : "red"}>
            {record.status ? "done" : "progress"}
          </Tag>
        </>
      ),
    },
    columnActions()
  ];

  useEffect(() => {
    const role = user?.role
    if (role === ROLES.Admin) {
      handleGetTasks()
    } else {
      handleGetTaskByEmployeeId()
    }
  }, []);

  return (
    <div>
      <TableCommon
      search={{
        onSearch: (value) => {
        },
        placeholder: "Search by tasks"
      }}
        columns={columns}
        loading={loading}
        actions={
          usePermission(user?.role ?? ROLES.Admin) ? <ModalCreateTask
            button={<Button type="primary" icon={<PlusOutlined />}>Create Tasks</Button>}
          /> : <> </>
        }
        dataSource={tasks}
      />
    </div>
  );
};

export default ManageTask;
