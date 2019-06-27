import { GenericController } from './generic-controller';
import { Rating, IRating, Rate, TinyRating } from '../models/rating';
import { FirebaeObjectReference } from '../models/firebase-object-reference';

export class RatingController extends GenericController<Rating> {

  private RatingTypeGuard = class implements IRating, FirebaeObjectReference {
    id = '';
    idUser = '';
    idTouristSpot = '';
    checking = 0;
    rate: Rate = 1;
  };

  private typeGuard = new this.RatingTypeGuard();

  constructor(tableName: string) { super(tableName); }

  async insert(data: Rating, keyCompose: string[]) {
    for (const k in this.typeGuard) {
      if (!(data as any)[k]) {
        throw Error(`the required key '${k}' is null`);
      }
    }
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of Rating`);
      }
    }
    super.insert(data, keyCompose);
  }

  async update(id: string, data: Rating | Partial<Rating>) {
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of Rating`);
      }
    }
    super.update(id, data);
  }

  async getUserRatings(idUser: string): Promise<TinyRating[]> {
    return (await super.getList()).filter((rating: Rating) => {
      return rating.idUser = idUser;
    }).map((rating: Rating) => {
      return {
        checkin: rating.checkin,
        rate: rating.rate,
        comment: rating.comment,
      };
    }) as TinyRating[];
  }

  async getTouristSpotRatings(idTouristSpot: string): Promise<TinyRating[]> {
    return (await super.getList()).filter((rating: Rating) => {
      return rating.idTouristSpot = idTouristSpot;
    }).map((rating: Rating) => {
      return {
        checkin: rating.checkin,
        rate: rating.rate,
        comment: rating.comment,
      };
    }) as TinyRating[];
  }

}
