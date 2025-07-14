import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";


export const ControllerWrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res);
    } catch (error) {
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message, error.stack))
    }
}
