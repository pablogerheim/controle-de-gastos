import baseRepository from "../repository/base.repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function findUser(email) {
    let userdb = await baseRepository.readFileUser()
    return userdb.users.find(
        (user) => user.email === email
    );
}

async function createUser(name, email, senha) {
    let userdb = await baseRepository.readFileUser()
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    let user = {
        "id": userdb.nextId,
        "name": name,
        "email": email,
        "senha": passwordHash,
        "timestamp": new Date
    }
    userdb.nextId++
    userdb.users.push(user)

    await baseRepository.writeFileUser(userdb)
    return user
}

async function compareUser(user, senha) {
    return await bcrypt.compare(senha, user.senha);
}

async function createToken(user) {
    const secret = 'process.env.SECRET';
    const token = jwt.sign({id: user._id,}, secret, {expiresIn: 900 // expires in 15min
 });
    return token
}

async function allHistory() {
    return await baseRepository.readFileFunction()
}

async function historyMonth(month) {
    const data = await baseRepository.readFileFunction()
    let monthArr = data.despesas.filter(despesa => despesa.mes === month)
    return monthArr.sort((a, b) => a.dia - b.dia)
}

async function deleteSpent(id) {
    let data = await baseRepository.readFileFunction()
    data.despesasr = data.despesas.filter(despesa => despesa.id !== id)
    await baseRepository.writeFileFunction(data)
}

async function createSpent(descricao, categoria, valor, mes, dia) {
    let data = await baseRepository.readFileFunction()

    let spent = {
        "id": nextId,
        "descricao": descricao,
        "categoria": categoria,
        "valor": valor,
        "mes": mes,
        "dia": dia
    }

    data.nextId++
    data.despesas.push(spent)

    await baseRepository.writeFileFunction(data)
    return spent
}

export default {
    findUser,
    createUser,
    compareUser,
    createToken,
    allHistory,
    historyMonth,
    deleteSpent,
    createSpent
}
