async function api(selecAno, selecMes) {
    console.log('api')
    let url = `http://localhost:3001/despesas?mes=${selecAno}-${selecMes}&_sort=dia`;
    let response = await fetch(url);
    return response.json()
}

// function api(b,a) {
//     let dados = JSON.parse(JSON.stringify(info))
//     dados = dados.sort((a, b) => a.dia - b.dia)

//     return dados
// }


// let dados = JSON.parse(JSON.stringify(info))
// dados = dados.despesas.map((d) => {
//     let rpl = d.mes.replace('-', '')
//     let num = parseInt(rpl)
//     return {
//         ...d,
//         'valormes': num
//     }
// })



function useTotal(dados1) {
    let saude = 0
    let lazer = 0
    let alimentacao = 0
    let moradia = 0
    let transporte = 0
    let outros = 0
    dados1.map(({ categoria, valor }) => {
        if (categoria === "saude") { saude += valor } else if (categoria === "lazer ") { lazer += valor } else if (categoria === "alimentacao") { alimentacao += valor } else if (categoria === "moradia") { moradia += valor } else if (categoria === "transporte") { transporte += valor } else outros += valor
    })

    let total = saude + lazer + alimentacao + moradia + transporte + outros
    let obj = {
        "saude": saude,
        "lazer": lazer,
        "alimentacao": alimentacao,
        "moradia": moradia,
        "transporte": transporte,
        "outros": outros,
        "total": total
    }

    return obj
}

const arrMes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro", ]
const arrAno = ['2020', '2021']
export {
    arrMes,
    arrAno,
    api,
    useTotal
}