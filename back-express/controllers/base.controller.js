import baseService from "../service/base.service.js";

async function register(req, res, next) {
    try {
        const { email, senha } = req.body;

        if (!email) {
            res.status(422).json({ msg: "O email é obrigatório!" });
        } else if (!senha) {
            res.status(422).json({ msg: "A senha é obrigatória!" });
        }
        const user = await baseService.findUser(email);
        if (user) {
            res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        } else {
            const criatedUser = await baseService.create(email, senha)
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        }
        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {

    try {

        let account = await baseService.pegar();
        res.send(account);
        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    register,
    login
}