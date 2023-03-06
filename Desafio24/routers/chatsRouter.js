import { Router } from "express";

import chatsController from "../controllers/chatsController.js";

const router = Router();

router.post("/", chatsController.create);

router.get("/", chatsController.get);

router.get("/:email", chatsController.getByEmail);

export default router;