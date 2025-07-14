const express = require("express");
const Router = express.Router();
import { veryfyUser } from "~/middlewares/authMiddleware";
import * as employeeController  from "../controllers/employeeController";



Router.get("/GetEmployee/:employeeId", employeeController?.getEmployee);
Router.get("/GetEmployeeByRole", employeeController?.getEmployeeByRole);
Router.get("/GetAllEmployee", employeeController?.getAllEmployees);
Router.post("/RegisterEmployee", employeeController?.registerEmployee);
Router.post("/CreateEmployeeAuth", employeeController?.createEmployeeAuth);
Router.post("/CreateEmployee", employeeController?.createEmployee);
Router.delete("/DeleteEmployee/:employeeId", employeeController?.deleteEmployee);
Router.put("/UpdateEmployee/:employeeId", employeeController?.updateEmployee);






module.exports = Router;
