import axiosInstance from "@/configs/axios";



export const createConversation = async (members: string[]) => {
    return axiosInstance.post("/conversation/createConversation", members)
}

export const getConversation = async (employeeId: string) => {
    return axiosInstance.get(`/conversation/getConversation?employeeId=${employeeId}`)
}






