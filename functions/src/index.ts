import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as momment from 'moment'
import { User, IUser } from './models/user'
import { TouristSpot, ITouristSpot } from './models/tourist-spot'

admin.initializeApp(functions.config().firebase)
const db = admin.database()

const dbRef = Object.freeze({
  usu: db.ref('usuarios'),
  ptTur: db.ref('pontosTuristicos'),
  fav: db.ref('favoritacoes'),
} as { [key: string]: admin.database.Reference })

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.options('*', cors())

const tudoOk = Object.freeze({
  message: 'Ta tudo certo aqui, taoquêi?',
  status: 200
})

app.get('/', (_, res) => {
  res.send(tudoOk)
})

app.get('/status', (_, res) => {
  res.send(tudoOk)
})

app.get('/healthcheck', async (req, res) => {
  const message = req.query.message
  if (message == undefined) {
    res.send({
      status: 500,
      message: 'impossivel cadastrar uma mensagem vazia',
    })
  }
  const key = (await db.ref('/log').push()).key
  const log = {
    id: key,
    checkin: momment.now(),
    message
  }
  try {
    await db.ref(`/log`).child(key).set(log)
    res.send({
      status: 200,
      message: 'cadastro efetuado'
    })
  } catch (err) {
    res.send({
      status: 500,
      message: 'erro',
      detail: err,
      info: log
    })
  }
})

app.post('/createDatabase', async (req, res) => {
  const data: { 
    usuarios: IUser[],
    pontosTuristicos: ITouristSpot[],
  } = req.body
  if (data == undefined) {
    res.send({
      status: 500,
      message: 'nenhum dado informado',
      detail: data
    })
  }
  await db.ref('log').push(data)
  await db.ref('usuarios').remove()
  await db.ref('pontosTuristicos').remove()
  for (const usuData of data.usuarios) {
    const usuId: string = (await dbRef.usu.push()).key
    const usuario: User = Object.assign({
      id: usuId
    }, usuData)
    try {
      await dbRef.usu.child(usuId).set(usuario)
    } catch (err) {
      res.send({
        status: 500,
        detail: err,
      })
      break
    }
  }
  for (const ptData of data.pontosTuristicos) {
    const ptId: string = (await dbRef.ptTur.push()).key
    const pontoTuristico: TouristSpot = Object.assign({
      id: ptId,
    }, ptData)
    try {
      await dbRef.ptTur.child(ptId).set(pontoTuristico)
    } catch (err) {
      res.send({
        status: 500,
        detail: err,
      })
      break
    }
  }
  res.send({
    status: 200,
    message: 'Banco atualizado'
  })
})

export const api = functions.https.onRequest(app)
