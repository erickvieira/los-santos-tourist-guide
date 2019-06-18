import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { User } from './models/user';
import { TouristSpot } from './models/tourist-spot';
import { UserController } from './controllers/user.controller';

admin.initializeApp(functions.config().firebase)
const db = admin.database()

const dbRef = Object.freeze({
  usr: db.ref('users'),
  ts: db.ref('touristspots'),
  log: db.ref('logs'),
} as { [key: string]: admin.database.Reference })

// const userCtrl = new UserController(dbRef.usr, dbRef.log)
const tsCtrl = new UserController(dbRef.ts, dbRef.log)

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.options('*', cors())

const tudoOk = Object.freeze({
  message: 'Ta tudo certo aqui, taoquêi?',
  version: '1.0.0',
  status: 200
})

app.get('/', (_, res) => {
  res.send(tudoOk)
})

app.get('/healthcheck', (_, res) => {
  res.send(tudoOk)
})

app.post('/createDatabase', async (req, res) => {
  const data: { 
    users: [],
    touristspots: [],
  } = req.body
  if (!data || !data.users || !data.touristspots) {
    res.send({
      status: 500,
      message: 'no data provided',
      detail: data
    })
  }
  // await db.ref('log').push(data)
  // await db.ref('users').remove()
  // await db.ref('touristspots').remove()
  for (let usuData of data.users) {
    const usuId: string = (await dbRef.usr.push()).key
    const user: User = Object.assign({
      id: usuId
    }, usuData)
    try {
      await dbRef.usr.child(usuId).set(user)
      if (data.users.indexOf(usuData) === data.users.length - 1) {
        break
      }
    } catch (err) {
      res.send({
        status: 500,
        detail: err,
      })
      break
    }
  }
  for (let tsData of data.touristspots) {
    const tsId: string = (await dbRef.ts.push()).key
    const touristSpot: TouristSpot = Object.assign({
      id: tsId,
    }, tsData)
    try {
      await dbRef.ts.child(tsId).set(touristSpot)
      if (data.touristspots.indexOf(tsData) === data.touristspots.length - 1) {
        break
      }
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
    message: 'updated data base'
  })
})

app.get('/spot/:id', (req, res) => {
  res.send(tsCtrl.getOne(req.params.id))
})

app.get('/spot', (_, res) => {
  res.send(tsCtrl.list())
})

export const api = functions.https.onRequest(app)
