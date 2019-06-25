import { TouristSpotController } from './controllers/tourist-spot.controller';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { TouristSpot, TinyTouristSpot } from './models/tourist-spot';
import { UserController } from './controllers/user.controller';
import { User } from './models/user';
// import * as env from '../environment/environment';

const tsCtrl = new TouristSpotController('touristspots', 'logs');
const usrCtrl = new UserController('users', 'logs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.options('*', cors());

const ok = Object.freeze({
  message: 'It\'s alright here, tall key?',
  version: '1.5.3'
});

app.get('/', (_, res) => {
  res.status(200).send(ok);
});

app.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

app.get('/user/:id', async (req, res) => {
  try {
    const result: User = await usrCtrl.getOne(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.post('/user', async (req, res) => {
  try {
    await usrCtrl.insert(
      { ...req.body, role: 'app' } as User,
      [ req.body.email ]
    );
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { active: false });
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.post('/user/:id/promote', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { role: 'admin' });
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.post('/user/:id/demote', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { role: 'app' });
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.get('/spot/:id', async (req, res) => {
  try {
    const result: TouristSpot = await tsCtrl.getOne(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.post('/spot', async (req, res) => {
  try {
    await tsCtrl.insert(
      req.body as TouristSpot,
      [ req.body.name, JSON.stringify(req.body.coordinates) ]
    );
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.get('/spot', async (_, res) => {
  try {
    const list: TinyTouristSpot[] = await tsCtrl.getTinyList();
    if (list && list.length > 0) {
      res.send(list);
    } else {
      res.status(404).send({ error: { message: 'no items found' } });
    }
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.get('/spot/category/:name', async (req, res) => {
  try {
    const list: TinyTouristSpot[] = await tsCtrl.getTinyListByCategory(req.params.name);
    if (list && list.length > 0) {
      res.send(list);
    } else {
      res.status(404).send({ error: { message: 'no items found' } });
    }
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.delete('/spot/:id', async (req, res) => {
  try {
    await tsCtrl.delete(req.params.id);
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.patch('/spot/:id', async (req, res) => {
  try {
    await tsCtrl.update(req.params.id, req.body as TouristSpot);
    res.send(200);
  } catch (error) {
    res.status(404).send({ error });
  }
});

export const tgapi = functions.runWith({
  timeoutSeconds: 20,
  memory: '256MB'
}).https.onRequest(app);
