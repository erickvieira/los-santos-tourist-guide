import * as admin from 'firebase-admin';
import { GenericController } from './generic-controller';
import { User } from '../models/user';

export class UserController extends GenericController<User> {

  constructor(
    dbRef: admin.database.Reference,
    loggerRef?: admin.database.Reference,
  ) { super(dbRef, loggerRef); }

}
