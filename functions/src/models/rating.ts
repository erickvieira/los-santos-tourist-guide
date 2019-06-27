import { FirebaeObjectReference } from "./firebase-object-reference";

export interface TinyRating {
  checkin: number;
  rate: number;
  comment?: string;
}

export type Rating = IRating & FirebaeObjectReference;

export interface IRating {
  idUser: string;
  idTouristSpot: string;
  checkin: number;
  rate: Rate;
  comment?: string;
}

export type Rate = 1 | 2 | 3 | 4 | 5;
