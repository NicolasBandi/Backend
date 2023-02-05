import { Router } from "express";

import productsController from "../controllers/productsController.js";

const router = Router();

router.post("/", productsController.create);

router.get("/", productsController.get);

router.get("/:id", productsController.getById);

router.put("/:id", productsController.updateById);

router.delete("/:id", productsController.deleteById);

export default router;
