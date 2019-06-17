import { ITouristSpot } from './tourist-spot';
import { IUser } from './user';
export interface FirebaeObjectReference {
  readonly id: string
}

export type Entity = IUser | ITouristSpot