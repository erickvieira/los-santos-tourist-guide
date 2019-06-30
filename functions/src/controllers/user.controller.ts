import { GenericController } from './generic-controller';
import { User, IUser } from '../models/user';

export class UserController extends GenericController<User> {

  constructor() { super('users'); }

  async insert(data: IUser, keyCompose: string[]) {
    await super.insert(data, keyCompose);
  }

  async update(id: string, data: User | Partial<User>) {
    await super.update(id, data);
  }

  async getUserByEmailAndPassowrd(email: string, password: string): Promise<User> {
    const users = await this.getList();
    const user = users.find(u => {
      return u.email === email && u.password === password;
    });
    if (!user) {
      throw { message: 'user not found' };
    } else {
      return user;
    }
  }

}
