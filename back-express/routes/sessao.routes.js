import express from "express";
import sessaoController from "../controllers/base.controller.js";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/register", sessaoController.register);
router.post("/login", sessaoController.login);
router.get("/user/:id", checkToken, sessaoController.getAll);
// verificar como monta URL
router.get("/userMonth/:id/:anoMes", checkToken, sessaoController.getMonth);
router.delete("/:id", )

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[0];
    console.log(token)
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
  
    try {
      const secret = 'process.env.SECRET';
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

export default router;