import { Router } from "express";

import cartsController from "../controllers/cartsController.js";

const router = Router();

router.post("/", cartsController.create);

router.get("/:id", cartsController.getById);

router.put("/:id", cartsController.updateById);

router.delete("/:id", cartsController.deleteById);

router.delete("/:id/:id_prod", cartsController.deleteProductById);

export default router;