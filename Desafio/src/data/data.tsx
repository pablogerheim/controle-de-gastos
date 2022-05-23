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

function getCalendarsEndpoint(): Promise<ICalendar[]> {
  return fetch("http://localhost:3001/calendars", {
    credentials: "include",
  }).then(handleResponse);
}

function getEventsEndpoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(`http://localhost:3001/events?date_gte=${from}&date_lte=${to}&_sort=date,time`, {
    credentials: "include",
  }).then(handleResponse);
}

function createEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:3001/events`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

function updateEventEndpoint(event: IEditingEvent): Promise<IEvent> {
  return fetch(`http://localhost:3001/events/${event.id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  }).then(handleResponse);
}

function deleteEventEndpoint(eventId: number): Promise<void> {
  return fetch(`http://localhost:3001/events/${eventId}`, {
    credentials: "include",
    method: "DELETE",
  }).then(handleResponse);
}

function getUserEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/auth/user`, {
    credentials: "include",
  }).then(handleResponse);
}

function signInEndpoint(email: string, password: string): Promise<IUser> {
  return fetch(`http://localhost:3001/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Authorization": "Basic",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application / json; charset = utf-8",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

function signOutEndpoint(): Promise<IUser> {

  return fetch(`http://localhost:3001/auth/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}

async function api(selecAno: string, selecMes: string) {
  let url = `http://localhost:3001/private/month/3/${selecAno}-${selecMes}`;
  let response = await fetch(url, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      "Cookie": "connect.sid = s % 3AdSHBP8 - ccgTLyXKoG7GIrswcQCyAMhok.I7QsZWZzLSw5pj28SFluXOqNN0iw6e0Y % 2BYFVzj42F4s",

      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTMyNDEzNTgsImV4cCI6MTY1MzI0MjI1OH0.ooi_KMUHdLGQm37eI1fzqmO95y8_xOwWBuDNOl5DNRc",
      "Accept": " */*",
      "Content-Length": "0"
    }
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

export {
  arrMes,
  arrAno,
  api,
  useTotal,
  getCalendarsEndpoint,
  getEventsEndpoint,
  createEventEndpoint,
  updateEventEndpoint,
  deleteEventEndpoint,
  getUserEndpoint,
  signInEndpoint,
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
