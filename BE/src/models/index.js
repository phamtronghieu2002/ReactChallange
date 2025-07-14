import { serverTimestamp } from "~/firebase";

const BaseModel = {
    employees: {
        employeeId: "",
        name: "",
        department: "",
        username: "",
        phoneNumber: "",
        password: "",
        status: false,
        role: "Admin",
        accessCode: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    },
    conversation: {
        conversationId: "",
        lastMessage: "Welcome to chat !",
        members: [],
        isRead: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

    },
    message: {
        messageId: "",
        conversationId: "",
        senderId: "",
        receiverId: "",
        createdAt: serverTimestamp(),
        message: "",
        updatedAt: serverTimestamp(),
    },
    task: {
        taskId: "",
        title: "",
        description: "",
        status: false,
        employee: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),







    }
}

export { BaseModel };