import { GenericController } from './generic-controller';
import { TouristSpot, TinyTouristSpot } from '../models/tourist-spot';

export class TouristSpotController extends GenericController<TouristSpot> {

  constructor(
    tableName: string,
    logger?: string,
  ) { super(tableName, logger); }

  async getTinyList(): Promise<TinyTouristSpot[]> {
    return [].map.call(await super.getList(), (touristSpot: TouristSpot) => {
      return {
        id: touristSpot.id,
        name: touristSpot.name,
        coordinates: touristSpot.coordinates,
        categories: touristSpot.categories,
      } as TinyTouristSpot;
    }) as TinyTouristSpot[];
  }

  async getTinyListByCategory(category: string): Promise<TinyTouristSpot[]> {
    return ([].map.call(await super.getList(), (touristSpot: TouristSpot) => {
      return {
        id: touristSpot.id,
        name: touristSpot.name,
        coordinates: touristSpot.coordinates,
        categories: touristSpot.categories,
      };
    }) as TinyTouristSpot[]).filter((touristSpot: TinyTouristSpot) => {
      return touristSpot.categories.includes(category);
    }) as TinyTouristSpot[];
  }

}
