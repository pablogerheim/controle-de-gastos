import { promises as fs } from "fs"

const { readFile, writeFile } = fs

async function readFileUser() {
    return JSON.parse(await readFile("users.json"))
}

async function writeFileUser(obj) {
    await writeFile("users.json", JSON.stringify(obj, null, 2))
}

async function readFileFunction() {
    return JSON.parse(await readFile("db.json"))
}

async function writeFileFunction(obj) {
    await writeFile("db.json", JSON.stringify(obj, null, 2))
}

export default {
    readFileFunction,
    writeFileFunction,
    readFileUser,
    writeFileUser
}