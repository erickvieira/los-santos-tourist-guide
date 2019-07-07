import { IUser } from '../../../functions/src/models/user';

export class User implements IUser {
  name: string;
  email: string;
  role: 'app' | 'admin';
  profilePicture?: string;
  active: boolean;
  password: string;

  constructor(name, email, password?) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = 'admin';
    this.active = true;
  }
}
