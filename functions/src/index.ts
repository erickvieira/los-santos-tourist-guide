import { TouristSpotController } from './controllers/tourist-spot.controller';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { User } from './models/user';
import { TouristSpot, TinyTouristSpot } from './models/tourist-spot';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://los-santos-tourist-guide.firebaseio.com'
});
const db = admin.database();

const dbRef = Object.freeze({
  usr: db.ref('users'),
  ts: db.ref('touristspots'),
  log: db.ref('logs'),
} as { [key: string]: admin.database.Reference });

const tsCtrl = new TouristSpotController(dbRef.ts, dbRef.log);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.options('*', cors());

const ok = Object.freeze({
  message: 'It\'s alright here, tall key?',
  version: '1.1.1'
});

app.get('/', (_, res) => {
  res.status(200).send(ok);
});

app.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

app.post('/createDatabase', async (req, res) => {
  const data: {
    users: [],
    touristspots: [],
  } = req.body;
  if (!data || !data.users || !data.touristspots) {
    res.status(500).send({
      error: 'no provided data'
    });
  }
  try {
    await dbRef.ts.remove();
    await dbRef.usr.remove();
  } catch (error) {
    console.error(error);
  }
  for (const usuData of data.users) {
    const usuId: string = (await dbRef.usr.push()).key;
    const user: User = Object.assign({
      id: usuId
    }, usuData);
    try {
      await dbRef.usr.child(usuId).set(user);
    } catch (error) {
      res.status(500).send({ error });
      break;
    }
  }
  for (const tsData of data.touristspots) {
    const tsId: string = (await dbRef.ts.push()).key;
    const touristSpot: TouristSpot = Object.assign({
      id: tsId,
    }, tsData);
    try {
      await dbRef.ts.child(tsId).set(touristSpot);
    } catch (error) {
      res.status(500).send({ error });
      break;
    }
  }
  res.status(201).send({
    message: 'updated data base'
  });
});

app.get('/spot/:id', async (req, res) => {
  try {
    const result: TouristSpot = await tsCtrl.getOne(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.get('/spot', async (_, res) => {
  try {
    const list: TinyTouristSpot[] = await tsCtrl.getTinyList();
    if (list && list.length > 0) {
      res.send(list);
    }
  } catch (error) {
    res.status(404).send({ error });
  }
});

export const api = functions.https.onRequest(app);
