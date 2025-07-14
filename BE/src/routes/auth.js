const express = require("express");
const Router = express.Router();
import { veryfyUser } from "~/middlewares/authMiddleware";
import * as authController  from "../controllers/authController";



Router.post("/CreateNewAccessCode", authController?.CreateNewAccessCode);
Router.post("/ValidateAccessCode", authController?.ValidateAccessCode);
Router.get("/getProfile",veryfyUser, authController?.getProfile);
Router.post("/loginPassword", authController?.loginPassword);


module.exports = Router;
