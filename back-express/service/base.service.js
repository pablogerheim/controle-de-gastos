import baseRepository from "../repository/base.repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function findUser(email) {
    let userdb = await baseRepository.readFileUser()
    return userdb.users.find(
        (user) => user.email === email
    );
}

async function create(email, senha) {
    let userdb = await baseRepository.readFileUser()
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    let user = {
        "id": userdb.nextId,
        "email": email,
        "senha": passwordHash,
        "timestamp": new Date
    }
    userdb.nextId++
        userdb.users.push(user)

    await baseRepository.writeFileUser(userdb)
    return user
}

async function pegar() {
    const data = await baseRepository.readFileFunction()
}

export default {
    findUser,
    create,
    pegar
}