import {Roles} from './Roles';
import {Compte} from './Compte';

export class User {
  token: string;
  _id: string;
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  createdDate: Date;
  roles: Roles[];
  comptes: Compte[];

  enabled: boolean;
  activated: boolean;
}
