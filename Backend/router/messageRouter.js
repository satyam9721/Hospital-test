import express from "express";
import { getAllmessages, sendMessage } from "../controller/messageController.js";
import {isAdminAuthenticated} from "../middlewares/auth.js"


const router = express.Router();

router.post("/send",sendMessage); //to send messages
router.get("/getall",isAdminAuthenticated ,getAllmessages); //to get all messages

//router.get("/getall" ,getAllmessages);

export default router;