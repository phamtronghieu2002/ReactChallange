



import { ControllerWrapper } from "~/helper/controller.helper";
import * as messageService from "~/services/messageService";
export const sendMessage = ControllerWrapper(async (req, res) => {
    const { senderId, conversationId, message ,receiverId} = req.body;
    const result = await messageService.handleSendMessage(senderId, conversationId, message,receiverId);

    return res.status(200).json({
        message: "message sent successfully",
        data: result,
        success: true
    });
})

export const getMessage = ControllerWrapper(async (req, res) => {

    const { conversationId } = req.query;

    const result = await messageService.handleGetMessage(conversationId);

    return res.status(200).json({
        message: "message sent successfully",
        data: result,
        success: true
    });
})
