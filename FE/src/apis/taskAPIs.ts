import axiosInstance from "@/configs/axios";


export const createTask = (data: any) => {
    return axiosInstance.post("/task/createTask", data)
}


export const getTaskByEmployeeId = (employeeId: string) => {
    return axiosInstance.get(`/task/GetTaskByEmployeeId/${employeeId}`)
}

export const getAllTasks = () => {
    return axiosInstance.get(`/task/getAllTask`)
}


export const updateStatusTask = (data: {
    taskId: string,
    status: boolean
}) => {
    return axiosInstance.put(`/task/updateStatusTask`, data)
}