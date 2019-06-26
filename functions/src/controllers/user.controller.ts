import { GenericController } from './generic-controller';
import { User } from '../models/user';

export class UserController extends GenericController<User> {

  private modelReference: User = {
    active: true,
    email: '',
    id: '',
    name: '',
    role: 'app',
    token: '',
  }

  constructor(
    tableName: string,
    logger?: string,
  ) { super(tableName, logger); }

  async insert(data: User, keyCompose: string[]) {
    for (const k in this.modelReference) {
      if (!(data as any)[k]) {
        throw Error(`the required key '${k}' is null`);
      }
    }
    for (const k in data) {
      if (!(this.modelReference as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of User`);
      }
    }
    super.insert(data, keyCompose);
  }

  async update(id: string, data: User | any) {
    for (const k in data) {
      if (!(this.modelReference as any)[k]) {
        throw Error(`the key '${k}' is not an attribute of User`);
      }
    }
    super.update(id, data);
  }

}
