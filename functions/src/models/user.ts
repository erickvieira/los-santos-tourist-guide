import { FirebaeObjectReference } from './firebase-object-reference';

export interface IUser {
  name: string;
  email: string;
  token: string;
  role: 'app' | 'admin';
  profilePicture?: string;
  active: boolean;
}

export type User = IUser & FirebaeObjectReference;
