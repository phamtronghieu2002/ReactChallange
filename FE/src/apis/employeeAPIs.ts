import axiosInstance from "@/configs/axios";

export interface RegisI {
  username: string;
  password: string;
  email: string | undefined;
  accessCode: string | undefined;
}

export const register = async (data: RegisI) => {
  return axiosInstance.post(`/employee/RegisterEmployee`, data);
};

export const persistEmployeeAuth = async (data:any) => {
  return axiosInstance.post("/employee/CreateEmployeeAuth", data);
};

export const persistEmployee = async (data:any) => {
  return axiosInstance.post("/employee/CreateEmployee", data);
};

export const deleteEmployee = async (employeeId: string) => {
  return axiosInstance.delete(`/employee//DeleteEmployee/${employeeId}`);
};

export const updateEmployee = async (employeeId: string,data:any) => {
  return axiosInstance.put(`/employee/UpdateEmployee/${employeeId}`,data);
};

export const getEmployees = async () => {
  return axiosInstance.get(`/employee/GetAllEmployee`);
};

export const getEmployee = async (employeeId: string) => {
  return axiosInstance.get(`/employee/GetEmployee/${employeeId}`);
};


export const getEmployeesByRole = async (role:string) => {
  return axiosInstance.get(`/employee/GetEmployeeByRole?role=${role}`);
};