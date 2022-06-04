import express from "express";
import sessaoController from "../controllers/private.controller.js";

const router = express.Router();

router.get("/month/:id/:anoMes", sessaoController.getMonth);
router.delete("/:id", sessaoController.deleteSpent)
router.post("/", sessaoController.createSpent)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;