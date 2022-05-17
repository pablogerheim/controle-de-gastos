import express from "express";
import sessaoController from "../controllers/base.controller.js";

const router = express.Router();

// verificar como monta URL
router.get("/:id", sessaoController.getAll);
router.get("/month/:id/:anoMes", sessaoController.getMonth);
router.delete("/:id", sessaoController.deleteSpent)
router.put("/", sessaoController.createSpent)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;