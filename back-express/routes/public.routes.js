import express from "express";
import sessaoController from "../controllers/base.controller.js";

const router = express.Router();

router.post("/register", sessaoController.register);
router.post("/login", sessaoController.login);
router.delete("/delete/:id",)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;