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
            const criatedUser = await baseService.createUser(email, senha)
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        }
        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!senha) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    const user = await baseService.findUser(email);
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    const checkPassword = baseService.compareUser(user, senha)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
    const token = await baseService.createToken(user)
        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const data = await baseService.allHistory()
         res.status(200).send(data);
                logger.info(`POST /account - ${JSON.stringify(account)}`);
        } catch (err) {
            next(err);
        }
}

async function getMonth(req, res, next) {
    try {
        const data = await baseService.historyMonth(req.params.anoMes)
         res.status(200).send(data);
                logger.info(`POST /account - ${JSON.stringify(account)}`);
        } catch (err) {
            next(err);
        }
}

async function deleteSpend(req, res, next) {
    try {
         await baseService.deleteSpend(req.params.id)
         res.status(200).json({ msg: "Deleção realizada com sucesso!" });
                logger.info(`DELETE /servce - ${JSON.stringify(account)}`);
        } catch (err) {
            next(err);
        }
}

export default {
    register,
    login,
    getAll,
    getMonth,
    deleteSpend
}