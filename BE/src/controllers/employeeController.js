import { ControllerWrapper } from "~/helper/controller.helper";
import * as employeeService from "~/services/employeeService";

export const getEmployee = ControllerWrapper(async (req, res) => {

    const employeeId = req.params.employeeId || '';
    console.log("employeeId >>>", employeeId);
    
    const fb = await employeeService.handleGetEmployee(employeeId);
   console.log();
   
    return res.status(200).json(fb);
})

export const getEmployeeByRole = ControllerWrapper(async (req, res) => {

    const role = req.query.role || '';
    const employee = await employeeService.handleGetEmployeeByRole(role);

    return res.status(200).json({
        message: "employee fetched successfully",
        data: employee,
        success: true
    });
})


export const getAllEmployees = ControllerWrapper(async (req, res) => {

    const employees = await employeeService.handleGetEmployees();


    return res.status(200).json({
        message: "employee fetched successfully",
        data: employees,
        success: true
    });
})


export const deleteEmployee = ControllerWrapper(async (req, res) => {

    const employeeId = req.params.employeeId || '';

    const result = await employeeService.handleDeleteEmployee(employeeId);

    return res.status(200).json({
        message: "employee deleted successfully",
        data: result,
        success: true
    });
})

export const createEmployeeAuth = ControllerWrapper(async (req, res) => {

    const employee = req.body;

    const result = await employeeService.handleCreateEmployeeAuth(employee);

    return res.status(200).json(result);
})


export const createEmployee = ControllerWrapper(async (req, res) => {

    const employee = req.body;

    const result = await employeeService.handleCreateEmployee(employee);

    return res.status(200).json(result);
})


export const registerEmployee = ControllerWrapper(async (req, res) => {

    const { email, accessCode, password, username } = req.body;

    const result = await employeeService.handleRegisterEmployee(email, accessCode, password, username);

    let message = result ? "employee registered successfully" : "employee registered failed";
    return res.status(200).json({
        message: message,
        success: result
    });
})

export const updateEmployee = ControllerWrapper(async (req, res) => {

    const employeeId = req.params.employeeId || '';
    const employee = req.body;

    const result = await employeeService.handleUpdateEmployee(employeeId, employee);

    return res.status(200).json(result);
})
