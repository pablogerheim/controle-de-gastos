import baseRepository from "../repository/base.repository.js"

async function historyMonth(month) {
    const data = await baseRepository.readFileFunction()
    let monthArr = data.despesas.filter(despesa => despesa.mes === month)
    return monthArr.sort((a, b) => a.dia - b.dia)
}

async function deleteSpend(id) {
    let data = await baseRepository.readFileFunction()
    data.despesas = data.despesas.filter(despesa => despesa.id !== id)
    await baseRepository.writeFileFunction(data)
}

async function createSpend(descricao, categoria, valor, mes, dia) {
    valor = parseInt(valor)
    let data = await baseRepository.readFileFunction()

    let spend = {
        "id": data.nextId,
        "descricao": descricao,
        "categoria": categoria,
        "valor": valor,
        "mes": mes,
        "dia": dia
    }

    data.nextId++
        data.despesas.push(spend)

    await baseRepository.writeFileFunction(data)
    return spend
}

async function updateSpend(descricao, categoria, valor, mes, dia, id) {
    valor = parseInt(valor)
    let data = await baseRepository.readFileFunction()

    let spend = {
        "id": id,
        "descricao": descricao,
        "categoria": categoria,
        "valor": valor,
        "mes": mes,
        "dia": dia
    }

    data.despesas.map((element, i) => {
        if (element.id == id) {
            data.despesas[i] = spend
        }
    });

    await baseRepository.writeFileFunction(data)
    return spend
}

export default {
    historyMonth,
    deleteSpend,
    createSpend,
    updateSpend
}