import express from "express";
import winston from "winston";
import publicRoute from "./routes/public.routes.js"
import privateRoute from "./routes/private.routes.js"
import { promises } from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js"
import jwt from 'jsonwebtoken'


const { readFile, writeFile } = promises;

global.fileName = "base.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({ filename: "base.log" })
    ],
    format: combine(
        label({ label: "base" }),
        timestamp(),
        myFormat
    )
});

const corsOptions = {
    credentials: true,
    origin: '*'
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
//app.use(express.static("public"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//public
app.use("/login", publicRoute);
//private
app.use("/private", checkToken, privateRoute);
//checkToken,
function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Acesso negado!" });
    try {
        const secret = 'process.env.SECRET';
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(400).json({ msg: "O Token é inválido!" });
    }
}

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

//http://localhost:3001/login/register

app.listen(3001, async() => {
    try {
        await readFile(global.fileName);
        logger.info("API Started!");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err);
        });
    }
});