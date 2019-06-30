import { FirebaeObjectReference } from './firebase-object-reference';

export interface IUser {
  name: string;
  email: string;
  role: 'app' | 'admin';
  profilePicture?: string;
  active: boolean;
  password: string;
}

export type User = IUser & FirebaeObjectReference;
