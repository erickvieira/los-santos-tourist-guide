import { GenericController } from './generic-controller';
import { User } from '../models/user';

export class UserController extends GenericController<User> {

  constructor(
    tableName: string,
    logger?: string,
  ) { super(tableName, logger); }

}
