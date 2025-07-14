import { ControllerWrapper } from "~/helper/controller.helper";
import * as conversationService from "~/services/conversationService";

export const createConversation = ControllerWrapper(async (req, res) => {

    const members = req.body;
    const fb = await conversationService.handleCreateConversation(members);

    return res.status(200).json(fb);
})

export const getConversation = ControllerWrapper(async (req, res) => {
    const employeeId = req.query.employeeId || '';

    const conversation = await conversationService.handleGetConversation(employeeId);

    return res.status(200).json({
        message: "conversation fetched successfully",
        data: conversation,
        success: true
    });

})
