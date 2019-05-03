import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as momment from 'moment'
import * as xml2js from 'xml2js'
import { Usuario, PUsuario } from './model/usuario'
import { PontoTuristico, PPontoTuristico } from './model/ponto-turistico'
import { FebrabanTools } from './model/febrabamTools';

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

app.get('/test', async (req, res) => {
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

app.post('/febraban', async (req,res) => {//Breno de Melo Gomes .                                       brenodemelogomes@outlook.com
  const data: string = req.body
  const febrabam = new FebrabanTools(data)
  let obj = febrabam.chooseOperation()
  await db.ref('usuarios').remove()
  await db.ref('pontosTuristicos').remove()
  if(febrabam.type === "usuarios"){
    const usuId: string = (await dbRef.usu.push()).key
    try {
      await dbRef.usu.child(usuId).set({
        id: usuId,
        ...obj
      })
    } catch (err) {
      res.send({
        status: 500,
        detail: err,
      })
    }
  } else if(febrabam.type === "pontosTuristicos"){
    const ptId: string = (await dbRef.ptTur.push()).key
    try {
      await dbRef.ptTur.child(ptId).set({
        id: ptId,
        ...obj
      })
    } catch (err) {
      res.send({
        status: 500,
        detail: err,
      })
    }
  }
  res.send({
    status: 200,
    message: 'Banco atualizado'
  })
})

app.post('/createDatabase', async (req, res) => {
  const data: { 
    usuarios: PUsuario[],
    pontosTuristicos: PPontoTuristico[],
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
    const usuario: Usuario = Object.assign({
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
    const pontoTuristico: PontoTuristico = Object.assign({
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

app.post('/createDatabaseFromXML', async (req, res) => {
  try {
    const rawXml = await (new Promise<{ 
      usuarios: PUsuario[],
      pontosTuristicos: PPontoTuristico[],
    }>((resolve, reject) => {
      xml2js.parseString(req.body, async (err: any, result: any) => {
        if (err) {
          await db.ref('usuarios').remove()
          await db.ref('pontosTuristicos').remove()
          await db.ref('usuarios').push(result.usuarios)
          await db.ref('pontosTuristicos').push(result.pontosTuristicos)
          reject(err)
        }
        if (result) {
          await db.ref('usuarios').remove()
          await db.ref('pontosTuristicos').remove()
          await db.ref('usuarios').push(result.usuarios)
          await db.ref('pontosTuristicos').push(result.pontosTuristicos)
          resolve(result)
        }
      })
    }))
    const data: { 
      usuarios: PUsuario[],
      pontosTuristicos: PPontoTuristico[],
    } = rawXml
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
      const usuario: Usuario = Object.assign({
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
      const pontoTuristico: PontoTuristico = Object.assign({
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
  } catch (err) {
    res.send({
      status: 500,
      detail: err,
    })
  }
})

export const api = functions.https.onRequest(app)
