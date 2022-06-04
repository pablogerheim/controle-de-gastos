import baseRepository from "../repository/base.repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function findUser(email) {
    let userdb = await baseRepository.readFileUser()
    return userdb.users.find(
        (user) => user.email === email
    );
}

async function createUser(name, email, password) {
    let userdb = await baseRepository.readFileUser()
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    let user = {
        "id": userdb.nextId,
        "name": name,
        "email": email,
        "password": passwordHash,
        "timestamp": new Date
    }
    userdb.nextId++
        userdb.users.push(user)

    await baseRepository.writeFileUser(userdb)
    return user
}

async function compareUser(user, password) {
    return await bcrypt.compare(password, user.password);
}

async function createToken(user) {
    const secret = 'process.env.SECRET';
    const token = jwt.sign({ id: user._id, }, secret, {
        expiresIn: 90000 // expires in 150min
    });
    return token
}


export default {
    findUser,
    createUser,
    compareUser,
    createToken,
}