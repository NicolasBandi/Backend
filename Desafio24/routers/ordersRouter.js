import { Router } from "express";

import ordersController from "../controllers/ordersController.js";

const router = Router();

router.post("/:id", ordersController.createById);

export default router;