import { persistEmployeeAuth } from "@/apis/employeeAPIs";
import axiosInstance from "@/configs/axios";

export const sendAccessCode = async (phoneNumber: string) => {
  return axiosInstance.post(
    `/auth/CreateNewAccessCode?phoneNumber=${phoneNumber}`,
    {}
  );
};

export const verifyAccessCode = async (
  phoneNumber: string,
  accessCode: string
) => {
  return axiosInstance.post(
    `/auth/ValidateAccessCode?phoneNumber=${phoneNumber}&accessCode=${accessCode}`,
    {}
  );
};

export const getProfile = async () => {
  return axiosInstance.get(`/auth/getProfile`);
};

export const sendAccessCodeEmail = (data: {
  email: string;
  department?: string;
  name?: string;
}) => {
  return persistEmployeeAuth(data);
};

export const loginPassword = (data: { username: string; password: string }) => {
  return axiosInstance.post("/auth/loginPassword", data);
};
