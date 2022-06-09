import baseService from "../service/public.service.js";

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(422).json({ msg: "O Email, Password e Nome são obrigatórios!" });
        }
        const user = await baseService.findUser(email);
        if (user) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }
        const criatedUser = await baseService.createUser(name, email, password)
        res.status(201).json({ msg: "Usuário criado com sucesso!" });

        logger.info(`POST /creat account - ${JSON.stringify(criatedUser)}`);
    } catch (err) {
        res.status(500).json({ msg: " error" });
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ msg: "O Email e Password são obrigatórios!" });
        }

        const user = await baseService.findUser(email);
        const id = user.id
        const name = user.name
        if (!user) { return res.status(404).json({ msg: "Usuário não encontrado!" }) }

        const checkPassword = baseService.compareUser(user, password)

        if (!checkPassword) { return res.status(422).json({ msg: "password inválida" }) }

        const token = await baseService.createToken(user)
        let account = { id, name, email, token }
        res.status(200).send({ id, name, email, token })

        logger.info(`POST /login - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}


export default {
    register,
    login,
}