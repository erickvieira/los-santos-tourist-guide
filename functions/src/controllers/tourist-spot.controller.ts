import { GenericController } from './generic-controller';
import { TouristSpot, TinyTouristSpot, ITouristSpot } from '../models/tourist-spot';
import { FirebaeObjectReference } from '../models/firebase-object-reference';
import { Categories } from '../models/categories';
import { BusinessHours } from '../models/business-hours';

export class TouristSpotController extends GenericController<TouristSpot> {

  private UserTypeGuard = class implements ITouristSpot, FirebaeObjectReference {
    id = '';
    name = '';
    description = '';
    adjacentStreets = [];
    icon = '';
    ticketPrice = 0;
    categories = new Array<Categories>();
    businessHours = new Array<BusinessHours>();
    coordinates = { lat: 0, lng: 0 };
  };

  private typeGuard = new this.UserTypeGuard();

  constructor(tableName: string) { super(tableName); }

  async insert(data: TouristSpot, keyCompose: string[]) {
    for (const k in this.typeGuard) {
      if (!(data as any)[k]) {
        throw Error(`the required key '${k}' is null`);
      }
    }
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of TouristSpot`);
      }
    }
    super.insert(data, keyCompose);
  }

  async update(id: string, data: TouristSpot | Partial<TouristSpot>) {
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of TouristSpot`);
      }
    }
    super.update(id, data);
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
