import { GenericController } from './generic-controller';
import { Rating, TinyRating } from '../models/rating';

export class RatingController extends GenericController<Rating> {

  constructor() { super('ratings'); }

  async insert(data: Rating, keyCompose: string[]) {
    await super.insert(data, keyCompose);
  }

  async update(id: string, data: Rating | Partial<Rating>) {
    await super.update(id, data);
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
