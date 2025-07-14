
import { ControllerWrapper } from "~/helper/controller.helper";

import * as authService from "~/services/authService";





export const CreateNewAccessCode = ControllerWrapper(async (req, res) => {
    const phoneNumber = `+${req.query.phoneNumber}` || '';
    const accessCode = await authService.handleCreateNewAccessCode(phoneNumber);

    return res.status(200).json({
        message: `otp send is ${accessCode}`,
        data: accessCode,
        success: true
    });

})


export const ValidateAccessCode = ControllerWrapper(async (req, res) => {

    const phoneNumber = `+${req.query.phoneNumber}` || '';
    const accessCode = req.query.accessCode || '';
    const fb = await authService.handleValidateAccessCode(phoneNumber, accessCode);
    return res.status(200).json(fb);

})





export const getProfile = ControllerWrapper(async (req, res) => {

    const employee = req.user;


    return res.status(200).json({
        message: "profile fetched successfully",
        data: employee,
        success: true
    });
})


export const loginPassword = ControllerWrapper(async (req, res) => {

    const { username, password } = req.body;

    const fb = await authService.handleLoginPassword(username, password);

    return res.status(200).json(fb);
})