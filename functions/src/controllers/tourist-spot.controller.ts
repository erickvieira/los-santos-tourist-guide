import { GenericController } from './generic-controller';
import { TouristSpot, TinyTouristSpot } from '../models/tourist-spot';

export class TouristSpotController extends GenericController<TouristSpot> {

  constructor() { super('touristspots'); }

  async insert(data: TouristSpot, keyCompose: string[]) {
    await super.insert(data, keyCompose);
  }

  async update(id: string, data: TouristSpot | Partial<TouristSpot>) {
    await super.update(id, data);
  }

  async getTinyList(): Promise<TinyTouristSpot[]> {
    return [].map.call(await super.getList(), (touristSpot: TouristSpot) => {
      return {
        id: touristSpot.id,
        name: touristSpot.name,
        coordinates: touristSpot.coordinates,
        categories: touristSpot.categories,
      };
    }) as TinyTouristSpot[];
  }

  async getTinyListByCategory(category: string): Promise<TinyTouristSpot[]> {
    return (await this.getTinyList()).filter((touristSpot: TinyTouristSpot) => {
      return touristSpot.categories.includes(category);
    }) as TinyTouristSpot[];
  }

}
