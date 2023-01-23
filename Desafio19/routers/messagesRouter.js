import { Router } from "express";

import messagesController from "../controllers/messagesController.js";

const router = Router();

router.post("/", messagesController.create);

router.get("/", messagesController.get);

export default router;
