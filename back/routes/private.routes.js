import express from "express";
import sessaoController from "../controllers/private.controller.js";

const router = express.Router();

router.get("/month/:id/:anoMes", sessaoController.getMonth);
router.delete("/:id", sessaoController.deleteSpend)
router.post("/", sessaoController.createSpend)
router.put("/", sessaoController.updateSpend)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;