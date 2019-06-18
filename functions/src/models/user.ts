import { FirebaeObjectReference } from './firebase-object-reference';

export interface IUser {
  name: string;
  email: string;
  profilePicture?: string;
}

export type User = IUser & FirebaeObjectReference;
