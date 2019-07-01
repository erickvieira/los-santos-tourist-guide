import { TouristSpotController } from './controllers/tourist-spot.controller';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as moment from 'moment';
import { TouristSpot, TinyTouristSpot } from './models/tourist-spot';
import { UserController } from './controllers/user.controller';
import { User, IUser } from './models/user';
import { RatingController } from './controllers/rating.controller';
import { TinyRating } from './models/rating';
import { adminSdkAuth } from './controllers/api/firebase-admin/admin-sdk-auth';

admin.initializeApp({
  credential: admin.credential.cert(adminSdkAuth),
  projectId: 'los-santos-tourist-guide',
  databaseURL: 'https://los-santos-tourist-guide.firebaseio.com'
});

const tsCtrl = new TouristSpotController();
const usrCtrl = new UserController();
const ratingCtrl = new RatingController();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.options('*', cors());

const ok = Object.freeze({
  message: 'It\'s alright here, tall key?',
  version: '1.7.3'
});

app.get('/', (_, res) => {
  res.status(200).send(ok);
});

app.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

app.post('/login', async (req, res) => {
  try {
    const user: { email: string, password: string } = req.body;
    if (!user) {
      throw Error('invalid user data');
    }
    const dbUser = await usrCtrl.getUserByEmailAndPassowrd(user.email, user.password);
    if (dbUser) {
      delete dbUser.password;
      res.send(dbUser);
    } else {
      res.status(403).send({ error: { message: 'not authenticated' } });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/register', async (req, res) => {
  try {
    const user: IUser = req.body;
    if (!user) {
      throw { message: 'invalid user data' };
    }
    await usrCtrl.insert({
      ...user,
      role: 'app',
      active: true,
    }, [ user.email ]);
    res.status(201).send({
      userData: user,
      message: 'new account created'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const result: User = await usrCtrl.getOne(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error });
  }
});

app.get('/user/:id/ratings', async (req, res) => {
  try {
    const list: TinyRating[] = await ratingCtrl.getUserRatings(req.params.id);
    if (list && list.length > 0) {
      res.send(list);
    } else {
      res.status(404).send({ error: { message: 'no items found' } });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.patch('/user/:id', async (req, res) => {
  try {
    await usrCtrl.update(
      req.params.id,
      { ...req.body, role: 'app' } as User
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { active: false });
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/user/:id/promote', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { role: 'admin' });
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/user/:id/demote', async (req, res) => {
  try {
    await usrCtrl.update(req.params.id, { role: 'app' });
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
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

app.get('/spot/:id/ratings', async (req, res) => {
  try {
    const list: TinyRating[] = await ratingCtrl.getTouristSpotRatings(req.params.id);
    if (list && list.length > 0) {
      res.send(list);
    } else {
      res.status(404).send({ error: { message: 'no items found' } });
    }
  } catch (error) {
    res.status(500).send({ error });
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
    res.status(500).send({ error });
  }
});

app.get('/spot', async (req, res) => {
  try {
    const category = req.query.category;
    let list: TinyTouristSpot[] = [];
    if (category) {
      list = await tsCtrl.getTinyListByCategory(req.query.category);
    } else {
      list = await tsCtrl.getTinyList();
    }
    if (list && list.length > 0) {
      res.send(list);
    } else {
      res.status(404).send({ error: { message: 'no items found' } });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/spot/:id', async (req, res) => {
  try {
    await tsCtrl.delete(req.params.id);
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.patch('/spot/:id', async (req, res) => {
  try {
    await tsCtrl.update(req.params.id, req.body as TouristSpot);
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/rating', async (req, res) => {
  try {
    const list: TinyRating[] = await ratingCtrl.getUserRatings(req.body.idUser);
    if (list && list.length > 0) {
      res.status(400).send({ error: { message: 'you have already voted' } });
    }
    req.body.checkin = req.body.checkin || moment.now();
    await ratingCtrl.insert(
      req.body,
      [ req.body.idUser, req.body.idTouristSpot, req.body.checkin ]
    );
    res.send(200);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export const tgapi = functions.runWith({
  timeoutSeconds: 20,
  memory: '256MB'
}).https.onRequest(app);
