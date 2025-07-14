const express = require("express");
const Router = express.Router();
import * as taskController from "../controllers/taskController";



Router.get("/GetAllTask", taskController?.getAllTask);
Router.get("/GetTaskByEmployeeId/:employeeId", taskController?.getTaskByEmployeeId);
Router.post("/createTask", taskController?.createTask);
Router.put("/updateStatusTask", taskController?.updateStatusTask);




module.exports = Router;
