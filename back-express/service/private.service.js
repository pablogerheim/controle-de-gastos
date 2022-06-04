import baseRepository from "../repository/base.repository.js"

async function historyMonth(month) {
    const data = await baseRepository.readFileFunction()
    let monthArr = data.despesas.filter(despesa => despesa.mes === month)
    return monthArr.sort((a, b) => a.dia - b.dia)
}

async function deleteSpent(id) {
    let data = await baseRepository.readFileFunction()
    data.despesas = data.despesas.filter(despesa => despesa.id !== id)
    await baseRepository.writeFileFunction(data)
}

async function createSpent(descricao, categoria, valor, mes, dia) {
    valor = parseInt(valor)
    let data = await baseRepository.readFileFunction()

    let spent = {
        "id": data.nextId,
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
    historyMonth,
    deleteSpent,
    createSpent
}