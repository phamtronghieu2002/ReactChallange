const express = require("express");
const Router = express.Router();
import * as messageController  from "../controllers/messageController";




Router.post("/sendMessage", messageController?.sendMessage);
Router.get("/getMessage", messageController?.getMessage);




module.exports = Router;
