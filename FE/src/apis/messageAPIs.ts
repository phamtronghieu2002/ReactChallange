import axiosInstance from "@/configs/axios";



export const sendMessage = async (data:{
    senderId:string,
    conversationId:string,
    message:string,
    receiverId:string,
}) => {
    return axiosInstance.post("/message/sendMessage", data)
}

export const getMessages = async (conversationId:string) => {
    return axiosInstance.get(`/message/getMessage?conversationId=${conversationId}`)
}


