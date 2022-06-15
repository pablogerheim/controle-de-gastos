import express from "express";
import sessaoController from "../controllers/private.controller.js";

const router = express.Router();

router.get("/month/:id/:anoMes", sessaoController.getMonth);
router.delete("/:id", sessaoController.deleteSpend)
router.post("/", sessaoController.createSpend)
router.put("/", sessaoController.updateSpend)

export default router;