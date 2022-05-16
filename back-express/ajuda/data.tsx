
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


async function getUserEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include",
  });
  return handleResponse(resp);
}

export function signInEndpoint(email: string, password: string): Promise<IUser> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

async function signOutEndpoint(): Promise<IUser> {
  const resp = await fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: "include",
    method: "POST",
  });
  return handleResponse(resp);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
   // console.log(resp.json()),
    console.log(resp)
    return resp.json();
  } else {   console.log("handle deu errado")
    throw new Error(resp.statusText);
  }
}

async function api(selecAno: string, selecMes: string): Promise<IarrDados> {
  console.log('api')
  let response = await fetch(`http://localhost:3001/despesas?mes=${selecAno}-${selecMes}&_sort=dia`,{
    credentials: "include"
  });
  return response.json()
}


function useTotal(dados: IarrDados) {
  let saude = 0
  let lazer = 0
  let alimentacao = 0
  let moradia = 0
  let transporte = 0
  let outros = 0
  dados.map(({ categoria, valor }) => {

    if (categoria === "Saúde") { saude += valor }
    else if (categoria === "Lazer") { lazer += valor }
    else if (categoria === "Alimentação") { alimentacao += valor }
    else if (categoria === "Moradia") { moradia += valor }
    else if (categoria === "Transporte") { transporte += valor }
    else outros += valor


    console.log(valor)
    console.log(categoria)

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

const arrMes = ["", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",]
const arrAno = ['2020', '2021']

export {
  arrMes,
  arrAno,
  api,
  useTotal,
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
