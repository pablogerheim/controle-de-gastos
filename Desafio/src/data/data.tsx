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
  name: string;
  email: string;
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
let currentToken;

async function signInEndpoint(email: string, password: string): Promise<IUser> {
  return await fetch(`http://localhost:3001/login`, {
    credentials: "include",
    method: "POST",
    mode:'cors',
    headers: {
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "X-Powered-By": "Express"
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}


function handleResponse(resp: Response) {
  console.log(resp)
  if (resp.ok) {
    let respSuport = resp.json()
    console.log(respSuport)
    if(respSuport){
      currentToken = respSuport
    } 
    return respSuport
  } else {
    throw new Error(resp.statusText);
  }
}

async function api(selecAno: string, selecMes: string) {
  console.log(currentToken)
  console.log(currentToken.toString)
  let url = `http://localhost:3001/private/month/2/${selecAno}-${selecMes}`;
  let response = await fetch(url, {
    credentials: "include",
    method: "POST",
    mode:'cors',
    headers: {
      "authorization": currentToken, 
      "Content-Type": "application/json; charset = utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "X-Powered-By": "Express"
    }
  });
  console.log(response)
  return response.json()
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

const arrMes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const arrAno = ['2020', '2021']

function getUserEndpoint() {
  return false
}
function signOutEndpoint() {
  return false
}

export {
  arrMes,
  arrAno,
  useTotal,
  api,
  signInEndpoint,
  // getCalendarsEndpoint,
  // getEventsEndpoint,
  // createEventEndpoint,
  // updateEventEndpoint,
  // deleteEventEndpoint,
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
