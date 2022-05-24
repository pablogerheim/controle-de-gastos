import baseService from "../service/base.service.js";

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            res.status(422).json({ msg: "O nome é obrigatório!" });
        } else if (!email) {
            res.status(422).json({ msg: "O email é obrigatório!" });
        } else if (!password) {
            res.status(422).json({ msg: "A password é obrigatória!" });
        }
        const user = await baseService.findUser(email);
        if (user) {
            res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        } else {
            const criatedUser = await baseService.createUser(name, email, password)
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        }
        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
        return res.status(422).json({ msg: "A password é obrigatória!" });
    }
    const user = await baseService.findUser(email);
    const id = user.id
    const name = user.name 
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    const checkPassword = baseService.compareUser(user, password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "password inválida" });
    }
    
    try {
    const token = await baseService.createToken(user)
        res.status(200).send({ msg: "Autenticação realizada com sucesso!", token, id, name})

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

async function deleteSpent(req, res, next) {
    try {
         await baseService.deleteSpent(req.params.id)
         res.status(200).json({ msg: "Deleção realizada com sucesso!" });
                logger.info(`DELETE /servce - ${JSON.stringify(account)}`);
        } catch (err) {
            next(err);
        }
}

async function createSpent(req, res, next) {
    try {
        const { descricao, categoria, valor, mes, dia} = req.body;

        if (!descricao) {
            res.status(422).json({ msg: "A descricao é obrigatório!" });
        } else if (!categoria) {
            res.status(422).json({ msg: "A categoria é obrigatória!" });
        }else if (!valor) {
            res.status(422).json({ msg: "O valor é obrigatório!" });
        }else if (!mes) {
            res.status(422).json({ msg: "O mes é obrigatório!" });
        }else if (!dia) {
            res.status(422).json({ msg: "O dia é obrigatório!" });
        }
        const spent = await baseService.createSpent(descricao, categoria, valor, mes, dia);
        res.status(200).json({ msg: "Deleção realizada com sucesso!" }, spend);
        logger.info(`POST /creat spand - ${JSON.stringify(spent)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

export default {
    register,
    login,
    getAll,
    getMonth,
    deleteSpent,
    createSpent
}