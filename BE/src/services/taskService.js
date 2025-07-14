import { COLLECTIONS } from "~/constants/collections";
import { db } from "~/firebase";
import { BaseModel } from "~/models";



export const handleGetAllTask = async () => {


    const tasks = await db.collection(COLLECTIONS.tasks).get();
    console.log(tasks.docs.map((doc) => doc.data()));
    return {
        message: "Get all task successfully",
        data: tasks.docs.map((doc) => doc.data()),
        success: true,
    }
}

export const handleCreateTask = async (data) => {


    const snapShot = await db.collection(COLLECTIONS.employees).doc(data.employeeId).get();
    if (!snapShot.exists) {
        return {
            message: "Employee not found",
            data: null,
            success: false,
        }
    }
    const employee = snapShot.data();

    const task = await db.collection(COLLECTIONS.tasks).add({

        ...BaseModel.task,
        ...data,
        employee: {
            employeeId: employee.employeeId,
            name: employee.name || employee.username,
        }

    });

    await task.update({
        taskId: task.id,
    })
    return {
        message: "Create task successfully",
        data: (await task.get()).data(),
        success: true,
    }
}


export const handleUpdateStatusTask = async (taskId, status) => {

    await db.collection(COLLECTIONS.tasks).doc(taskId).update({
        status: status,
    })
    return {
        message: "Update status task successfully",
        data: (await db.collection(COLLECTIONS.tasks).doc(taskId).get()).data(),
        success: true,
    }
}






export const handleGetTaskByEmployeeId = async (employeeId) => {

    const tasks = await db.collection(COLLECTIONS.tasks).where("employeeId", "==", employeeId).get();

    return {
        message: "Get task by employee id successfully",
        data: tasks.docs.map((doc) => doc.data()),
        success: true,
    }
}