function difDataHora(params) {
    return params.split(/[a-zA-Z]/g)
}

function difTime(p1, p2) {
    return p1 - p2
}

function helperTime(blakDate) {
    let date = new Date
    date = JSON.parse(JSON.stringify(date))
    let blakArr = difDataHora(blakDate.toString().slice(0, 19))
    let arr = difDataHora(date.toString().slice(0, 19))
    let time = difTime(parseInt(arr[1].slice(0, 5).replace(':', "")), parseInt(blakArr[1].slice(0, 5).replace(':', "")))

    if (parseInt(arr[0]) !== parseInt(blakArr[0])) { return false }
    if (time < 60) { return true } else { return false }
}

export default helperTime