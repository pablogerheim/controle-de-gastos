import privateService from "../service/private.service.js";

async function getMonth(req, res, next) {
    try {
        const data = await privateService.historyMonth(req.params.anoMes)
        res.status(200).send(data);
        logger.info(`GET /Ano-Month - a lot of information`);
    } catch (err) {
        next(err);
    }
}

async function deleteSpent(req, res, next) {
    try {
        let id = parseInt(req.params.id)
        await privateService.deleteSpent(id)
        res.status(200).json({ msg: "Deleção realizada com sucesso!" });
        logger.info(`DELETE /servce - ID ${id}`);
    } catch (err) {
        next(err);
    }
}

async function createSpent(req, res, next) {
    try {
        const { descricao, categoria, valor, mes, dia } = req.body;
        if (!descricao == null || categoria == null || valor == null || mes == null || dia == null) {
            return res.status(422).json({ msg: "A Descricao, Categoria, Valor e Data são obrigatórios!" });
        }
        const spent = await privateService.createSpent(descricao, categoria, valor, mes, dia);
        res.status(200).json({ msg: "Criação realizada com sucesso!" });
        logger.info(`POST /creat spand - ${JSON.stringify(spent)}`);
    } catch (err) {
        res.status(500).json({ msg: "error" });
    }
}

export default {
    getMonth,
    deleteSpent,
    createSpent
}