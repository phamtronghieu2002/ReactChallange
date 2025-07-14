import { ControllerWrapper } from "~/helper/controller.helper";
import * as taskService from "~/services/taskService";
export const getAllTask = ControllerWrapper(async (req, res) => {

    const fb = await taskService.handleGetAllTask();

    return res.status(200).json(fb);

});

export const createTask = ControllerWrapper(async (req, res) => {


    const data = req.body;
    const fb = await taskService.handleCreateTask(data);

    return res.status(200).json(fb);

});

export const updateStatusTask = ControllerWrapper(async (req, res) => {

    const {taskId, status} = req.body;
    const fb = await taskService.handleUpdateStatusTask(taskId, status);

    return res.status(200).json(fb);

});


export const getTaskByEmployeeId = ControllerWrapper(async (req, res) => {

    const {employeeId} = req.params;
    const fb = await taskService.handleGetTaskByEmployeeId(employeeId);

    return res.status(200).json(fb);

});


