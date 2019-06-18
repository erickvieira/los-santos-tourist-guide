import { Categories } from './categories';
import { Accessibility } from './accessibility';
import { BusinessHours } from './business-hours';
import { Coordinates } from './coordinates';
import { Rating } from './rating';
import { AgeGroup } from './age-group';
import { FirebaeObjectReference } from './firebase-object-reference';

export type TouristSpot = ITouristSpot & FirebaeObjectReference;

export interface ITouristSpot {
  name: string;
  description: string;
  adjacentStreets: string[];
  pictures?: string[];
  icon: string;
  maxCapacity?: number;
  ticketPrice: number | 'free';
  allowsPet?: boolean;
  allowsPhotography?: boolean;
  hasMetalDetector?: boolean;
  categories: Categories[];
  accessibilityItems?: Accessibility[];
  businessHours: BusinessHours[];
  coordinates: Coordinates;
  rating?: Rating[];
  ageGroup?: AgeGroup[];
}

export interface TinyTouristSpot {
  id: string;
  name: string;
  categories: Categories;
  coordinates: Coordinates;
}
