interface ICalendar {
  id: number;
  name: string;
  color: string;
}

interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

interface IEvent extends IEditingEvent {
  id: number;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  token: string;
}
interface Idados {
  "id": number,
  "descricao": string,
  "categoria": string,
  "valor": number,
  "mes": string,
  "dia": number,
};

type IarrDados = Idados[];
let currentIuser : any



async function signInEndpoint(email: string, password: string): Promise<any> {
  let helperPromise = await fetch(`http://localhost:3001/login`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
  console.log(helperPromise)
  currentIuser = helperPromise
  return helperPromise
}

async function createEventEndpoint(descricao: string, categoria: string, valor: string, mes: string, dia: string): Promise<any> {
    let {token} = currentIuser
    await fetch(`http://localhost:3001/private`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({ descricao, categoria, valor, mes, dia }),
  }).then(handleResponse);
}

function deleteEventEndpoint(eventId: number): Promise<void> {
  let {token} = currentIuser
  return fetch(`http://localhost:3001/private/${eventId}`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then(handleResponse);
}

function handleResponse(resp: any) {
  if (resp.ok) {
    return resp.json()
  } else {
    console.log(resp)
    throw new Error(resp.statusText);
  }
}

async function api(selecAno: string, selecMes: string) {
  let {id, token} = currentIuser
  let url = `http://localhost:3001/private/month/${id}/${selecAno}-${selecMes}`;
  let response = await fetch(url, {
    credentials: "include",
    method: "GET",
    mode: "cors",
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    }
  }).then(handleResponse);
 return response
}

function useTotal(dados: IarrDados) {

  let saude = 0
  let lazer = 0
  let alimentacao = 0
  let moradia = 0
  let transporte = 0
  let outros = 0
  dados.forEach(({ categoria, valor }) => {
    if (categoria === "Saúde") { saude += valor }
    else if (categoria === "Lazer") { lazer += valor }
    else if (categoria === "Alimentação") { alimentacao += valor }
    else if (categoria === "Moradia") { moradia += valor }
    else if (categoria === "Transporte") { transporte += valor }
    else outros += valor
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

const arrCategoria = ["Saúde", "Lazer", "Alimentação", "Moradia", "Transporte", "Outros"]
const arrMes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const arrAno = ['2020', '2021', '2022']

function getUserEndpoint() {
  return false
}
function signOutEndpoint() {
  return false
}

export {
  arrMes,
  arrAno,
  arrCategoria,
  useTotal,
  api,
  signInEndpoint,
  // getCalendarsEndpoint,
  // getEventsEndpoint,
  createEventEndpoint,
  // updateEventEndpoint,
  deleteEventEndpoint,
  getUserEndpoint,
  signOutEndpoint
}
export type {
  ICalendar,
  IEditingEvent,
  IEvent,
  IUser,
  IarrDados,
  Idados
}
