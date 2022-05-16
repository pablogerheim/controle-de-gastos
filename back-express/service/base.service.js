import baseRepository from "../repository/base.repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function findUser(email) {
    let userdb = await baseRepository.readFileUser()
    return userdb.users.find(
        (user) => user.email === email
    );
}

async function createUser(email, senha) {
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

async function compareUser(user, senha) {
    return await bcrypt.compare(senha, user.senha);
}

async function createToken(user) {
    const secret = 'process.env.SECRET';
    const token = jwt.sign(
        {
            id: user._id,
        },
        secret
    );
    return token
}

async function allHistory() {
    return await baseRepository.readFileFunction()
}

async function historyMonth(month) {
   const data = await baseRepository.readFileFunction()
   let monthArr = data.despesas.filter(despesa => despesa.mes === month)
    return monthArr.sort((a,b)=> a.dia - b.dia)
  }

  async function deleteSpend(id) {
    let data = await baseRepository.readFileFunction()
    data.despesasr = data.despesas.filter(despesa => despesa.id !== id)
    await baseRepository.writeFileFunction(data)
   }

export default {
    findUser,
    createUser,
    compareUser,
    createToken,
    allHistory,
    historyMonth,
    deleteSpend
}
