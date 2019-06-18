import * as admin from 'firebase-admin';
import { GenericController } from './generic-controller';
import { TouristSpot, TinyTouristSpot } from '../models/tourist-spot';

export class TouristSpotController extends GenericController<TouristSpot> {

  constructor(
    dbRef: admin.database.Reference,
    loggerRef?: admin.database.Reference,
  ) { super(dbRef, loggerRef); }

  async getTinyList(searchBy?: { key: string, value: string }): Promise<TinyTouristSpot[]> {
    const touristSpots = await super.getList(searchBy);
    return [].map.call(touristSpots, (touristSpot: TouristSpot) => {
      return {
        id: touristSpot.id,
        name: touristSpot.name,
        coordinates: touristSpot.coordinates,
        categories: touristSpot.categories,
      };
    }) as TinyTouristSpot[];
  }

}
