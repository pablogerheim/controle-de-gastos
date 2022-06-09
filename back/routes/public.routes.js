import express from "express";
import sessaoController from "../controllers/public.controller.js";

const router = express.Router();

router.post("/register", sessaoController.register);
router.post("/", sessaoController.login);
router.delete("/delete/:id", )

export default router;