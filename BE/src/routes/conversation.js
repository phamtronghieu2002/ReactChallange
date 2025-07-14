const express = require("express");
const Router = express.Router();
import { veryfyUser } from "~/middlewares/authMiddleware";
import * as conversationController  from "../controllers/conversationController";



Router.post("/createConversation", conversationController?.createConversation);

Router.get("/getConversation", conversationController?.getConversation);



module.exports = Router;
