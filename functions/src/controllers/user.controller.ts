import { GenericController } from './generic-controller';
import { User, IUser } from '../models/user';
import { FirebaeObjectReference } from '../models/firebase-object-reference';

export class UserController extends GenericController<User> {

  private TouristSpotTypeGuard = class implements IUser, FirebaeObjectReference {
    id = '';
    name = '';
    email = '';
    token = '';
    role: 'app' | 'admin' = 'app';
    active = false;
  };

  private typeGuard = new this.TouristSpotTypeGuard();

  constructor(tableName: string) { super(tableName); }

  async insert(data: User, keyCompose: string[]) {
    for (const k in this.typeGuard) {
      if (!(data as any)[k]) {
        throw Error(`the required key '${k}' is null`);
      }
    }
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of User`);
      }
    }
    super.insert(data, keyCompose);
  }

  async update(id: string, data: User | Partial<User>) {
    for (const k in data) {
      if (!(this.typeGuard as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of User`);
      }
    }
    super.update(id, data);
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.getList();
    const user = users.find(u => u.email === email);
    if (!user) {
      throw Error('user not found');
    } else {
      return user;
    }
  }

}
