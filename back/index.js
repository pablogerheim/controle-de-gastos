import express from "express";
import winston from "winston";
import publicRoute from "./routes/public.routes.js"
import privateRoute from "./routes/private.routes.js"
import { promises } from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js"
import jwt from 'jsonwebtoken'
import validate from "./helper/helperList.js";

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
    origin: '*',
    Accept: "*/*"
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/login", publicRoute);
app.use("/private", checkToken, privateRoute);
app.use("/logout", async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        let blaklist = JSON.parse(await readFile("blaklist.json"))
        let blaktoken = {
            token,
            date: new Date
        }
        blaklist.blaktokens.forEach((e, i) => {
            if (!validate(e.date)) { blaklist.blaktokens[i].delete() }
        });

        blaklist.blaktokens.push(blaktoken)
        await writeFile("blaklist.json", JSON.stringify(blaklist, null, 2))


        res.status(200).json({ msg: "Deslogado com susseso" })
        logger.info(`POST / Logout `);
    } catch (err) {
        next(err);
    }
})

async function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) { return res.status(401).json({ msg: "Acesso negado!" }) }
    let blaklist = JSON.parse(await readFile("blaklist.json"))
    let blaktoken = blaklist.blaktokens.find(t => t.token === token)
    if (blaktoken) { if (blaktoken.token === token) { return res.status(401).json({ msg: "Acesso negado!" }) } }
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