import * as admin from 'firebase-admin';
import { GenericController } from './generic-controller';
import { TouristSpot } from '../models/tourist-spot';

export class TouristSpotController extends GenericController<TouristSpot> {

  constructor(
    dbRef: admin.database.Reference,
    loggerRef?: admin.database.Reference,
  ) { super(dbRef, loggerRef) }

}